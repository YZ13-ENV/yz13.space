import { ReactNode } from "react";
import { router } from "./commands/router.package";
import { yz13 } from "./commands/yz13.package";
import { Plan } from "./plans";

export type Log = string | Plan[];
export type CommandRequest = {
  id: string;
  type: "request";
  created_at: string;
  command: string;
};
export type CommandPending = {
  id: string;
  type: "pending";
  created_at: string;
  command: string;
  placeholder: ReactNode;
};
export type CommandResponse = {
  id: string;
  type: "response";
  created_at: string;
  command: string;
  result: Result;
};

type ComponentResult = {
  type: "component";
  payload: ReactNode;
};

type ListResult<T extends any> = {
  type: "list";
  payload: T[];
};

type StringResult = {
  type: "string";
  payload: string;
};

type NumberResult = {
  type: "number";
  payload: number;
};

type WithFunc<T> = {
  executed?: boolean;
  props?: T;
  func?: (props?: T) => void;
};

export type Result = (
  | ComponentResult
  | ListResult<any>
  | StringResult
  | NumberResult
) &
  WithFunc<any>;

const registered_packages = {
  yz13,
  router,
};
export { registered_packages };
