import { prisma } from "@/lib/prisma";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "desc" },
  });
  const normalizedFeatures = features.map((f) => ({
    ...f,
    icon: f.icon || "",
  }));

  return <AdminClient initialFeatures={normalizedFeatures} />;
}
