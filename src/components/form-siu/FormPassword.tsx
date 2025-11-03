import { useFieldContext } from "./hooks";
import { FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { useState } from "react";

type FormControlProps = {
  label: string;
};

export function FormPassword({ label }: FormControlProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="space-y-1.5" data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name} className="leading-5">
        {label}
        <span className="text-red-500">*</span>
      </FieldLabel>
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="••••••••••••••••"
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className=""
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsPasswordVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className="sr-only">
            {isPasswordVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </div>
    </div>
  );
}
