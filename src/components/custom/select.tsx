import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface SelectProps {
  label?: string;
  options: string[];
  defaultValue?: string;
}

export function Select({
  label = "Status Karyawan",
  options,
  defaultValue = "Belum dipilih",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleClear = () => {
    setStatus(null);
    setOpen(false);
  };

  return (
    <div className="grid gap-3">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-between w-full"
            data-control="select2"
            data-allow-clear="true"
          >
            {status || defaultValue}
            {status && (
              <X
                className="h-4 w-4 ml-2 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation(); // biar gak buka popover saat clear
                  handleClear();
                }}
              />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[300px]" align="start">
          <Command>
            <CommandInput placeholder="Cari status..." />
            <CommandList>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    setStatus(option);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {option}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
