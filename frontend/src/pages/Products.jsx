import React, { useEffect, useMemo, useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadImagesMutation,
  useGetCategoriesQuery,
  useDeleteProductMutation,
} from "../features/catalog/catalogApi";
import {
  Upload,
  PackagePlus,
  Image,
  ShoppingBag,
  Pencil,
  X,
  DollarSign,
  Package,
  Tag,
  FileText,
  Layers,
  AlertCircle,
} from "lucide-react";
import {toast} from "react-toastify";

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // normalize: fix backslashes, trim spaces, remove duplicate leading slashes
  const raw = String(imagePath).trim().replace(/\\/g, "/");
  if (/^https?:\/\//i.test(raw)) return raw;

  // some backends store as '/uploads/...' or 'uploads/...'
  const clean = raw.replace(/^\/+/, "");
  return `${import.meta.env.VITE_API_URL}/${clean}`;
};
export default function Products() {
  const [page, setPage] = useState(1);
  const { data, isFetching, refetch } = useGetProductsQuery({ page });
  const { data: cats } = useGetCategoriesQuery();
  const [createProduct, { isLoading: saving }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const [uploadImages] = useUploadImagesMutation();

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const catOptions = useMemo(() => cats || [], [cats]);
  const [specs, setSpecs] = useState([{ label: "", value: "" }]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const [tabsData, setTabsData] = useState([
    { tab: "", tabName: "", tabDescription: "" },
  ]);
  const [productAdditional, setProductAdditional] = useState({
    tagline: "",
    title2: "",
    subTitle2: "",
    description2: "",
  });

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setCategory("");
    setStock("");
    setDesc("");
    setPdfFile(null);
    setPdfUrl("");
    setFiles([]);
    setExistingImages([]);
    setEditingId(null);
    setTabsData([{ tab: "", tabName: "", tabDescription: "" }]);
    setProductAdditional({
      tagline: "",
      title2: "",
      subTitle2: "",
      description2: "",
    });
    setSpecs([{ label: "", value: "" }]);
    setFaqs([{ question: "", answer: "" }]);
  };

  const submit = async (e) => {
    e.preventDefault();
    let newImages = [];
    let uploadedPdfUrl = pdfUrl;
    const cleanedSpecs = (specs || []).filter(
      (s) => (s.label || "").trim() || (s.value || "").trim()
    );
    const cleanedFaqs = (faqs || []).filter(
      (f) => (f.question || "").trim() || (f.answer || "").trim()
    );

    if (pdfFile) {
      const pdfForm = new FormData();
      pdfForm.append("pdf", pdfFile);
      const pdfUploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload/pdf`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: pdfForm,
      });

      const result = await pdfUploadResponse.json();

      uploadedPdfUrl = result.url;
    }

    if (files && files.length) {
      const form = new FormData();
      [...files].forEach((f) => form.append("images", f));
      const up = await uploadImages(form).unwrap();
      newImages = up.urls;
    }

    const finalImages = [...existingImages, ...newImages];
    if (editingId) {
      await updateProduct({
        id: editingId,
        data: {
          title,
          slug,
          category,
          stock: Number(stock || 0),
          description: desc,
          images: finalImages,
          pdf: uploadedPdfUrl || "",
          tabs: tabsData,
          productAdditional,
          specs: cleanedSpecs,
          faqs: cleanedFaqs,
        },
      }).unwrap();
    } else {
      await createProduct({
        title,
        slug,
        category,
        stock: Number(stock || 0),
        description: desc,
        images: finalImages,
        productAdditional,
        pdf: uploadedPdfUrl || "",
        tabs: tabsData,
        specs: cleanedSpecs,
        faqs: cleanedFaqs,
      }).unwrap();
    }

    resetForm();
    refetch();
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setTitle(p.title);
    setSlug(p.slug);
    setPdfUrl(p.pdf || "");
    setPdfFile(null);
    setCategory(p.category?._id || "");
    setStock(p.stock);
    setDesc(p.description);
    setExistingImages(p.images || []);
    setFiles([]);
    setSpecs(
      Array.isArray(p.specs) && p.specs.length
        ? p.specs
        : [{ label: "", value: "" }]
    );

    setFaqs(
      Array.isArray(p.faqs) && p.faqs.length
        ? p.faqs
        : [{ question: "", answer: "" }]
    );

    setProductAdditional({
      tagline: p.productAdditional?.tagline || "",
      title2: p.productAdditional?.title2 || "",
      subTitle2: p.productAdditional?.subTitle2 || "",
      description2: p.productAdditional?.description2 || "",
    });

    setTabsData(
      Array.isArray(p.tabs) && p.tabs.length
        ? p.tabs
        : [{ tab: "", tabName: "", tabDescription: "" }]
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const removeNewFile = (idx) => {
    setFiles((prev) => [...prev].filter((_, i) => i !== idx));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
                Products Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                Manage your product catalog efficiently
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
              <Package className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-700">
                {data?.total || 0} Products
              </span>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="mb-8 sm:mb-12 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
              <PackagePlus className="w-5 h-5 sm:w-6 sm:h-6" />
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-indigo-100 text-xs sm:text-sm mt-1">
              Fill in the details below to {editingId ? "update" : "create"} a
              product
            </p>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Tag className="w-4 h-4 text-indigo-600" />
                  Product Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base"
                  placeholder="Enter product title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  Product Slug
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm sm:text-base"
                  placeholder="product-slug-url"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  Category
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-sm sm:text-base"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {catOptions.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Package className="w-4 h-4 text-blue-600" />
                  Stock Quantity
                  <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-orange-600" />
                Product Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-xl min-h-[120px] sm:min-h-[140px] focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none text-sm sm:text-base"
                placeholder="Describe your product in detail..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <div className="space-y-6 border-gray-200 border rounded-xl p-4 sm:p-6">
              <label className="text-sm font-semibold text-gray-700">
                Tabs Information
              </label>

              {tabsData.map((tab, index) => (
                <div key={index} className="space-y-2   rounded-xl ">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Tab ID (e.g. description)"
                      value={tab.tab}
                      onChange={(e) => {
                        const newTabs = [...tabsData];
                        newTabs[index].tab = e.target.value;
                        setTabsData(newTabs);
                      }}
                      className="w-full border-2 border-gray-200 p-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      placeholder="Tab Name (Heading)"
                      value={tab.tabName}
                      onChange={(e) => {
                        const newTabs = [...tabsData];
                        newTabs[index].tabName = e.target.value;
                        setTabsData(newTabs);
                      }}
                      className="w-full border-2 border-gray-200 p-2  rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  <textarea
                    placeholder="Tab Description"
                    value={tab.tabDescription}
                    onChange={(e) => {
                      const newTabs = [...tabsData];
                      newTabs[index].tabDescription = e.target.value;
                      setTabsData(newTabs);
                    }}
                    rows={4}
                    className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                    required
                  />

                  <div className="flex justify-end gap-2">
                    {tabsData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTabs = tabsData.filter(
                            (_, i) => i !== index
                          );
                          setTabsData(newTabs);
                        }}
                        className="bg-red-500 text-white rounded-md px-4 py-1 cursor-pointer  text-md"
                      >
                        Remove Tab
                      </button>
                    )}
                    {index === tabsData.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setTabsData([
                            ...tabsData,
                            { tab: "", tabName: "", tabDescription: "" },
                          ])
                        }
                        className="bg-indigo-600 text-white px-4 py-1 rounded-md cursor-pointer text-md"
                      >
                        Add Tab
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className=" space-y-4 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-800">
                Additional Description{" "}
                <span className="text-gray-400 text-sm font-normal">
                  (Optional)
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={productAdditional.tagline}
                    onChange={(e) =>
                      setProductAdditional((prev) => ({
                        ...prev,
                        tagline: e.target.value,
                      }))
                    }
                    placeholder="Short punchline for the product"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Title 2
                  </label>
                  <input
                    type="text"
                    value={productAdditional.title2}
                    onChange={(e) =>
                      setProductAdditional((prev) => ({
                        ...prev,
                        title2: e.target.value,
                      }))
                    }
                    placeholder="Secondary title (e.g., 'Modern Simplicity')"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Subtitle 2
                  </label>
                  <input
                    type="text"
                    value={productAdditional.subTitle2}
                    onChange={(e) =>
                      setProductAdditional((prev) => ({
                        ...prev,
                        subTitle2: e.target.value,
                      }))
                    }
                    placeholder="Secondary subtitle"
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Description 2
                  </label>
                  <textarea
                    value={productAdditional.description2}
                    onChange={(e) =>
                      setProductAdditional((prev) => ({
                        ...prev,
                        description2: e.target.value,
                      }))
                    }
                    rows={4}
                    placeholder="Additional long description..."
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm resize-none"
                  />
                </div>
              </div>
            </div>
            {/* Specifications (Optional) */}
            <div className="mt-8 space-y-4 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                  Specifications{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    (Optional)
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setSpecs((prev) => [...prev, { label: "", value: "" }])
                  }
                  className="text-indigo-600 hover:underline text-sm font-semibold"
                >
                  Add Row
                </button>
              </div>

              {specs.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                >
                  <input
                    type="text"
                    placeholder="Label (e.g., Warranty)"
                    value={row.label}
                    onChange={(e) => {
                      const next = [...specs];
                      next[i].label = e.target.value;
                      setSpecs(next);
                    }}
                    className="md:col-span-5 border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., 1 Year Manufacturer Warranty)"
                    value={row.value}
                    onChange={(e) => {
                      const next = [...specs];
                      next[i].value = e.target.value;
                      setSpecs(next);
                    }}
                    className="md:col-span-6 border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                  <div className="md:col-span-1 flex md:justify-end">
                    {specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setSpecs((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="w-full md:w-auto px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 text-sm font-medium"
                        title="Remove"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQs (Optional) */}
            <div className="mt-8 space-y-4 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-bold text-gray-800">
                  FAQs{" "}
                  <span className="text-gray-400 text-sm font-normal">
                    (Optional)
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() =>
                    setFaqs((prev) => [...prev, { question: "", answer: "" }])
                  }
                  className="text-indigo-600 hover:underline text-sm font-semibold"
                >
                  Add Question
                </button>
              </div>

              {faqs.map((f, i) => (
                <div key={i} className="space-y-2 rounded-xl p-4">
                  <input
                    type="text"
                    placeholder="Question"
                    value={f.question}
                    onChange={(e) => {
                      const next = [...faqs];
                      next[i].question = e.target.value;
                      setFaqs(next);
                    }}
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                  />
                  <textarea
                    rows={3}
                    placeholder="Answer"
                    value={f.answer}
                    onChange={(e) => {
                      const next = [...faqs];
                      next[i].answer = e.target.value;
                      setFaqs(next);
                    }}
                    className="w-full border-2 border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm resize-none"
                  />
                  <div className="flex justify-end">
                    {faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setFaqs((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 text-sm font-medium"
                        title="Remove FAQ"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Image className="w-4 h-4 text-pink-600" />
                  Product Images
                </label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-4 sm:p-6 rounded-xl cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group">
                  <Upload
                    size={24}
                    className="text-indigo-600 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs sm:text-sm text-gray-600 font-medium text-center">
                    Click to upload images
                  </span>
                  <span className="text-xs text-gray-400">JPG, PNG, WEBP</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      setFiles((prev) => [
                        ...prev,
                        ...Array.from(e.target.files),
                      ])
                    }
                  />
                </label>
              </div>
              {/* 🔹 Product PDF Upload */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText className="w-4 h-4 text-red-600" />
                  Product PDF{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-4 sm:p-6 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition-all group">
                  <Upload
                    size={24}
                    className="text-red-600 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-xs sm:text-sm text-gray-600 font-medium text-center">
                    Click to upload PDF file
                  </span>
                  <span className="text-xs text-gray-400">Only .pdf files</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setPdfFile(file);
                    }}
                  />
                </label>

                {pdfFile && (
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg mt-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-red-600" />
                      <span className="text-sm text-gray-700">
                        {pdfFile.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfFile(null)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {pdfUrl && !pdfFile && (
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg mt-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <a
                        href={getFullImageUrl(pdfUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-700 underline"
                      >
                        View PDF
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPdfUrl("")}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              {/* Image Preview (existing + new) */}
              {(existingImages.filter(
                (u) =>
                  typeof u === "string" && !u.toLowerCase().endsWith(".pdf")
              ).length > 0 ||
                files.length > 0) && (
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Image className="w-4 h-4 text-purple-600" />
                    Image Preview ({existingImages.length + files.length}{" "}
                    images)
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 p-4 bg-gray-50 rounded-xl">
                    {/* Saved images */}
                    {existingImages
                      .filter(
                        (u) =>
                          typeof u === "string" &&
                          !u.toLowerCase().endsWith(".pdf")
                      )
                      .map((img, index) => {
                        const imageUrl = getFullImageUrl(img);
                        return (
                          <div
                            key={`${img}-${index}`}
                            className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
                          >
                            <img
                              src={imageUrl}
                              alt="product"
                              loading="lazy"
                              crossOrigin="anonymous"
                              className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                              onError={(e) => {
                                console.warn("Image failed to load:", imageUrl);
                                e.currentTarget.style.display = "none";
                                e.currentTarget.parentElement.innerHTML =
                                  '<div class="flex items-center justify-center w-full h-full text-4xl bg-gray-100">📦</div>';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition" />
                            <button
                              type="button"
                              onClick={() => removeExistingImage(img)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition"
                              title="Remove image"
                            >
                              <X size={14} />
                            </button>
                            <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                              Saved
                            </span>
                          </div>
                        );
                      })}

                    {/* Newly added (not yet uploaded) images */}
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition" />
                        <button
                          type="button"
                          onClick={() => removeNewFile(idx)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                        <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                          New
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={saving || updating}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <PackagePlus size={18} />
                {editingId
                  ? updating
                    ? "Updating Product..."
                    : "Update Product"
                  : saving
                  ? "Saving Product..."
                  : "Add Product"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm sm:text-base"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </form>

        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Loading products...
            </p>
          </div>
        ) : data?.items?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Start by adding your first product above
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {data?.items?.map((p) => {
                const productImageUrl = p.images?.[0]
                  ? getFullImageUrl(p.images[0])
                  : null;

                return (
                  <div
                    key={p._id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {productImageUrl ? (
                        <img
                          src={productImageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = "none";
                            e.target.parentElement.innerHTML =
                              '<div class="w-full h-full flex items-center justify-center"><svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image size={48} className="text-gray-300" />
                        </div>
                      )}

                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            p.stock > 10
                              ? "bg-green-500 text-white"
                              : p.stock > 0
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <h4 className="font-bold text-gray-800 line-clamp-2 mb-2 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                        {p.title}
                      </h4>

                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500" />
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">
                          {p.category?.name}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg text-sm"
                        >
                          <Pencil size={16} /> Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={deleting}
                          className="flex-1 flex text items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg text-sm disabled:opacity-50"
                        >
                          <X size={16} /> {deleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                &laquo; Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg text-sm sm:text-base">
                  Page {page}
                </span>
              </div>

              <button
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                disabled={data && data.items && data.items.length < 12}
                onClick={() => setPage((p) => p + 1)}
              >
                Next &raquo;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
