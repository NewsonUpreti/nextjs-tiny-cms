import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, description } = await req.json();
  if (!title || !description) return new Response("Missing fields", { status: 400 });

  const feature = await prisma.feature.create({ data: { title, description } });
  return new Response(JSON.stringify(feature), { status: 200 });
}
