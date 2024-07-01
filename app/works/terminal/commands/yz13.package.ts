import * as json from "@/package.json";
import { plans } from "../plans";

const yz13 = {
  plans: () => plans,
  version: () => json.version,
};

export { yz13 };
