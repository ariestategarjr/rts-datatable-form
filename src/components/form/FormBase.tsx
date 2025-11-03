import { type ReactNode } from "react";
import { useFieldContext } from "./hooks";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

// FormBase.tsx (tambahkan props)
export type FormControlProps = {
  label: string;
  description?: string;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
  required?: boolean; // NEW: tampilkan "*"
  fieldClassName?: string; // NEW: styling wrapper
  contentClassName?: string; // NEW: styling area label/desc
  labelClassName?: string; // NEW: styling label
  descriptionClassName?: string; // NEW: styling description
};

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
  required,
  fieldClassName,
  contentClassName,
  labelClassName,
  descriptionClassName,
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name} className={labelClassName}>
        {label}
        {required && <span className="ml-0 text-red-500">*</span>}
      </FieldLabel>
      {description && (
        <FieldDescription className={descriptionClassName}>
          {description}
        </FieldDescription>
      )}
    </>
  );
  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
      className={fieldClassName}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent className={contentClassName}>
            {labelElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          <FieldContent className={contentClassName}>
            {labelElement}
          </FieldContent>
          {children}
          {errorElem}
        </>
      )}
    </Field>
  );
}

// import { type ReactNode } from "react";
// import { useFieldContext } from "./hooks";
// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldError,
//   FieldLabel,
// } from "../ui/field";

// export type FormControlProps = {
//   label: string;
//   description?: string;
// };

// type FormBaseProps = FormControlProps & {
//   children: ReactNode;
//   horizontal?: boolean;
//   controlFirst?: boolean;
// };

// export function FormBase({
//   children,
//   label,
//   description,
//   controlFirst,
//   horizontal,
// }: FormBaseProps) {
//   const field = useFieldContext();
//   const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
//   const labelElement = (
//     <>
//       <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
//       {description && <FieldDescription>{description}</FieldDescription>}
//     </>
//   );
//   const errorElem = isInvalid && (
//     <FieldError errors={field.state.meta.errors} />
//   );

//   return (
//     <Field
//       data-invalid={isInvalid}
//       orientation={horizontal ? "horizontal" : undefined}
//     >
//       {controlFirst ? (
//         <>
//           {children}
//           <FieldContent>
//             {labelElement}
//             {errorElem}
//           </FieldContent>
//         </>
//       ) : (
//         <>
//           <FieldContent>{labelElement}</FieldContent>
//           {children}
//           {errorElem}
//         </>
//       )}
//     </Field>
//   );
// }
