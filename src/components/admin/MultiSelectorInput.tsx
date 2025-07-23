import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

interface MultipleSelectorInputProps {
  options: Option[];
  selected: Option[];
  setSelected: (selected: Option[]) => void;
  placeholder?: string;
}

export default function MultipleSelectorInput({
  options,
  selected,
  setSelected,
  placeholder = "Select options...",
}: MultipleSelectorInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (option: Option) => {
      setSelected(selected.filter((s) => s.value !== option.value));
    },
    [selected, setSelected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected(selected.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, setSelected]
  );

  const selectables = options.filter(
    (option) => !selected.find((s) => s.value === option.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group h-11 rounded-md border border-input px-1 py-[10px] text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="text-white"
            >
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(option);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((option) => (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected([...selected, option]);
                    }}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
