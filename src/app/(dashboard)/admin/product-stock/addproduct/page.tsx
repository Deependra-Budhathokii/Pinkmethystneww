"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import MultipleSelectorInput from "@/components/admin/MultiSelectorInput";
import CollectionSelectorModal from "@/components/admin/CollectionSelectorModel";
import ImageUpload from "@/components/admin/ImageUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductReview from "@/components/admin/ProductReview";
import { useCreateProduct } from "@/hooks/use-product-mutations";
import LoadingSpinner from "@/components/loader/loading";
import Router from "next/router";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

type SizeOption = {
  value: string;
  label: string;
};

type Feature = {
  name: string;
  value: string;
};

type CollectionSelections = {
  collections: string[];
  subcollections: string[];
  productTypes: string[];
};

type FormData = {
  name: string;
  price: string;
  discount: string;
  quantity: string;
  description: string;
  [key: string]: string;
};

const ALPHABETIC_SIZES = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "XXL", label: "Double XLarge" },
];

const NUMERIC_RANGES = [
  { value: "5-15", label: "5-15" },
  { value: "15-25", label: "15-25" },
  { value: "25-35", label: "25-35" },
  { value: "35-50", label: "35-50" },
];

const COLORS = [
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
  { value: "Yellow", label: "Yellow" },
  { value: "White", label: "White" },
];

export default function AddProductPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    discount: "",
    quantity: "",
    description: "",
  });

  const [selectedColors, setSelectedColors] = useState<(typeof COLORS)[0][]>([
    COLORS[1],
  ]);
  const [selectedSizes, setSelectedSizes] = useState<SizeOption[]>([]);
  const [sizeType, setSizeType] = useState<string>("");
  const [features, setFeatures] = useState<Feature[]>([
    { name: "", value: "" },
  ]);

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedCollections, setSelectedCollections] =
    useState<CollectionSelections>({
      collections: [],
      subcollections: [],
      productTypes: [],
    });
  const { mutate: createProduct, error, data } = useCreateProduct();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addFeature = () => {
    setFeatures([...features, { name: "", value: "" }]);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const updateFeature = (
    index: number,
    field: "name" | "value",
    value: string
  ) => {
    const newFeatures = features.map((feature, i) => {
      if (i === index) {
        return { ...feature, [field]: value };
      }
      return feature;
    });
    setFeatures(newFeatures);
  };

  useEffect(() => {
    setSelectedSizes([]);
  }, [sizeType]);

  const getCurrentSizeOptions = () => {
    if (sizeType === "alphabetic") {
      return ALPHABETIC_SIZES;
    } else if (sizeType === "numeric") {
      return NUMERIC_RANGES;
    }
    return [];
  };
  const router = useRouter();

  const [isReviewMode, setIsReviewMode] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
    const productData = {
      ...formData,
      colors: selectedColors,
      sizes: selectedSizes,
      features,
      imageUrls: imageUrls,
      collections: selectedCollections,
    };

    localStorage.setItem("productData", JSON.stringify(productData));
    setIsReviewMode(true);
  };
  // Function to generate slug from product name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleFinalSubmit = (productData: any) => {
    console.log("Product Data:", productData);
    if (!productData.imageUrls || productData.imageUrls.length === 0) {
      toast.error("At least one image is required");
      return;
    }

    // Calculate final price based on discount
    const price = Number(productData.price);
    const discount = Number(productData.discount);
    const final_price = price - (price * discount) / 100;

    // Generate slug from product name
    const slug = generateSlug(productData.name);

    createProduct({
      name: productData.name,
      slug: slug, // Add the generated slug
      price: price,
      final_price: final_price,
      discount: discount,
      quantity: Number(productData.quantity),
      description: productData.description,
      color: productData.colors.map((c: any) => c.value),
      size: productData.sizes.map((s: any) => s.value),
      features: productData.features.map((f: Feature) => ({
        ...f,
        _id: "",
      })),
      images: productData.imageUrls,
      collection: productData.collections.collections[0],
      subcollection: productData.collections.subcollections[0],
      productType: productData.collections.productTypes[0],
      rating_avg: 0,
      isInStockClearance: false,
    });
  };
  return (
    <div className="font-playfairdisplay">
      {isReviewMode ? (
        <ProductReview
          onBack={() => setIsReviewMode(false)}
          onSubmit={handleFinalSubmit}
        />
      ) : (
        <div>
          <Toaster position="top-center" />
          <h1 className="font-bold text-3xl pb-3">Add Product</h1>
          <form onSubmit={handleSubmit} className="py-3 flex flex-col gap-3">
            <Label>Product Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Product Name"
            />

            {/* PRICE && DISCOUNT */}
            <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
              <div className="w-full">
                <Label>Price</Label>
                <Input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter Price"
                />
              </div>

              <div className="w-full">
                <Label>Discount</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, discount: value }))
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select Discount Percentage" />
                  </SelectTrigger>
                  <SelectContent className="max-h-32 overflow-y-auto">
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="30">30%</SelectItem>
                    <SelectItem value="40">40%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* QUANTITY AND ADD COLLECTIONS */}
            <div className="flex flex-col md:flex-row justify-between items-center space-x-4">
              <div className="w-full">
                <Label>Quantity</Label>
                <Input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter Quantity"
                />
              </div>
              <div>
                <Button
                  type="button"
                  className="h-11 text-white mt-6 w-[400px]"
                  variant="secondary"
                  onClick={() => setIsCollectionModalOpen(true)}
                >
                  Add Collections
                </Button>

                <CollectionSelectorModal
                  open={isCollectionModalOpen}
                  onClose={() => setIsCollectionModalOpen(false)}
                  onComplete={(selections) => {
                    setSelectedCollections(selections);
                    setIsCollectionModalOpen(false);
                  }}
                />
              </div>
            </div>
            <div className="mt-2 text-sm space-y-1">
              {selectedCollections.collections.length > 0 && (
                <Table className="border shadow-lg">
                  <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary text-white">
                      <TableHead className="text-md">Collection</TableHead>
                      <TableHead className="text-md">SubCollection</TableHead>
                      <TableHead className="text-md">Product Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-sm">
                        {selectedCollections.collections.join(", ")}
                      </TableCell>
                      <TableCell>
                        {selectedCollections.subcollections.join(", ")}
                      </TableCell>
                      <TableCell>
                        {selectedCollections.productTypes.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>

            {/* COLORS AND SIZES */}
            <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
              <div className="w-full">
                <Label>Choose Colors</Label>
                <MultipleSelectorInput
                  options={COLORS}
                  selected={selectedColors}
                  setSelected={setSelectedColors}
                  placeholder="Select colors..."
                />
              </div>
              <div className="w-full mt-[-8px]">
                <Label>Choose SizeType</Label>
                <Select onValueChange={setSizeType}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select Size Type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-32 overflow-y-auto">
                    <SelectItem value="alphabetic">Alphabetic</SelectItem>
                    <SelectItem value="numeric">Numeric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label>Choose Size</Label>
                <MultipleSelectorInput
                  options={getCurrentSizeOptions()}
                  selected={selectedSizes}
                  setSelected={setSelectedSizes}
                  placeholder="Select Sizes..."
                />
              </div>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <Label>Product Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter Product Description"
              rows={5}
            />

            {/* ADD FEATURES */}
            <div className="space-y-2">
              <div className="flex  items-center justify-between">
                <Label>Product Features</Label>
                <Button
                  type="button"
                  onClick={addFeature}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 text-white"
                >
                  <Plus className="w-4 h-4" /> Add Feature
                </Button>
              </div>

              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-2 items-start"
                >
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="Feature Name (e.g., Material)"
                      value={feature.name}
                      onChange={(e) =>
                        updateFeature(index, "name", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="Feature Value (e.g., Genuine Leather)"
                      value={feature.value}
                      onChange={(e) =>
                        updateFeature(index, "value", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="p-2 h-9"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* FEATURES PREVIEW */}
            <div>
              <Label className="text-sm text-gray-500">Preview:</Label>
              <ul className="list-disc pl-5 mt-2">
                {features.map((feature, index) =>
                  feature.name && feature.value ? (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{feature.name}</span>:{" "}
                      {feature.value}
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            {/* IMAGE UPLOAD */}
            <ImageUpload
              onSave={(uploadedUrls) => {
                setImageUrls(uploadedUrls);
              }}
            />

            {/* SUBMIT AND CANCEL BUTTONS */}
            <div className="flex justify-between items-center space-x-[100px] pt-4 pb-8">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full h-11">
                Add Product
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
