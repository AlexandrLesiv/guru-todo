import { SharedActionData } from "@todoguru/shared/actions/_types";
import { ClientAction } from "../../actions/_types";

export interface ApiProvider {
  request(action: ClientAction, data?: SharedActionData): Promise<any>;
  ready(): boolean
}
