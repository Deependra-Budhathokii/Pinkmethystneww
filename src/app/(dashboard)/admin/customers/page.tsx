"use client";

import { DataTableWithSearch } from "@/components/admin/DataTableWithSearch";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUsers } from "@/hooks/use-users";
import { User } from "@/services/api";
import LoadingSpinner from "@/components/loader/loading";

const Customers = () => {

    const { data, error, isLoading } = useUsers()

    const columns: ColumnDef<User>[] = [
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
            cell: ({ row }) => <div>{row.original.address.province},{row.original.address.district},{row.original.address.street}, {row.original.address.landmark}</div>,
        },
        {
            accessorKey: "phone",
            header: "PhoneNumber",
            cell: ({ row }) => <div>{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div>{row.getValue("email")}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) =>
                <Button variant={"destructive"} onClick={() => console.log({ name: row.original.name, id: row.id })} >
                    Delete
                </Button>
        },
    ];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error loading customers</div>;
    }

    return (
        <div>
            <DataTableWithSearch
                columns={columns}
                data={data || []}
                title="Customer List"
                onDeleteSelected={(selectedRows) => {
                    console.log("Deleting rows:", selectedRows);
                }}

            />
        </div>
    )
}

export default Customers