import { z } from "zod";

export const schema = z.object({
  path: z.string(),
});
