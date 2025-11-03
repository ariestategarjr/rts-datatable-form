// FormPassword.tsx
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFieldContext } from "./hooks";
import { FormBase, type FormControlProps } from "./FormBase";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FormPassword(
  props: FormControlProps & { placeholder?: string; inputClassName?: string }
) {
  const field = useFieldContext<string>();
  const [show, setShow] = useState(false);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={show ? "text" : "password"}
          placeholder={props.placeholder}
          value={field.state.value ?? ""}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid} 
          autoComplete="new-password"
          className={cn("pr-10", props.inputClassName)}
        />
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-2 my-auto"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </FormBase>
  );
}
