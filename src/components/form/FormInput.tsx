import { Input } from "@/components/ui/input";
import { FormBase, type FormControlProps } from "./FormBase";
import { useFieldContext } from "./hooks";
import { cn } from "@/lib/utils";

// FormInput.tsx
export function FormInput(
  props: FormControlProps & {
    placeholder?: string;
    type?: string;
    rightSection?: React.ReactNode; // NEW
    inputClassName?: string; // NEW
  }
) {
  const {
    placeholder,
    type = "text",
    rightSection,
    inputClassName,
    ...base
  } = props;
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...base}>
      <div className="relative">
        <Input
          id={field.name}
          name={field.name}
          type={type}
          placeholder={placeholder}
          value={field.state.value ?? ""}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          aria-invalid={isInvalid}
          className={cn(rightSection && "pr-10", inputClassName)}
        />
        {rightSection && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {rightSection}
          </div>
        )}
      </div>
    </FormBase>
  );
}

// import { Input } from "@/components/ui/input";
// import { FormBase, type FormControlProps } from "./FormBase";
// import { useFieldContext } from "./hooks";

// export function FormInput(props: FormControlProps) {
//   const field = useFieldContext<string>();
//   const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

//   return (
//     <FormBase {...props}>
//       <Input
//         id={field.name}
//         name={field.name}
//         value={field.state.value}
//         onBlur={field.handleBlur}
//         onChange={(e) => field.handleChange(e.target.value)}
//         aria-invalid={isInvalid}
//       />
//     </FormBase>
//   );
// }
