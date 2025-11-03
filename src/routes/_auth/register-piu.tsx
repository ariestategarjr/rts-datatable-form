import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { RegisterFormSchema } from "@/lib/schema";
import type z from "zod";
import { useAppForm } from "@/components/form/hooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export const Route = createFileRoute("/_auth/register-piu")({
  component: RegisterPage,
});

type FormData = z.infer<typeof RegisterFormSchema>;

function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const form = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies FormData as FormData,
    validators: {
      onSubmit: RegisterFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", value);
    },
  });

  return (
    <div className="relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8">
      <Card className="z-1 w-full border-none shadow-md sm:max-w-lg">
        <CardHeader className="gap-6">
          {/* <Logo className="gap-3" /> */}

          <div>
            <CardTitle className="mb-1.5 text-2xl">Sign Up</CardTitle>
            <CardDescription className="text-base">
              Ship Faster and Focus on Growth.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Register Form */}
          <div className="space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              <FieldGroup>
                <form.AppField name="username">
                  {(field) => <field.TextField label="Username" />}
                </form.AppField>
                <form.AppField name="email">
                  {(field) => <field.TextField label="Email" />}
                </form.AppField>
                <form.AppField name="password">
                  {(field) => <field.TextField label="Password" />}
                </form.AppField>
                <form.AppField name="confirmPassword">
                  {(field) => <field.TextField label="Konfirmasi Password" />}
                </form.AppField>
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
              </FieldGroup>
            </form>

            {/* <FieldGroup>
                <form.Field name="username">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </FieldGroup> */}

            {/* <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <Label className="leading-5" htmlFor="username">
                  Username*
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-1">
                <Label className="leading-5" htmlFor="userEmail">
                  Email address*
                </Label>
                <Input
                  type="email"
                  id="userEmail"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="w-full space-y-1">
                <Label className="leading-5" htmlFor="password">
                  Password*
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                    className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isPasswordVisible ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="w-full space-y-1">
                <Label className="leading-5" htmlFor="confirmPassword">
                  Confirm Password*
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setIsConfirmPasswordVisible((prevState) => !prevState)
                    }
                    className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isConfirmPasswordVisible
                        ? "Hide password"
                        : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="rememberMe" className="size-6" />
                <Label htmlFor="rememberMe">
                  <span className="text-muted-foreground">I agree to</span>{" "}
                  <a href="#">privacy policy & terms</a>
                </Label>
              </div>
              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
            <p className="text-muted-foreground text-center">
              Already have an account?{" "}
              <a href="#" className="text-card-foreground hover:underline">
                Sign in instead
              </a>
            </p> */}

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
