import { SharedAction } from "../_types";

export const createAction = <T extends SharedAction>(data: T) => data;
