// Per-device usage for the current billing month, from the historian's odometer
// (/api/clients/totals). Complementary to the aggregate on the Data Usage panel,
// not a breakdown of it: the panel's bars integrate the dish's WAN telemetry,
// while this reads the router's per-client counters, so the two measure different
// things and will not sum to the same number.
//
// Each row is one device (by MAC), showing its month-to-date total and when it
// was last seen — offline devices stay listed, as the iOS hotspot list does.
// Deleting a device removes its record from the store entirely (it is not a
// counter reset); clearing wipes the month. Neither touches the throughput
// charts — that history is a separate store.

import { useState } from "react";
import { useOuiRegistry } from "../../hooks/useOuiRegistry";
import { useClientTotals } from "../../hooks/useClientTotals";
import { useNow } from "../../hooks/useNow";
import { usageKey, type ClientUsageTotal } from "@core/clientUsage";
import { classifyDevice } from "../../lib/deviceKind";
import { formatBytes, formatRelativeTime } from "../../lib/format";
import { vendorForMac } from "../../lib/macVendor";
import { DeviceTypeIcon } from "../../assets/icons/DeviceTypeIcon";
import { ResetIcon } from "../../assets/icons/ResetIcon";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import { InfoDot } from "../shared/InfoDot";
import { DeviceMergePrompt } from "../shared/DeviceMergePrompt";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Callout } from "../ui/callout";
import { inlineLinkButton } from "../ui/action-button";
import { requestPanel } from "../../hooks/usePanelRouting";
import { selfDeviceHost } from "../../lib/selfDeviceHost";
import { t } from "../../i18n/translate";
import { intlTag } from "../../lib/locale";

/** Local `year * 12 + month` — which monthly bucket an instant belongs to. */
function monthKey(atMs: number): number {
  const date = new Date(atMs);
  return date.getFullYear() * 12 + date.getMonth();
}

export function DeviceUsageList() {
  const {
    totals,
    currentRouterId,
    mergeCandidates,
    unavailable,
    writeError,
    selfDeviceIdentified,
    reset,
    remove,
    clearAll,
    answerMerge,
  } = useClientTotals();
  // Only where the user can act on it from here. A desktop app resolves its own
  // machine and has no such setting; a server recording from elsewhere is told
  // through its own configuration, which is where its warning goes.
  const namingFixesIt = selfDeviceHost()?.namingCorrectsUsage === true;
  // "Active now" and the month a row belongs to are both judged against the
  // current time, which moves whether or not anything re-renders. One clock for
  // the whole list, ticking well inside the two-minute active threshold; a row
  // reading the time itself would need an interval each.
  const nowMs = useNow(30_000);
  const [confirmingClear, setConfirmingClear] = useState(false);
  useOuiRegistry();

  // Nothing to say yet on the very first load. A historian that has gone away is
  // a different thing and says so below, rather than vanishing as if empty.
  if (!totals && !unavailable) return null;
  if (totals && totals.length === 0 && !unavailable) return null;

  // The heading is this calendar month, not whichever month the first record
  // happens to carry — an idle device still holds last month's bucket, and that
  // must not retitle the section.
  const monthLabel = new Date().toLocaleDateString(intlTag(), {
    month: "long",
    year: "numeric",
  });
  const sorted = [...(totals ?? [])].sort(
    (a, b) => b.rxBytes + b.txBytes - (a.rxBytes + a.txBytes),
  );
  const { here, unseen, others } = partitionByRouter(sorted, currentRouterId);

  return (
    <div className='mt-6'>
      <div className='mb-0.5 flex items-center gap-[7px]'>
        <span className='text-[17px] font-bold tracking-[-0.01em] text-foreground'>
          {t("Devices Usage")}
        </span>
        <InfoDot
          tip={t(
            "How much data each device has used this month. The total keeps adding up even if a device leaves and rejoins your network, and it starts over at the beginning of each month.",
          )}
        />
        {unavailable ? null : confirmingClear ? (
          <span className='ml-auto flex items-center gap-2'>
            <button
              className='cursor-pointer border-0 bg-transparent p-0 text-[12px] font-semibold text-destructive'
              onClick={() => {
                void clearAll();
                setConfirmingClear(false);
              }}
            >
              {t("Clear all?")}
            </button>
            <button
              className='cursor-pointer border-0 bg-transparent p-0 text-[12px] font-medium text-muted-foreground'
              onClick={() => setConfirmingClear(false)}
            >
              {t("Cancel")}
            </button>
          </span>
        ) : (
          <button
            className='ml-auto cursor-pointer border-0 bg-transparent p-0 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground'
            onClick={() => setConfirmingClear(true)}
          >
            {t("Clear all")}
          </button>
        )}
      </div>
      <div className='mb-1 text-[11.5px] font-medium text-muted-foreground'>{monthLabel}</div>
      {unavailable && (
        <div className='py-2.5 text-[12.5px] text-muted-foreground'>
          {t("Usage unavailable — historian not reachable.")}
        </div>
      )}
      {writeError && <div className='py-2.5 text-[12.5px] text-destructive'>{writeError}</div>}
      <UsageRows totals={here} nowMs={nowMs} onReset={reset} onRemove={remove} scroll />
      {unseen.length > 0 && (
        <UsageSection
          title={t("Not seen on this network")}
          note={t(
            "Recorded before the app knew which router they were on. A device from this network returns to the list above the next time it connects.",
          )}
        >
          <UsageRows totals={unseen} nowMs={nowMs} onReset={reset} onRemove={remove} />
        </UsageSection>
      )}
      {[...others.entries()].map(([routerId, group]) => (
        <UsageSection
          key={routerId}
          title={t("Another network · {id}", { id: shortRouterId(routerId) })}
        >
          <UsageRows totals={group} nowMs={nowMs} onReset={reset} onRemove={remove} />
        </UsageSection>
      ))}
      {/* Below the rows: the question is about two of them, and reads as a
          footnote to the list rather than a banner over it. */}
      {!selfDeviceIdentified && !unavailable && namingFixesIt && (
        <Callout tone='info' iconSeverity='warn' className='mt-2.5'>
          {t(
            "The device you are using counts Dishylink's own checks of your dish and router as its data. To leave them out,",
          )}{" "}
          <button
            type='button'
            className={inlineLinkButton}
            onClick={() => requestPanel("settings", "app")}
          >
            {t("pick it under app's settings")}
          </button>
          .
        </Callout>
      )}
      <DeviceMergePrompt
        candidates={mergeCandidates}
        totals={totals ?? []}
        nowMs={nowMs}
        onAnswer={(candidate, same) => void answerMerge(candidate, same)}
      />
    </div>
  );
}

/** Last six hex digits of a router device id, enough to tell two kits apart. */
function shortRouterId(routerId: string): string {
  const hex = routerId
    .replace(/^Router-/i, "")
    .slice(-6)
    .toUpperCase();
  return hex || routerId;
}

/** This router's devices, devices not yet stamped, and devices of other routers. */
function partitionByRouter(
  totals: ClientUsageTotal[],
  currentRouterId: string | null,
): {
  here: ClientUsageTotal[];
  unseen: ClientUsageTotal[];
  others: Map<string, ClientUsageTotal[]>;
} {
  const here: ClientUsageTotal[] = [];
  const unseen: ClientUsageTotal[] = [];
  const others = new Map<string, ClientUsageTotal[]>();
  // No router identified yet: one list, as before. Splitting with nothing to
  // split against would park every device under "not seen".
  if (!currentRouterId) return { here: totals, unseen, others };
  for (const total of totals) {
    if (!total.routerId) unseen.push(total);
    else if (total.routerId === currentRouterId) here.push(total);
    else {
      const group = others.get(total.routerId) ?? [];
      group.push(total);
      others.set(total.routerId, group);
    }
  }
  return { here, unseen, others };
}

function UsageSection({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className='mt-4'>
      <div className='text-[13px] font-semibold text-foreground'>{title}</div>
      {note && (
        <div className='mt-0.5 text-[11.5px] leading-[1.45] text-muted-foreground'>{note}</div>
      )}
      {children}
    </div>
  );
}

function UsageRows({
  totals,
  nowMs,
  onReset,
  onRemove,
  scroll,
}: {
  totals: ClientUsageTotal[];
  nowMs: number;
  onReset: (key: string) => void;
  onRemove: (key: string) => void;
  /** The main list scrolls in place past five devices, so it never pushes the
   *  panel too tall. The other-network groups are short and stay open. */
  scroll?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${scroll && totals.length > 5 ? "thin-scroll max-h-[300px] overflow-y-auto" : ""}`}
    >
      {totals.map((total) => {
        // clientId, not MAC: same-vendor devices share a masked MAC, so a
        // MAC key would collide and one row's action would hit its sibling.
        const key = usageKey(total.clientId, total.macAddress);
        return (
          <DeviceUsageRow
            key={key}
            total={total}
            nowMs={nowMs}
            onReset={() => onReset(key)}
            onRemove={() => onRemove(key)}
          />
        );
      })}
    </div>
  );
}

function DeviceUsageRow({
  total,
  nowMs,
  onReset,
  onRemove,
}: {
  total: ClientUsageTotal;
  /** The list's clock, so every row judges "now" against the same moment. */
  nowMs: number;
  onReset: () => void;
  onRemove: () => void;
}) {
  const vendor = vendorForMac(total.macAddress);
  const name = total.name || vendor || total.macAddress;
  // The historian touches lastSeen every poll (~5/s) while a device is connected,
  // so anything seen this recently is here now; "Active now" reads clearer than a
  // last-seen of a few seconds. Older stamps mean the device has actually gone.
  const isActive = nowMs - total.lastSeenMs < 120_000;
  const seenLabel = isActive ? t("Active now") : formatRelativeTime(total.lastSeenMs);
  // A device the historian has not seen this month still holds last month's
  // bucket, so name the month on the row — otherwise it reads as this month's
  // usage under the heading above.
  const staleMonth =
    monthKey(total.sinceMs) === monthKey(nowMs)
      ? null
      : new Date(total.sinceMs).toLocaleDateString(intlTag(), { month: "short" });
  const subParts = [vendor && vendor !== name ? vendor : null, staleMonth, seenLabel].filter(
    Boolean,
  );
  const totalBytes = total.rxBytes + total.txBytes;
  // Classify on the shown name, so a vendor fallback like "Amazon Fire TV" is
  // matched too, not only the reported hostname.
  const kind = classifyDevice(name);
  return (
    <div className='flex items-center gap-3 border-t border-t-hairline py-2.5'>
      <DeviceTypeIcon kind={kind} size={22} className='flex-none text-ink-secondary' />
      <span className='flex min-w-0 flex-1 flex-col gap-px'>
        <span className='overflow-hidden text-[14px] font-semibold text-ellipsis whitespace-nowrap text-foreground'>
          {name}
        </span>
        <span className='text-[11.5px] text-muted-foreground'>{subParts.join(" · ")}</span>
      </span>
      <span className='flex flex-none flex-col items-end'>
        <span className='font-mono text-[14px] font-semibold tabular-nums text-foreground'>
          {formatBytes(totalBytes)}
        </span>
        {/* Arrows carry the dashboard's series colours — the same blue down and
            green up the throughput charts use — so the split reads at a glance
            without the numbers themselves competing with the total above. */}
        <span className='font-mono text-[10.5px] tabular-nums text-muted-foreground'>
          {formatBytes(total.rxBytes)} <span className='text-series-down'>↓</span> ·{" "}
          {formatBytes(total.txBytes)} <span className='text-series-up'>↑</span>
        </span>
      </span>
      {/* Actions live at the end of the row, always visible next to the usage. */}
      <span className='flex flex-none items-center gap-0.5'>
        <RowAction label={t("Reset this month's usage for {name}", { name })} onClick={onReset}>
          <ResetIcon />
        </RowAction>
        <RowAction
          label={t("Delete usage record for {name}", { name })}
          destructive
          onClick={onRemove}
        >
          <CloseIcon />
        </RowAction>
      </span>
    </div>
  );
}

function RowAction({
  label,
  destructive,
  onClick,
  children,
}: {
  label: string;
  destructive?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-ink-secondary transition-[background,color] hover:bg-[color-mix(in_srgb,var(--ink)_10%,var(--surface))] ${destructive ? "hover:text-destructive" : "hover:text-foreground"}`}
          aria-label={label}
          onClick={onClick}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side='top'>{label}</TooltipContent>
    </Tooltip>
  );
}
