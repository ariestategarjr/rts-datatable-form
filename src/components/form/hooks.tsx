import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput } from "./FormInput";
import { FormPassword } from "./FormPassword";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField: FormInput,
    Password: FormPassword,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };

// import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
// import { FormInput } from "./FormInput";

// const { fieldContext, formContext, useFieldContext, useFormContext } =
//   createFormHookContexts();

// const { useAppForm } = createFormHook({
//   fieldComponents: {
//     TextField: FormInput,
//   },
//   formComponents: {},
//   fieldContext,
//   formContext,
// });

// export { useAppForm, useFieldContext, useFormContext };
