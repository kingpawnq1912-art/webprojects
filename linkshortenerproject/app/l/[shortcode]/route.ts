import { NextResponse } from "next/server";
import { getLinkByShortCode } from "@/data/links";

type RedirectRouteContext = {
  params: Promise<{ shortcode: string }>;
};

export async function GET(_request: Request, context: RedirectRouteContext) {
  const { shortcode } = await context.params;
  const link = await getLinkByShortCode(shortcode);

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  return NextResponse.redirect(link.originalUrl);
}