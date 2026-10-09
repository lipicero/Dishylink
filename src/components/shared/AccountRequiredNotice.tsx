import { requestPanel } from "../../hooks/usePanelRouting";
import { inlineLinkButton } from "../ui/action-button";
import { t } from "../../i18n/translate";

/** Owns the wording so "sign in" is a real control rather than a phrase the
 *  reader has to act on somewhere else. */
export function AccountRequiredNotice() {
  return (
    <>
      {t("An authorized account is required —")}{" "}
      <button type='button' className={inlineLinkButton} onClick={() => requestPanel("account")}>
        {t("sign in")}
      </button>{" "}
      {t("to use this feature.")}
    </>
  );
}
