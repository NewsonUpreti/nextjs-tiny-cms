"use client";
import { useState } from "react";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export default function AdminClient({
  initialFeatures,
}: {
  initialFeatures: Feature[];
}) {
  // One state array for all features to avoid hooks-in-loop issues
  const [features, setFeatures] = useState(
    initialFeatures.map((f) => ({ ...f })),
  );
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIcon, setNewIcon] = useState(""); // store icon name

  async function handleCreate() {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const res = await fetch("/admin/create", {
      method: "POST",
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        icon: newIcon,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const feature = await res.json();
    setFeatures([feature, ...features]);
    setNewTitle("");
    setNewDescription("");
    setNewIcon("");
  }

  // Delete a feature
  async function handleDelete(id: string) {
    await fetch("/admin/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setFeatures(features.filter((f) => f.id !== id));
  }

  // Edit a feature
  async function handleEdit(id: string, title: string, description: string) {
    const res = await fetch("/admin/edit", {
      method: "POST",
      body: JSON.stringify({ id, title, description }),
      headers: { "Content-Type": "application/json" },
    });

    const updated = await res.json();
    setFeatures(features.map((f) => (f.id === id ? updated : f)));
  }

  // Update feature fields locally
  const updateFeatureField = (
    id: string,
    field: "title" | "description" | "icon",
    value: string,
  ) => {
    setFeatures(
      features.map((f) => (f.id === id ? { ...f, [field]: value } : f)),
    );
  };

  return (
    <main className="px-8 py-12 max-w-4xl mx-auto font-sans">
      <h1 className="font-bold text-2xl border-b border-gray-500/50 mb-4 pb-2">
        Admin Panel
      </h1>

      {/* Add new section */}
      <div className="p-4 border border-gray-500/40 rounded-lg mb-6">
        <div className="flex gap-2">
          <input
            placeholder="New Section Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-2/3 p-2 mb-2 border border-gray-500/40 rounded"
          />
          <input
            placeholder="New Section Icon"
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            className="w-1/3 p-2 mb-2 border border-gray-500/40 rounded"
          />
        </div>
        <textarea
          placeholder="New Section Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-500/40 rounded"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Section
        </button>
      </div>

      {/* Existing features */}
      <div className="space-y-4">
        {features.map((feat) => (
          <div
            key={feat.id}
            className="flex flex-col p-4 border border-gray-500/40 rounded-lg"
          >
            <div>
              <input
                value={feat.icon}
                onChange={(e) =>
                  updateFeatureField(feat.id, "icon", e.target.value)
                }
                className="border-b border-gray-500/40 mb-2 font-bold text-lg p-1"
              />
              <input
                value={feat.title}
                onChange={(e) =>
                  updateFeatureField(feat.id, "title", e.target.value)
                }
                className="border-b border-gray-500/40 mb-2 font-bold text-lg p-1"
              />
            </div>
            <textarea
              value={feat.description}
              onChange={(e) =>
                updateFeatureField(feat.id, "description", e.target.value)
              }
              className="p-2 border border-gray-500/40 rounded-lg mb-2"
            />

            <div className="flex justify-between">
              <button
                onClick={() =>
                  handleEdit(feat.id, feat.title, feat.description)
                }
                className="bg-green-500 text-white px-3 py-1 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => handleDelete(feat.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
