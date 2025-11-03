import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput } from "./FormInput";
import { FormPassword } from "./FormPassword";
import { FormDate } from "./FormDate";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Password: FormPassword,
    Date: FormDate,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
