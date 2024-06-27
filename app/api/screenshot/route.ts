import { createClient } from "@/packages/supabase/src/supabase/server";
import { cookies } from "next/headers";
import puppeteer from "puppeteer";
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const path = searchParams.get("path") || "/screenshot.png";
  const cks = cookies();
  const sp = createClient(cks);
  try {
    if (!url) throw new Error("invalid path");
    const screen_url = new URL(url).toString();
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(screen_url);
    const buff = await page.screenshot();
    await browser.close();
    if (buff) {
      const full_path = path + "/screenshot.png";
      const res = await sp.storage.from("templates").upload(full_path, buff, {
        contentType: "image/png",
        upsert: true,
      });
      const data = res.data;
      const img_url = data?.fullPath;
      return new Response(img_url);
    } else throw new Error("something went wrong while taking a screenshot");
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify(null));
  }
};
