"use client";

import { DataTableWithSearch } from "@/components/admin/DataTableWithSearch";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import ManageCollectionModal from "@/components/admin/ManageCollectionModal";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReviews } from "@/hooks/use-reviews";
import LoadingSpinner from "@/components/loader/loading";
import { Review } from "@/services/api";

const Reviews = () => {


    const { data, isLoading, error } = useReviews()

    const columns: ColumnDef<Review>[] = [
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
        // {
        //     accessorKey: "_id",
        //     header: "ID",
        //     cell: ({ row }) => <div>{row.getValue("_id")}</div>,
        // },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div>{row.original.user.name}</div>,
        },
        {
            accessorKey: "productName",
            header: "Product",
            cell: ({ row }) =>
                <div className="inline-flex items-center gap-2 flex-wrap md:flex-nowrap" >
                    <Image src={row.original.product.images[0]} height={100} width={100} className="h-20 w-20 object-cover object-center" alt={row.original.product.name} />
                    <span>{row.original.product.name}</span>
                </div>
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone",
            cell: ({ row }) => <div>{row.original.user.phone}</div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div>{row.original.user.email}</div>,
        },
        {
            accessorKey: "ratings",
            header: "Ratings",
            cell: ({ row }) => <div>{row.original.rating}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                const review = row.original;

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
                            <Link href={`/admin/reviews/${review._id}`}>
                                <DropdownMenuItem>
                                    <Eye />
                                    View
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                                <Trash />
                                Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading Reviews</div>;
    }

    // const [isManageCollectionOpen, setIsManageCollectionOpen] = useState(false);

    return (
        <div className="">
            <DataTableWithSearch
                columns={columns}
                data={data || []}
                title="Reviews"
                onDeleteSelected={(selectedRows) => {
                    console.log("Deleting rows:", selectedRows);
                }}
            />
            {/* <ManageCollectionModal
                isOpen={isManageCollectionOpen}
                onOpenChange={setIsManageCollectionOpen}
            /> */}
        </div>
    );


}

export default Reviews