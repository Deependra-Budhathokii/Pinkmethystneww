import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  onSave: (imageUrls: string[]) => void;
  maxImages?: number;
  onUploadStatusChange?: (isUploading: boolean) => void; // Optional prop
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onSave,
  maxImages = 5,
  onUploadStatusChange,
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      toast.error("Image upload failed");
      throw error;
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Check max images limit
      if (selectedImages.length + filesArray.length > maxImages) {
        toast.error(`Maximum ${maxImages} images allowed`);
        return;
      }

      // Create preview URLs
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));

      setSelectedImages((prev) => [...prev, ...filesArray]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleUploadImages = async () => {
    if (selectedImages.length === 0) {
      toast.error("No images selected");
      return;
    }

    setIsUploading(true);
    onUploadStatusChange?.(true); // Optional status update

    try {
      const uploadPromises = selectedImages.map(uploadToCloudinary);
      const imageUrls = await Promise.all(uploadPromises);

      onSave(imageUrls);
      setSelectedImages([]);
      setPreviews([]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload images");
      onSave([]);
    } finally {
      setIsUploading(false);
      onUploadStatusChange?.(false); // Optional status update
    }
  };
  const removeImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);

    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedImages = selectedImages.filter((_, i) => i !== index);

    setPreviews(updatedPreviews);
    setSelectedImages(updatedImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (droppedFiles.length > 0) {
      // Check max images limit
      if (selectedImages.length + droppedFiles.length > maxImages) {
        toast.error(`Maximum ${maxImages} images allowed`);
        return;
      }

      const newPreviews = droppedFiles.map((file) => URL.createObjectURL(file));

      setSelectedImages((prev) => [...prev, ...droppedFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Add Images</Label>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageSelect}
      />

      {/* Upload Area */}
      <div
        className={`flex justify-center items-center flex-col p-8 border-dashed border-2 rounded-lg 
          ${previews.length > 0 ? "border-muted" : "border-primary"}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-75 transition"
        >
          <Upload className="text-muted-foreground h-5" />
          <Button
            type="button"
            variant="ghost"
            className="text-sm text-muted-foreground"
          >
            Upload Images
          </Button>
          <p className="text-xs text-muted-foreground">
            Drag and drop images here or click to browse
          </p>
        </div>
      </div>

      {/* Preview Area */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative group aspect-square max-w-[200px]"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {selectedImages.length} / {maxImages} images selected
            </p>
            <Button
              type="button"
              onClick={handleUploadImages}
              disabled={isUploading || selectedImages.length === 0}
            >
              {isUploading ? "Uploading..." : "Upload Images"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
