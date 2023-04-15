import { NextRequest } from "next/server";

// perform a GET request over the Tor SOCKS proxy


//const OPENAI_URL = "api.openai.com";
//const DEFAULT_PROTOCOL = "https";

const OPENAI_URL = "127.0.0.1:8080";
const DEFAULT_PROTOCOL = "http";

const PROTOCOL = process.env.PROTOCOL ?? DEFAULT_PROTOCOL;
const BASE_URL = process.env.BASE_URL ?? OPENAI_URL;

export async function requestOpenai(req: NextRequest) {
  const apiKey = req.headers.get("token")??"";
  const openaiPath = req.headers.get("path");

  let baseUrl = BASE_URL;

  if (!baseUrl.startsWith("http")) {
    baseUrl = `${PROTOCOL}://${baseUrl}`;
  }

  console.log("[Proxy] ", openaiPath);
  console.log("[Base Url]", baseUrl);

  return fetch(`${baseUrl}/${openaiPath}`, {
    headers: {
      "Content-Type": "application/json",
      Token:"...",
      UserAPI: `${apiKey}`,
    },
    method: req.method,
    body: req.body,
  });
}


