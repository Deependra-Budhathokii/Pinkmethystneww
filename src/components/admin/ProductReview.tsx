import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit2, ArrowLeft, Save } from "lucide-react";

type ProductReviewProps = {
  onBack: () => void;
  onSubmit: (data: any) => void;
};

type EditDialogProps = {
  field: string | null;
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

const EditDialog = ({ field, value, onClose, onSave }: EditDialogProps) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = () => {
    onSave(localValue);
    onClose();
  };

  return (
    <Dialog open={!!field} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {field}</DialogTitle>
        </DialogHeader>
        {field?.includes("description") ? (
          <Textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <Input
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
          />
        )}
        <Button onClick={handleSave} className="mt-4">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default function ProductReview({
  onBack,
  onSubmit,
}: ProductReviewProps) {
  const [productData, setProductData] = useState<any>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    const savedData = localStorage.getItem("productData");
    if (savedData) {
      setProductData(JSON.parse(savedData));
    }
  }, []);

  const handleEdit = (field: string, value: any) => {
    setEditingField(field);
    setEditValue(String(value));
  };

  const handleSaveEdit = (newValue: string) => {
    if (editingField && productData) {
      const newData = { ...productData };
      if (editingField.includes(".")) {
        const [parent, child] = editingField.split(".");
        newData[parent] = { ...newData[parent], [child]: newValue };
      } else {
        newData[editingField] = newValue;
      }
      setProductData(newData);
      localStorage.setItem("productData", JSON.stringify(newData));
    }
  };

  const handleCloseEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const handleFinalSubmit = () => {
    onSubmit(productData);
    localStorage.removeItem("productData");
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Review Product</h1>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Edit
        </Button>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <Table>
            <TableBody>
              {["name", "price", "discount", "quantity", "description"].map(
                (field) => (
                  <TableRow key={field}>
                    <TableCell className="font-medium capitalize w-1/4">
                      {field}
                    </TableCell>
                    <TableCell className="w-2/4">
                      {productData[field]}
                    </TableCell>
                    <TableCell className="w-1/4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(field, productData[field])}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </section>

        {/* Collections */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Collections</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection</TableHead>
                <TableHead>Subcollection</TableHead>
                <TableHead>Product Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {productData.collections.collections.join(", ")}
                </TableCell>
                <TableCell>
                  {productData.collections.subcollections.join(", ")}
                </TableCell>
                <TableCell>
                  {productData.collections.productTypes.join(", ")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>

        {/* Colors and Sizes */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Colors and Sizes</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-2">Colors</Label>
              <div className="flex flex-wrap gap-2">
                {productData.colors.map((color: any) => (
                  <span
                    key={color.value}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {color.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Label className="mb-2">Sizes</Label>
              <div className="flex flex-wrap gap-2">
                {productData.sizes.map((size: any) => (
                  <span
                    key={size.value}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {size.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData.features.map((feature: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{feature.name}</TableCell>
                  <TableCell>{feature.value}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleEdit(`features.${index}`, feature.value)
                      }
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* Images */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="grid grid-cols-4 gap-4">
            {productData.imageUrls.map((imageUrl: string, index: number) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={imageUrl}
                  alt={`Product ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" onClick={onBack}>
            Back to Edit
          </Button>
          <Button onClick={handleFinalSubmit}>Submit Product</Button>
        </div>
      </div>

      <EditDialog
        field={editingField}
        value={editValue}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
