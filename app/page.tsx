import { prisma } from "@/lib/prisma";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export const revalidate = 60; // ISR for 60s

export default async function Home() {
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="px-8 py-12 max-w-5xl mx-auto font-sans">
      <h1 className="text-4xl font-bold text-center mb-12">Landing Page</h1>

      {features.length === 0 && (
        <p className="text-center text-lg text-gray-600">No features yet.</p>
      )}

      <div className="space-y-6">
        {features.map((f) => {
          // Cast explicitly to React component type
          const IconComponent =
            f.icon && LucideIcons[f.icon as keyof typeof LucideIcons]
              ? (LucideIcons[f.icon as keyof typeof LucideIcons] as React.ComponentType<LucideProps>)
              : null;

          return (
            <div
              key={f.id}
              className="flex items-center gap-4 p-4 border border-gray-500/40 rounded-lg"
            >
              {IconComponent && <IconComponent className="w-6 h-6 text-blue-500" />}
              <div className="flex flex-col">
                <h2 className="font-bold text-lg">{f.title}</h2>
                <p className="text-gray-700">{f.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
