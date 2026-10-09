import { cloudRequest, type CloudRequest, type CloudReply } from "./cloudHost";
import { t } from "../i18n/translate";
import { AccountRequiredError } from "./routerClientUpdate";
import type { DishConfigJson } from "@core/dishClient";

export { AccountRequiredError };

/** Send a dish config change through Starlink cloud, the same path a client
 *  rename or pause takes — LAN writes are refused by current firmware. */
export async function applyDishConfigUpdate(
  changes: DishConfigJson,
  request: (request: CloudRequest) => Promise<CloudReply> = cloudRequest,
): Promise<void> {
  const reply = await request({ path: "/cloud/dish-config", method: "POST", body: changes });
  if (reply.status === 200) return;
  const message = (reply.body as { message?: string })?.message ?? `HTTP ${reply.status}`;
  if (reply.status === 428) throw new AccountRequiredError(t(message));
  throw new Error(t("Starlink rejected the config change: {detail}", { detail: t(message) }));
}
