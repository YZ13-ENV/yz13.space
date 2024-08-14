import { verifyAccess, type ApiData } from "@vercel/flags";
import { NextResponse, type NextRequest } from "next/server";
import { dock_id_flag } from "../../../../feature-flags/dock-id.feature";
import { offer_flag } from "../../../../feature-flags/offer.feature";

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      "dock-id": {
        description: dock_id_flag.description,
        options: dock_id_flag.options as { value: any; label?: string }[],
        origin: dock_id_flag.origin,
      },
      offer: {
        description: offer_flag.description,
        options: offer_flag.options as { value: any; label?: string }[],
        origin: offer_flag.origin,
      },
    },
  });
}
