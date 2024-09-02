import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient: ReturnType<typeof createSafeActionClient> =
  createSafeActionClient({
    defineMetadataSchema() {
      return z.optional(
        z.object({
          type: z.string(),
          method: z.string(),
        })
      );
    },
  });
