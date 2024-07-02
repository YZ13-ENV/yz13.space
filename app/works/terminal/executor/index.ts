import dayjs from "dayjs";
import { registered_packages } from "../registered-commands";
import { Log } from "../store/logs.store";

const executeCommand = async (
  commandId: string,
  commandToParse: string
): Promise<Log | undefined> => {
  console.log(commandId, commandToParse);
  if (!commandId || !commandToParse) return undefined;
  const trimmed = commandToParse.trimEnd().trimStart();
  const command = trimmed.split(" ");
  const packageCall = command[0] as keyof typeof registered_packages;
  const commandCall =
    command[1] as keyof (typeof registered_packages)[typeof packageCall];
  const variableCall = command[2];
  const isRootCall = !!packageCall === true && !commandCall;
  try {
    console.log(registered_packages[packageCall]);
    console.log(registered_packages[packageCall][commandCall]);
  } catch (e) {
    console.log(e);
    return {
      id: commandId,
      created_at: dayjs().toISOString(),
      command: commandToParse,
      type: "response",
      result: {
        type: "string",
        payload: "Error",
      },
    };
  }
};
export { executeCommand };
