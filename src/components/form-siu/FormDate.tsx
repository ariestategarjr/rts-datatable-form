import { useState } from "react";
import { useFieldContext } from "./hooks";
import { FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

type FormControlProps = {
  label: string;
};

export function FormDate({ label }: FormControlProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="space-y-1.5" data-invalid={isInvalid}>
      {/* Label */}
      <FieldLabel htmlFor={field.name} className="leading-5">
        {label}
        <span className="text-red-500">*</span>
      </FieldLabel>

      {/* Popover Date Picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal w-full"
          >
            {/* {field.state.value
              ? new Date(field.state.value).toLocaleDateString("id-ID")
              : "Pilih tanggal lahir"} */}
            {date
              ? new Date(date).toLocaleDateString("id-ID")
              : "Pilih tanggal lahir"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            // selected={
            //   field.state.value ? new Date(field.state.value) : undefined
            // }
            selected={date ? date : undefined}
            // event akan ditambahkan nanti
            onSelect={(date) => {
              if (date) {
                setDate(date);
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Error message */}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
}
