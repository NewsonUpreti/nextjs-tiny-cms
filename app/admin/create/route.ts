import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, description, icon } = await req.json();
  if (!title || !description || !icon) return new Response("Missing fields", { status: 400 });

  const feature = await prisma.feature.create({ data: { title, description, icon } });
  return new Response(JSON.stringify(feature), { status: 200 });
}
