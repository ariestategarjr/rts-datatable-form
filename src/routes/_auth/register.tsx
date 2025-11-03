import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/components/form-siu/hooks";
import { RegisterFormSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
});

type FormData = z.infer<typeof RegisterFormSchema>;

function RouteComponent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const registrationMutation = useMutation({
    mutationFn: async (value: z.infer<typeof RegisterFormSchema>) => {
      const formData = new FormData();
      formData.append("username", value.username);
      formData.append("email", value.email);
      formData.append("password", value.password);
      // formData.append("confirmPassword", value.confirmPassword);
      console.log(
        "📦 FormData content:",
        Object.fromEntries(formData.entries())
      );

      const response = await fetch(`/api/register`, {
        method: "POST",
        body: formData,
      });
      console.log("🔍 Raw response:", response);

      const result = await response.json();
      console.log("🔍 Result:", result.result);

      if (!response.ok) {
        throw new Error(result.error?.message || "Registration failed");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Welcome to HRIS!",
        description: "You have successfully registered.",
      });
      // navigate({ to: "/" });
    },
    onError: () => {
      toast({
        title: "Error!",
        description: "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      date: "",
    } satisfies FormData as FormData,
    validators: {
      onSubmit: RegisterFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      registrationMutation.mutate(value);
    },
  });

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold">Sign Up</h1>
      <p className="mt-1 text-muted-foreground">
        Ship Faster and Focus on Growth.
      </p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.AppField name="username">
          {(field) => <field.Input label="Username" />}
        </form.AppField>
        <form.AppField name="email">
          {(field) => <field.Input label="Email" />}
        </form.AppField>
        <form.AppField name="password">
          {(field) => <field.Password label="Password" />}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => <field.Password label="Konfirmasi Password" />}
        </form.AppField>
        {/* <form.AppField name="date">
          {(field) => <field.Date label="Tanggal" />}
        </form.AppField> */}
        <Button
          type="submit"
          disabled={!form.state.canSubmit || form.state.isSubmitting}
          className="w-full rounded-md bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {form.state.isSubmitting ? "Processing..." : "Sign Up"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a className="font-medium underline" href="/sign-in">
            Sign in instead
          </a>
        </p>
      </form>
    </div>
  );
}
