import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id, title, description, icon } = await req.json();
  if (!id || !title || !description || !icon) return new Response("Missing fields", { status: 400 });

  const updated = await prisma.feature.update({
    where: { id },
    data: { title, description, icon },
  });

  return new Response(JSON.stringify(updated), { status: 200 });
}
