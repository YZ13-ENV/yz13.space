import { verifyAccess, type ApiData } from "@vercel/flags";
import { NextResponse, type NextRequest } from "next/server";
import { files_flag } from "../../../../feature-flags/files.feature";
import { status_flag } from "../../../../feature-flags/status.feature";
import { tech_stack_flag } from "../../../../feature-flags/tech-stack.feature";

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      files: {
        description: files_flag.description,
        options: files_flag.options as { value: any; label?: string }[],
        origin: files_flag.origin,
      },
      status: {
        description: status_flag.description,
        options: status_flag.options as { value: any; label?: string }[],
        origin: status_flag.origin,
      },
      stack: {
        description: tech_stack_flag.description,
        options: tech_stack_flag.options as { value: any; label?: string }[],
        origin: tech_stack_flag.origin,
      },
    },
  });
}
