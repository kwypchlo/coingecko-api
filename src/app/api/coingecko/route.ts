export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return new Response("Missing required parameter 'ids'", { status: 400 });
  }

  const endpoint = new URL("https://api.coingecko.com/api/v3/simple/price");
  endpoint.searchParams.append("ids", ids);
  endpoint.searchParams.append("vs_currencies", "usd");

  const res = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      "x-cg-api-key": process.env.COINGECKO_API_KEY!,
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
