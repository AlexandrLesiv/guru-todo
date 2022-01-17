import { ServerAction } from "../../actions/_types/action";

export interface ActionSource {
  startListening(): void;
  registerAction(action: ServerAction): void;
}
