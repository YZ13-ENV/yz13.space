import { ReactNode } from "react";
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

export type Result = ListResult<any> | StringResult | NumberResult;

const registered_packages = {
  yz13,
};
export { registered_packages };
