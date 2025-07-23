import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface SelectionListProps {
  items: Array<{
    _id: string;
    name: string;
    parentName?: string;
  }>;
  selectedIds: string[];
  onToggle: (id: string) => void;
  parentLabel?: string;
}

export const SelectionList: React.FC<SelectionListProps> = ({
  items,
  selectedIds,
  onToggle,
  parentLabel,
}) => {
  if (items.length === 0) {
    return <div className="p-4 text-center text-gray-500">No items found</div>;
  }

  return (
    <div className="border rounded-lg divide-y max-h-96 overflow-y-auto">
      {items.map((item) => (
        <div
          key={item._id}
          className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
          onClick={() => onToggle(item._id)}
        >
          <Label className="flex items-center space-x-3 w-full">
            <Checkbox
              checked={selectedIds.includes(item._id)}
              onCheckedChange={() => onToggle(item._id)}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.name}</span>
              {item.parentName && (
                <span className="text-xs text-gray-500">
                  {parentLabel}: {item.parentName}
                </span>
              )}
            </div>
          </Label>
        </div>
      ))}
    </div>
  );
};
