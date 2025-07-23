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
import Link from "next/link";

type Customers = {
    id: number,
    name: string;
    address: string
    date: string
    total: number,
    status: string,
};

const OrderList = () => {

    const handleOrderDelete = (customer: Customers) => {
        console.log(customer);
    }

    const columns: ColumnDef<Customers>[] = [
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
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div>{row.getValue("id")}</div>,
        },
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
            cell: ({ row }) => <div>{row.getValue("name")}</div>,
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => <div>{row.getValue("address")}</div>,
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => <div>{row.getValue("date")}</div>,
        },
        {
            accessorKey: "total",
            header: "Total",
            cell: ({ row }) => <div>{row.getValue("total")}</div>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <div>{row.getValue("status")}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                const customer = row.original;

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
                            <Link href={`/admin/order-list/${customer.id}`}>
                                <DropdownMenuItem>
                                    <Eye />
                                    View
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOrderDelete(customer)} >
                                <Trash />
                                Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const data: Customers[] = [
        {
            id: 1,
            name: "Vintage T-Shirt",
            address: "123 Fashion St, Cityville, NY",
            date: "2024-10-15",
            total: 120,
            status: "Completed",
        },
        {
            id: 2,
            name: "Leather Wallet",
            address: "456 Leather Ave, Trendytown, CA",
            date: "2024-09-22",
            total: 45,
            status: "Processing",
        },
        {
            id: 3,
            name: "Running Shoes",
            address: "789 Sports Rd, Fitcity, TX",
            date: "2024-08-30",
            total: 60,
            status: "In Transit",
        },
        {
            id: 4,
            name: "Silk Scarf",
            address: "234 Elegant Ln, Luxor, FL",
            date: "2024-11-01",
            total: 30,
            status: "On Hold",
        },
        {
            id: 5,
            name: "Formal Blazer",
            address: "567 Corporate Blvd, Businesstown, DC",
            date: "2024-07-25",
            total: 20,
            status: "Rejected",
        },
        {
            id: 6,
            name: "Denim Jeans",
            address: "678 Denim Dr, Trendycity, CA",
            date: "2024-06-10",
            total: 75,
            status: "Completed",
        },
        {
            id: 7,
            name: "Woolen Sweater",
            address: "890 Cozy St, Winterside, CO",
            date: "2024-11-05",
            total: 40,
            status: "Processing",
        },
        {
            id: 8,
            name: "Graphic Tee",
            address: "123 Streetwear Blvd, Hipville, NY",
            date: "2024-10-20",
            total: 90,
            status: "In Transit",
        },
    ];

    return (
        <div>
            <DataTableWithSearch
                columns={columns}
                data={data}
                title="Order List"
                onDeleteSelected={(selectedRows) => {
                    // Handle deletion of selected rows
                    console.log("Deleting rows:", selectedRows);
                }}

            />
        </div>
    )
}

export default OrderList