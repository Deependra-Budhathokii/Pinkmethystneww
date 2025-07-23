"use client";

import { DataTableWithSearch } from "@/components/admin/DataTableWithSearch";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManageCollectionModal from "@/components/admin/ManageCollectionModal";
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import type { Product, ProductType } from "@/services/api";
import LoadingSpinner from "@/components/loader/loading";
import Image from "next/image";
import Link from "next/link";

export default function ProductStock() {
  const [isManageCollectionOpen, setIsManageCollectionOpen] = useState(false);
  const { data, isLoading, error } = useProducts();

  const productData =
    data && data.filter((product) => product.isInStockClearance);

  const handleStockClerance = (productId: string) => {
    console.log(productId);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  const tableData = Array.isArray(productData) ? productData : [];

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-md">
              {row.original.images && row.original.images.length > 0 ? (
                <Image
                  src={row.original.images[0]}
                  alt={row.original.name}
                  className="object-cover"
                  fill
                  sizes="48px"
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No image</span>
                </div>
              )}
            </div>
            <div className="font-medium">{row.original.name}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "size",
      header: "Sizes",
      cell: ({ row }) => {
        const sizes = row.original.size;
        return (
          <div className="flex gap-1 flex-wrap">
            {sizes.map((size, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-md text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "colors",
      header: "Colors",
      cell: ({ row }) => {
        const colors = row.original.color || [];
        return (
          <div className="flex gap-1 flex-wrap">
            {colors.map((c, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-5 h-5 rounded-md border border-gray-200"
                  style={{ backgroundColor: c }}
                />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "productType",
      header: "Product Type",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.original.productType?.name || "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div>Quantity</div>,
      cell: ({ row }) => {
        const quantity = row.original.quantity || 0;
        return (
          <div
            className={`font-medium ${
              quantity === 0
                ? "text-red-500"
                : quantity < 10
                ? "text-yellow-500"
                : ""
            }`}
          >
            {quantity}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/admin/product-stock/${product._id}`}>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStockClerance(product._id)}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Remove From Clearance
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <DataTableWithSearch
        columns={columns}
        data={tableData}
        title="Stock Clearance"
        actionButtons={[
          {
            label: "Add Product",
            href: "/admin/product-stock/addproduct",
            variant: "secondary",
          },
        ]}
        onDeleteSelected={(selectedRows) => {
          console.log("Deleting rows:", selectedRows);
        }}
      />

      <ManageCollectionModal
        isOpen={isManageCollectionOpen}
        onOpenChange={setIsManageCollectionOpen}
      />
    </div>
  );
}
