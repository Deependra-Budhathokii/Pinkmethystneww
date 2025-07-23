import React, { useState } from "react";
import { Plus, Search, MoreHorizontal, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "../loader/loading";
import { useCollections } from "@/hooks/use-collections";
import { useSubCollections } from "@/hooks/use-subCollections";
import { useProductTypes } from "@/hooks/use-productType";
import type { Collection, Subcollection, ProductType } from "@/services/api";

interface ManageCollectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ManageCollectionModal: React.FC<ManageCollectionModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  // State for modal visibility
  const [isSubcollectionModalOpen, setIsSubcollectionModalOpen] =
    useState(false);
  const [isProductTypesModalOpen, setIsProductTypesModalOpen] = useState(false);


  // State for selected items
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [selectedSubcollection, setSelectedSubcollection] =
    useState<Subcollection | null>(null);

  // Search state
  const [collectionSearch, setCollectionSearch] = useState("");
  const [subcollectionSearch, setSubcollectionSearch] = useState("");
  const [productTypeSearch, setProductTypeSearch] = useState("");

  // Data fetching
  const { data: collections, isLoading: isLoadingCollections } =
    useCollections();
  const { data: subcollections, isLoading: isLoadingSubcollections } =
    useSubCollections(selectedCollection?._id ?? "");
  const { data: productTypes, isLoading: isLoadingProductTypes } =
    useProductTypes(selectedSubcollection?._id ?? "");

  // Filter functions
  const filteredCollections = collections?.filter((c) =>
    c.name.toLowerCase().includes(collectionSearch.toLowerCase())
  );

  const filteredSubcollections = subcollections?.filter((s) =>
    s.name.toLowerCase().includes(subcollectionSearch.toLowerCase())
  );

  const filteredProductTypes = productTypes?.filter((p) =>
    p.name.toLowerCase().includes(productTypeSearch.toLowerCase())
  );

  // Handlers
  const handleCollectionClick = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsSubcollectionModalOpen(true);
  };

  const handleSubcollectionClick = (subcollection: Subcollection) => {
    setSelectedSubcollection(subcollection);
    setIsProductTypesModalOpen(true);
  };

  const handleCloseSubcollections = () => {
    setIsSubcollectionModalOpen(false);
    setSelectedCollection(null);
    setSubcollectionSearch("");
  };

  const handleCloseProductTypes = () => {
    setIsProductTypesModalOpen(false);
    setSelectedSubcollection(null);
    setProductTypeSearch("");
  };

  if (isLoadingCollections) return <LoadingSpinner />;

  return (
    <>
      {/* Main Collections Modal */}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Manage Collections</DialogTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search collections..."
                  className="pl-8 w-64"
                  value={collectionSearch}
                  onChange={(e) => setCollectionSearch(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input placeholder="Add new collection..." />
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Collection
              </Button>
            </div>

            <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
              {filteredCollections?.map((collection) => (
                <div
                  key={collection._id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <span>{collection.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCollectionClick(collection)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Add Subcollection</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subcollections Modal */}
      <Dialog
        open={isSubcollectionModalOpen}
        onOpenChange={handleCloseSubcollections}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>
                Subcollections - {selectedCollection?.name}
              </DialogTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search subcollections..."
                  className="pl-8 w-64"
                  value={subcollectionSearch}
                  onChange={(e) => setSubcollectionSearch(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input placeholder="Add new subcollection..." />
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Subcollection
              </Button>
            </div>

            <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
              {isLoadingSubcollections ? (
                <div className="p-4 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                filteredSubcollections?.map((subcollection) => (
                  <div
                    key={subcollection._id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span>{subcollection.name}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSubcollectionClick(subcollection)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Types Modal */}
      <Dialog
        open={isProductTypesModalOpen}
        onOpenChange={handleCloseProductTypes}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>
                Product Types - {selectedSubcollection?.name}
              </DialogTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search product types..."
                  className="pl-8 w-64"
                  value={productTypeSearch}
                  onChange={(e) => setProductTypeSearch(e.target.value)}
                />
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input placeholder="Add new product type..." />
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product Type
              </Button>
            </div>

            <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
              {isLoadingProductTypes ? (
                <div className="p-4 flex justify-center">
                  <LoadingSpinner />
                </div>
              ) : (
                filteredProductTypes?.map((productType: ProductType) => (
                  <div
                    key={productType._id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span>{productType.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageCollectionModal;
