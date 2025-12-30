import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) return new Response("Missing ID", { status: 400 });

  await prisma.feature.delete({ where: { id } });
  return new Response("Deleted", { status: 200 });
}
