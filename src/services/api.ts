import axios, { AxiosError } from "axios";

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return "http://localhost:3000/api";
  }
  return baseUrl;
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Custom error handler
const handleApiError = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  (error) => handleApiError(error)
);

export const uploadImages = async (files: File[]): Promise<string[]> => {
  if (!files || files.length === 0) {
    return [];
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  try {
    const response = await axios.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Error uploading images");
  }
};

export interface Feature {
  name: string;
  value: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string; // Add this
  description: string;
  images: string[];
  price: number;
  final_price: number;
  discount?: number; // Add this
  size: string[];
  color: string[];
  collection?: Collection;
  subcollection?: Subcollection;
  productType?: ProductType;
  quantity: number;
  features?: Feature[];
  rating_avg: number;
  isInStockClearance: boolean;
}

export interface Review {
  _id: string;
  user: User;
  product: Product;
  rating: number;
  review: string;
}

export interface Collection {
  _id: string;
  name: string;
  subCollection: string;
  collectionId: string;
}

export interface Subcollection {
  _id: string;
  name: string;
  productType?: ProductType;
  collectionId: string;
}

export interface ProductType {
  _id: string;
  name: string;
  subcollectionId: string;
}

export interface User {
  email: string;
  name: string;
  password: string;
  role?: "admin" | "user";
  phone: string;
  image?: string;
  address: {
    province: string;
    district: string;
    street?: string;
    landmark?: string;
  };
}
export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await api.get("/users");
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await api.get("/products");
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getReviews = async (): Promise<Review[]> => {
  try {
    const { data } = await api.get("/reviews");
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getReview = async (reviewId: string): Promise<Review> => {
  try {
    const { data } = await api.get(`/reviews/${reviewId}`);
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getProduct = async (productId: string): Promise<Product> => {
  try {
    const { data } = await api.get(`/products?id=${productId}`);
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getCollections = async (): Promise<Collection[]> => {
  try {
    const { data } = await api.get("/collections");
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getCollection = async (
  collectionId: string
): Promise<Collection[]> => {
  try {
    const { data } = await api.get(`/collections?collectionId=${collectionId}`);
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getSubCollections = async (
  collectionIds?: string | string[]
): Promise<Subcollection[]> => {
  try {
    let url = "/subcollections";
    if (collectionIds) {
      const ids = Array.isArray(collectionIds)
        ? collectionIds
        : [collectionIds];
      const queryParams = ids.map((id) => `collectionId=${id}`).join("&");
      url = `/subcollections?${queryParams}`;
    }
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getSubCollection = async (
  collectionId: string
): Promise<Subcollection> => {
  try {
    const { data } = await api.get(
      `/subcollections?collectionId=${collectionId}`
    );
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getProductTypes = async (
  subCollectionIds?: string | string[]
): Promise<ProductType[]> => {
  try {
    let url = "/producttypes";
    if (subCollectionIds) {
      const ids = Array.isArray(subCollectionIds)
        ? subCollectionIds
        : [subCollectionIds];
      const queryParams = ids.map((id) => `subCollectionId=${id}`).join("&");
      url = `/producttypes?${queryParams}`;
    }
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const getProductType = async (
  subCollectionId: string
): Promise<ProductType> => {
  try {
    const { data } = await api.get(
      `/producttypes?subCollectionId=${subCollectionId}`
    );
    return data;
  } catch (error) {
    throw handleApiError(error as AxiosError);
  }
};

export const createProduct = async (
  productData: Omit<Product, "_id"> & { isInStockClearance?: boolean }
): Promise<Product> => {
  try {
    const processedProductData = {
      ...productData,
      price: Number(productData.price),
      discount: Number(productData.discount || 0),
      quantity: Number(productData.quantity),
      final_price:
        Number(productData.price) -
        (Number(productData.price) * Number(productData.discount || 0)) / 100,
      isInStockClearance: productData.isInStockClearance ?? false,

      features: (productData.features || []).map((f: any) => ({
        name: f.name,
        value: f.value,
      })),

      // Direct assignment of IDs
      collection: productData.collection,
      subcollection: productData.subcollection,
      productType: productData.productType,
    };

    console.log("Processed Product Data:", processedProductData);

    const { data } = await api.post("/products", processedProductData);
    return data;
  } catch (error: any) {
    console.error("Full Error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to create product";
    throw new Error(errorMessage);
  }
};
