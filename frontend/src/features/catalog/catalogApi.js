import { api } from "../api";

export const catalogApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 🔹 Categories
    getCategories: build.query({
      query: (q) => `/categories${q ? `?q=${encodeURIComponent(q)}` : ""}`,
      providesTags: ["Category"],
    }),

    createCategory: build.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // 🔹 Products
    getProducts: build.query({
      query: (p = {}) => {
        const s = new URLSearchParams();
        if (p.page) s.set("page", String(p.page));
        if (p.q) s.set("q", p.q);
        if (p.category) s.set("category", p.category);
        return `/products${s.toString() ? `?${s.toString()}` : ""}`;
      },
      providesTags: ["Product"],
    }),

    createProduct: build.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ NEW: deleteProduct
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // 🔹 Contact Form
    submitContactForm: build.mutation({
      query: (body) => ({
        url: "/contact/submit",
        method: "POST",
        body,
      }),
    }),

    // 🔹 Uploads
    uploadImage: build.mutation({
      query: (form) => ({
        url: "/upload/image",
        method: "POST",
        body: form,
      }),
    }),

    uploadImages: build.mutation({
      query: (form) => ({
        url: "/upload/images",
        method: "POST",
        body: form,
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation, // ✅ now exists and works
  useUploadImageMutation,
  useUploadImagesMutation,
  useSubmitContactFormMutation,
} = catalogApi;
