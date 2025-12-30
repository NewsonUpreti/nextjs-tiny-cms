import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, title, description } = await req.json();
  if (!id || !title || !description) return new Response("Missing fields", { status: 400 });

  const updated = await prisma.feature.update({
    where: { id },
    data: { title, description },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}
