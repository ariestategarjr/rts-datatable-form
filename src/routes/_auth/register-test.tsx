import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_auth/register-test")({
  component: RegisterPage,
});

function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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
            <form className="space-y-4">
              {/* Username */}
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

              {/* Email */}
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

              {/* Password */}
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

              {/* Confirm Password */}
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

              {/* Privacy policy */}
              <div className="flex items-center gap-3">
                <Checkbox id="rememberMe" className="size-6" />
                <Label htmlFor="rememberMe">
                  <span className="text-muted-foreground">I agree to</span>{" "}
                  <a href="#">privacy policy & terms</a>
                </Label>
              </div>

              <Button className="w-full" type="button">
                Sign Up
              </Button>
            </form>

            <p className="text-muted-foreground text-center">
              Already have an account?{" "}
              <a href="#" className="text-card-foreground hover:underline">
                Sign in instead
              </a>
            </p>

            {/* <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <p>or</p>
              <Separator className="flex-1" />
            </div> */}

            {/* <Button variant="ghost" className="w-full" asChild>
              <a href="#">Sign in with google</a>
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// <form onSubmit={handleSubmit(onSubmit)}>
//   <div>
//     <input
//       {...register("firstName")}
//       type="text"
//       placeholder="Nama depan"
//     />
//     {errors.firstName && (
//       <p className="text-red-500">{errors.firstName.message}</p>
//     )}
//   </div>
//   <div>
//     <input
//       {...register("lastName")}
//       type="text"
//       placeholder="Nama belakang"
//     />
//     {errors.lastName && (
//       <p className="text-red-500">{errors.lastName.message}</p>
//     )}
//   </div>
//   <button type="submit">Kirim</button>
// </form>
