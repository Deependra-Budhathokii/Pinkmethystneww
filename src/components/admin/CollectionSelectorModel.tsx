import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCollections } from "@/hooks/use-collections";
import { useSubCollections } from "@/hooks/use-subCollections";
import { useProductTypes } from "@/hooks/use-productType";
import LoadingSpinner from "../loader/loading";
import { SelectionList } from "./SelectionList";
import { SearchInput } from "./SearchInput";

interface CollectionSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (selections: {
    collections: string[];
    subcollections: string[];
    productTypes: string[];
  }) => void;
}

const CollectionSelectorModal: React.FC<CollectionSelectorModalProps> = ({
  open,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedSubcollections, setSelectedSubcollections] = useState<
    string[]
  >([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  );
  const [searchTerms, setSearchTerms] = useState({
    collections: "",
    subcollections: "",
    productTypes: "",
  });

  const {
    data: collections = [],
    isLoading: isLoadingCollections,
    error: collectionsError,
  } = useCollections();

  const {
    data: allSubcollections = [],
    isLoading: isLoadingSubcollections,
    error: subCollectionsError,
  } = useSubCollections(selectedCollections.join(","));

  const {
    data: allProductTypes = [],
    isLoading: isLoadingProductTypes,
    error: productTypesError,
  } = useProductTypes(selectedSubcollections.join(","));

  const getFilteredItems = useCallback((items: any[], searchTerm: string) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, []);

  const handleSearchChange = (
    type: keyof typeof searchTerms,
    value: string
  ) => {
    setSearchTerms((prev) => ({ ...prev, [type]: value }));
  };

  const handleToggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) => {
      if (prev.includes(collectionId)) {
        const relatedSubcollections = allSubcollections
          .filter((sub) => sub.collectionId === collectionId)
          .map((sub) => sub._id);

        setSelectedSubcollections((current) =>
          current.filter((id) => !relatedSubcollections.includes(id))
        );

        return prev.filter((id) => id !== collectionId);
      }
      return [...prev, collectionId];
    });
  };

  const handleToggleSubcollection = (subcollectionId: string) => {
    setSelectedSubcollections((prev) => {
      if (prev.includes(subcollectionId)) {
        const relatedProductTypes = allProductTypes
          .filter((type) => type.subcollectionId === subcollectionId)
          .map((type) => type._id);

        setSelectedProductTypes((current) =>
          current.filter((id) => !relatedProductTypes.includes(id))
        );

        return prev.filter((id) => id !== subcollectionId);
      }
      return [...prev, subcollectionId];
    });
  };

  const handleToggleProductType = (productTypeId: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(productTypeId)
        ? prev.filter((id) => id !== productTypeId)
        : [...prev, productTypeId]
    );
  };

  const renderError = (error: any) => (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {error?.message || "An error occurred"}
      </AlertDescription>
    </Alert>
  );

  const renderContent = () => {
    const currentError =
      step === 1
        ? collectionsError
        : step === 2
        ? subCollectionsError
        : productTypesError;

    if (currentError) {
      return renderError(currentError);
    }

    const isLoading =
      step === 1
        ? isLoadingCollections
        : step === 2
        ? isLoadingSubcollections
        : isLoadingProductTypes;

    if (isLoading) {
      return (
        <div className="p-8 flex justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    const items =
      step === 1
        ? getFilteredItems(collections, searchTerms.collections).map(
            (item) => ({
              ...item,
            })
          )
        : step === 2
        ? getFilteredItems(allSubcollections, searchTerms.subcollections).map(
            (item) => ({
              ...item,
              parentName: collections.find((c) => c._id === item.collectionId)
                ?.name,
            })
          )
        : getFilteredItems(allProductTypes, searchTerms.productTypes).map(
            (item) => ({
              ...item,
              parentName: allSubcollections.find(
                (s) => s._id === item.subcollectionId
              )?.name,
            })
          );

    return (
      <SelectionList
        items={items}
        selectedIds={
          step === 1
            ? selectedCollections
            : step === 2
            ? selectedSubcollections
            : selectedProductTypes
        }
        onToggle={
          step === 1
            ? handleToggleCollection
            : step === 2
            ? handleToggleSubcollection
            : handleToggleProductType
        }
        parentLabel={step === 2 ? "Collection" : "Subcollection"}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>
              {step === 1
                ? "Select Collections"
                : step === 2
                ? "Select Subcollections"
                : "Select Product Types"}
            </DialogTitle>
            <SearchInput
              value={
                searchTerms[
                  step === 1
                    ? "collections"
                    : step === 2
                    ? "subcollections"
                    : "productTypes"
                ]
              }
              onChange={(value) =>
                handleSearchChange(
                  step === 1
                    ? "collections"
                    : step === 2
                    ? "subcollections"
                    : "productTypes",
                  value
                )
              }
              placeholder={`Search ${
                step === 1
                  ? "collections"
                  : step === 2
                  ? "subcollections"
                  : "product types"
              }...`}
            />
          </div>
        </DialogHeader>

        <div className="py-4">{renderContent()}</div>

        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setStep((prev) => prev - 1)}
            className={step === 1 ? "invisible" : ""}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (step === 3) {
                onComplete({
                  collections: selectedCollections,
                  subcollections: selectedSubcollections,
                  productTypes: selectedProductTypes,
                });
                onClose();
              } else {
                setStep((prev) => prev + 1);
              }
            }}
            disabled={
              (step === 1 && selectedCollections.length === 0) ||
              (step === 2 && selectedSubcollections.length === 0) ||
              (step === 3 && selectedProductTypes.length === 0)
            }
          >
            {step === 3 ? "Complete" : "Next"}
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Selected:{" "}
          {step === 1
            ? `${selectedCollections.length} collections`
            : step === 2
            ? `${selectedSubcollections.length} subcollections`
            : `${selectedProductTypes.length} product types`}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CollectionSelectorModal;
