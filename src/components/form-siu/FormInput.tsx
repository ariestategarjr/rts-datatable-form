import { useFieldContext } from "./hooks";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormControlProps = {
  label: string;
};

export function FormInput({ label }: FormControlProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <div className="space-y-1.5" data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="leading-5">
        {label}
        <span className="text-red-500">*</span>
      </FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        type="text"
        placeholder="Enter your username"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        aria-invalid={isInvalid}
        className=""
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
}
