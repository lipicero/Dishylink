import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SparklesIcon } from "lucide-react";
import { PromptDialog } from "./PromptDialog";
import { SUPPORT_LINKS } from "./supportLinks";
import {
  highlightsSince,
  markWhatsNewSeen,
  WHATS_NEW_RELEASE,
  whatsNewDue,
  whatsNewLastSeen,
} from "@/lib/whatsNew";

function open(url: string): void {
  if (window.dishlink?.openExternal) window.dishlink.openExternal(url);
  else window.open(url, "_blank", "noopener,noreferrer");
}

function WhatsNew({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();

  return (
    <PromptDialog
      icon={<SparklesIcon />}
      title={t("whatsNew.title", { version: WHATS_NEW_RELEASE })}
      onDismiss={onDone}
    >
      <ul className='mt-7 list-disc space-y-2.5 pl-5 text-left text-[14px] leading-relaxed text-ink-secondary marker:text-ink-muted'>
        {highlightsSince(whatsNewLastSeen()).map(({ title, body }) => (
          <li key={body}>
            {title && <strong className='font-semibold text-ink'>{t(title)} </strong>}
            {t(body)}
          </li>
        ))}
      </ul>

      <button
        type='button'
        onClick={() => open(SUPPORT_LINKS.releaseNotes)}
        className='mt-5 cursor-pointer border-0 bg-transparent text-[13px] text-ink-secondary transition-colors hover:text-ink'
      >
        {t("whatsNew.releaseNotes")} →
      </button>

      <button
        type='button'
        onClick={onDone}
        className='mt-7 cursor-pointer border-0 bg-transparent text-[13px] text-ink-secondary/80 transition-colors hover:text-ink'
      >
        {t("whatsNew.gotIt")}
      </button>
    </PromptDialog>
  );
}

export function AppPrompts() {
  const [showing, setShowing] = useState(() => whatsNewDue());
  if (!showing) return null;

  const close = (): void => {
    markWhatsNewSeen();
    setShowing(false);
  };
  return <WhatsNew onDone={close} />;
}
