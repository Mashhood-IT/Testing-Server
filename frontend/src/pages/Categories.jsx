import React, { useState } from "react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from "../features/catalog/catalogApi";
import { PlusCircle, Trash2, RefreshCcw } from "lucide-react";

export default function Categories() {
  const { data: categories, isFetching } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const add = async (e) => {
    e.preventDefault();
    if (!name || !slug) return;
    await createCategory({ name, slug }).unwrap();
    setName("");
    setSlug("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 rounded-xl">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        Manage Categories
      </h2>

      <form
        onSubmit={add}
        className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-5 rounded-2xl shadow-lg border border-gray-100"
      >
        <input
          className="border border-gray-200 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-200 p-3 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-all"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </form>

      {isFetching ? (
        <p className="text-center text-gray-500">Loading categories...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((c) => (
            <div
              key={c._id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500">/{c.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                    onClick={() =>
                      updateCategory({
                        id: c._id,
                        data: {
                          status: c.status === "active" ? "inactive" : "active",
                        },
                      })
                    }
                  >
                    <RefreshCcw size={14} className="inline-block mr-1" />
                    {c.status}
                  </button>
                  <button
                    onClick={() => deleteCategory(c._id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
