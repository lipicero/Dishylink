import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TranslationKey } from "@core/i18n/resources";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HeartIcon } from "../../assets/icons/HeartIcon";
import { StarIcon } from "../../assets/icons/StarIcon";
import { CoffeeIcon } from "../../assets/icons/CoffeeIcon";
import { PatreonIcon } from "../../assets/icons/PatreonIcon";
import { DownloadIcon } from "../../assets/icons/DownloadIcon";
import { BugIcon } from "../../assets/icons/BugIcon";
import { BulbIcon } from "../../assets/icons/BulbIcon";
import { MailIcon } from "../../assets/icons/MailIcon";
import { XIcon } from "../../assets/icons/XIcon";
import { LinkedinIcon } from "../../assets/icons/LinkedinIcon";
import { ShieldIcon } from "../../assets/icons/ShieldIcon";
import { ScaleIcon } from "../../assets/icons/ScaleIcon";
import { getUpdateDownloadUrl, SUPPORT_LINKS } from "./supportLinks";
import { APP_VERSION } from "../../lib/appVersion";

type IconComponent = React.ComponentType<React.ComponentProps<"svg"> & { size?: number }>;

// Electron's renderer is sandboxed with no shell access, so it has to cross
// the preload bridge to main, which owns `shell.openExternal`. The web dev
// harness and the extension's pages are already a browser tab, so
// `window.open` is the whole job there.
function openExternal(url: string): void {
  if (window.dishlink?.openExternal) {
    window.dishlink.openExternal(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

const MENU_ITEM =
  "flex w-full items-center gap-2.5 rounded-[8px] px-2 py-2 text-left text-[13px] text-ink no-underline transition-colors hover:bg-hairline";
const MENU_LABEL =
  "px-2 pt-1.5 pb-1 text-[10.5px] font-semibold tracking-[0.06em] text-ink-muted uppercase";
const SECTION = "border-b border-border p-1.5 last:border-b-0";

interface MenuLinkItem {
  href: string;
  icon: IconComponent;
  iconClassName?: string;
  centered?: boolean;
  children: React.ReactNode;
}

interface MenuLinkEntry {
  href: string;
  icon: IconComponent;
  iconClassName?: string;
  centered?: boolean;
  /** A catalog key, or a literal (a handle, a brand) that reads the same everywhere. */
  label: TranslationKey | { literal: string };
}

function MenuLink({ href, icon: Icon, iconClassName, centered, children }: MenuLinkItem) {
  return (
    <button
      type='button'
      className={cn(
        MENU_ITEM,
        "cursor-pointer border-0 bg-transparent",
        centered && "justify-center",
      )}
      onClick={() => openExternal(href)}
    >
      <span className={cn("size-[15px] flex-none", iconClassName ?? "text-ink-secondary")}>
        <Icon className='size-full' />
      </span>
      {children}
    </button>
  );
}

const SECTIONS: { label: TranslationKey; items: MenuLinkEntry[] }[] = [
  {
    label: "support.sectionSupport",
    items: [
      {
        href: SUPPORT_LINKS.starRepo,
        icon: StarIcon,
        iconClassName: "text-(--accent)",
        label: "support.starRepo",
      },
      {
        href: SUPPORT_LINKS.githubSponsors,
        icon: HeartIcon,
        iconClassName: "text-[#ea4aaa]",
        label: "support.githubSponsor",
      },
      {
        href: SUPPORT_LINKS.patreon,
        icon: PatreonIcon,
        iconClassName: "text-ink",
        label: "support.patreon",
      },
      {
        href: SUPPORT_LINKS.buyMeACoffee,
        icon: CoffeeIcon,
        iconClassName: "text-ink",
        label: "support.buyMeACoffee",
      },
    ],
  },
  {
    label: "support.sectionFeedback",
    items: [
      { href: SUPPORT_LINKS.reportIssue, icon: BugIcon, label: "support.reportIssue" },
      { href: SUPPORT_LINKS.requestFeature, icon: BulbIcon, label: "support.requestFeature" },
    ],
  },
  {
    label: "support.sectionContact",
    items: [
      { href: SUPPORT_LINKS.contact, icon: MailIcon, label: "support.contactMe" },
      { href: SUPPORT_LINKS.x, icon: XIcon, label: { literal: "@daveyhert" } },
      { href: SUPPORT_LINKS.linkedin, icon: LinkedinIcon, label: { literal: "LinkedIn" } },
    ],
  },
  {
    label: "support.sectionLegal",
    items: [
      { href: SUPPORT_LINKS.privacyPolicy, icon: ShieldIcon, label: "support.privacyPolicy" },
      { href: SUPPORT_LINKS.disclaimer, icon: ScaleIcon, label: "support.disclaimer" },
    ],
  },
];

/** Absent in the browser and extension builds, where there is no packaged build
 *  to check a GitHub release against — window.dishlink.updateState is desktop-only. */
function useUpdateAvailable(): string | null {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const host = window.dishlink;
    if (!host) return;
    host.updateState().then((state) => setVersion(state.available ? state.version : null));
    return host.onUpdateState((state) => setVersion(state.available ? state.version : null));
  }, []);

  return version;
}

export function SupportMenu() {
  const { t } = useTranslation();
  const updateVersion = useUpdateAvailable();
  const updateDownloadUrl = updateVersion
    ? getUpdateDownloadUrl(updateVersion, window.dishlink?.platform, window.dishlink?.arch)
    : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className='relative inline-flex size-8 cursor-pointer items-center justify-center rounded-full border-0 bg-card text-ink-secondary transition-colors hover:text-foreground'
          aria-label={updateVersion ? t("support.ariaUpdateAvailable") : t("support.aria")}
          title={t("support.title")}
        >
          <HeartIcon />
          {updateVersion && (
            <span className='absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-semibold leading-none text-destructive-foreground'>
              1
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align='end'
        sideOffset={10}
        collisionPadding={12}
        // The glass treatment the rail/dock toolbar uses at rest — translucent
        // surface, ink-tinted border, backdrop blur — rather than a flat opaque
        // panel that reads as a different surface family from the rest of the UI.
        className='flex max-h-(--radix-popover-content-available-height) w-75 flex-col overflow-hidden rounded-xl border border-border/50 bg-[color-mix(in_srgb,var(--surface-raised)_80%,transparent)] dark:bg-[color-mix(in_srgb,#0e0e0e_80%,transparent)] p-0 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150 dark:shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]'
      >
        <div className='border-b border-border/50 px-4 py-3'>
          <div className='flex items-baseline gap-2'>
            <span className='text-[13.5px] font-semibold'>Dishylink</span>
            <span className='font-mono text-[11px] text-ink-muted tabular-nums'>
              v{APP_VERSION}
            </span>
          </div>
          <button
            type='button'
            onClick={() => openExternal(SUPPORT_LINKS.releaseNotes)}
            className='mt-1 cursor-pointer border-0 bg-transparent p-0 text-[11px] text-ink-muted transition-colors hover:text-ink'
          >
            {t("support.changelog")} →
          </button>
          <p className='mt-2 text-[10px] text-ink-muted'>{t("support.forkCredit")}</p>
        </div>

        {/* Scrolls under the fixed header on a short window. The bottom margin keeps
            the scrollbar off the rounded corner, which it would otherwise run through. */}
        <div className='thin-scroll mb-3 min-h-0 overflow-y-auto'>
          {updateVersion && (
            <div className={SECTION}>
              <div className={cn(MENU_LABEL, "flex items-center gap-1.5")}>
                {t("support.updateAvailable")}
                <span className='size-1 rounded-full bg-red-500 shadow-[0_0_4px_1.5px_rgba(239,68,68,0.85)]' />
              </div>
              <MenuLink
                href={updateDownloadUrl ?? SUPPORT_LINKS.latestRelease}
                icon={DownloadIcon}
                iconClassName='text-status-good'
              >
                {t("support.downloadVersion", { version: updateVersion })}
              </MenuLink>
            </div>
          )}

          {SECTIONS.map((section) => (
            <div key={section.label} className={SECTION}>
              <div className={MENU_LABEL}>{t(section.label)}</div>
              {section.items.map((entry) => (
                <MenuLink
                  key={entry.href}
                  href={entry.href}
                  icon={entry.icon}
                  iconClassName={entry.iconClassName}
                  centered={entry.centered}
                >
                  {typeof entry.label === "string" ? t(entry.label) : entry.label.literal}
                </MenuLink>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
