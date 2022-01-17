import { SharedAction, SharedActionData, WebsocketActionPayload } from "@todoguru/shared/actions/_types";
import { serialNumberFactory } from "@todoguru/shared/common/utils/serial-number-factory";
import { ClientAction } from "../../actions/_types";

const serial = serialNumberFactory()

const clipClientProperties = (action: ClientAction): SharedAction => {
  const copy = { ...action }
  delete copy.credentials
  return copy
}

// do we need to clip the extra properties from client payload
export const websocketPayload = (action: ClientAction, data?: SharedActionData): WebsocketActionPayload => ({
  nonce: serial(),
  action: clipClientProperties(action),
  data
})
