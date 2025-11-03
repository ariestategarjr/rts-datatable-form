import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  User,
  CreditCard,
  Eye,
  EyeOff,
  Subtitles,
  Check,
} from "lucide-react";
import type z from "zod";
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

export const Route = createFileRoute("/_auth/register-ref")({
  component: RegistrationPage,
});

const steps = [
  {
    id: 0,
    name: "Step 1",
    title: "Account Details",
    subtitle: "Setup Account Details",
    icon: User,
    fields: ["firstName", "lastName", "email"],
  },
  {
    id: 1,
    name: "Step 2",
    title: "Personal Information",
    subtitle: "Add Personal Info",
    icon: Home,
    fields: ["country", "state", "city", "street", "zip"],
  },
  {
    id: 2,
    name: "Step 3",
    title: "Complete",
    subtitle: "Your form is completed!",
    icon: Check,
    fields: [],
  },
];

type FormValues = z.infer<typeof FormDataSchema>;
type FieldName = keyof FormValues;

function RegistrationPage() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
  };

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    console.log(output);

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = async () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="absolute inset-0 p-24">
      {/* steps */}
      {/* <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.name}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.name}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.name}
                  </span>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav> */}

      {/* Form */}
      <form className="mt-0 py-0" onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Provide your personal details.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Address
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country")}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="street"
                    {...register("street")}
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.street?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="city"
                    {...register("city")}
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.city?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="state"
                    {...register("state")}
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.state?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="zip"
                    {...register("zip")}
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                  {errors.zip?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Complete
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Thank you for your submission.
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className="mt-5 pt-0">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : (
            <button>Submit</button>
          )}
        </div>
      </div>
    </section>
  );
}

// function RegistrationPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     // profileLink: "",
//     firstName: "",
//     lastName: "",
//     mobile: "",
//     pincode: "",
//     address: "",
//     landmark: "",
//     city: "",
//     state: "",
//     selectedPlan: null,
//     cardNumber: "",
//     nameOnCard: "",
//     expiryDate: "",
//     cvc: "",
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleNext = () => {
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = () => {
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Left Side - Illustration */}
//       <div className="hidden lg:flex lg:w-1/3 bg-gray-100 items-center justify-center p-8">
//         <div className="text-center">
//           <div className="mb-8">
//             <div className="flex items-center gap-2 mb-12">
//               <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//                 </svg>
//               </div>
//               <span className="text-xl font-semibold">IMM HRIS</span>
//             </div>
//           </div>

//           {/* Placeholder for illustration */}
//           <div className="flex items-center justify-center">
//             <div className="w-64 h-96 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
//               Illustration Area
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Right Side - Form */}
//       <div className="flex-1 flex items-start justify-center p-8 overflow-y-auto">
//         <div className="w-full max-w-4xl mt-8">
//           {/* Progress Steps */}
//           <div className="mb-12">
//             <div className="flex items-center justify-between">
//               {steps.map((step, index) => {
//                 const Icon = step.icon;
//                 const isActive = currentStep === step.id;
//                 const isCompleted = currentStep > step.id;

//                 return (
//                   <React.Fragment key={step.id}>
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
//                           isActive || isCompleted
//                             ? "bg-black text-white"
//                             : "bg-white border-2 border-gray-200 text-gray-400"
//                         }`}
//                       >
//                         <Icon className="w-5 h-5" />
//                       </div>
//                       <div className="hidden sm:block">
//                         <div
//                           className={`font-semibold ${isActive ? `text-black` : `text-gray-500`}`}
//                         >
//                           {step.title}
//                         </div>
//                         <div className="text-sm text-gray-400">
//                           {step.subtitle}
//                         </div>
//                       </div>
//                     </div>

//                     {index < steps.length - 1 && (
//                       <ChevronRight className="hidden md:block text-gray-300 flex-shrink-0" />
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Form Content */}
//           <div className="bg-white rounded-lg shadow-sm p-8">
//             {/* Step 1: Account Information */}
//             {currentStep === 1 && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">Account Information</h2>
//                 <p className="text-gray-500 mb-8">Enter Your Account Details</p>

//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <Label htmlFor="username">Username</Label>
//                       <Input
//                         id="username"
//                         placeholder="John Doe"
//                         value={formData.username}
//                         onChange={(e) =>
//                           handleInputChange("username", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="john.doe@example.com"
//                         value={formData.email}
//                         onChange={(e) =>
//                           handleInputChange("email", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <Label htmlFor="password">Password</Label>
//                       <div className="relative mt-2">
//                         <Input
//                           id="password"
//                           type={showPassword ? "text" : "password"}
//                           placeholder="Password"
//                           value={formData.password}
//                           onChange={(e) =>
//                             handleInputChange("password", e.target.value)
//                           }
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showPassword ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                     <div>
//                       <Label htmlFor="confirmPassword">Confirm Password</Label>
//                       <div className="relative mt-2">
//                         <Input
//                           id="confirmPassword"
//                           type={showConfirmPassword ? "text" : "password"}
//                           placeholder="Confirm Password"
//                           value={formData.confirmPassword}
//                           onChange={(e) =>
//                             handleInputChange("confirmPassword", e.target.value)
//                           }
//                         />
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setShowConfirmPassword(!showConfirmPassword)
//                           }
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           {showConfirmPassword ? (
//                             <EyeOff className="w-4 h-4" />
//                           ) : (
//                             <Eye className="w-4 h-4" />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* <div>
//                     <Label htmlFor="profileLink">Profile Link</Label>
//                     <Input
//                       id="profileLink"
//                       placeholder="https://example.com"
//                       value={formData.profileLink}
//                       onChange={(e) =>
//                         handleInputChange("profileLink", e.target.value)
//                       }
//                       className="mt-2"
//                     />
//                   </div> */}
//                 </div>
//               </div>
//             )}

//             {/* Step 2: Personal Information */}
//             {currentStep === 2 && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">
//                   Personal Information
//                 </h2>
//                 <p className="text-gray-500 mb-8">
//                   Enter Your Personal Information
//                 </p>

//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <Label htmlFor="firstName">First Name</Label>
//                       <Input
//                         id="firstName"
//                         placeholder="John"
//                         value={formData.firstName}
//                         onChange={(e) =>
//                           handleInputChange("firstName", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="lastName">Last Name</Label>
//                       <Input
//                         id="lastName"
//                         placeholder="Doe"
//                         value={formData.lastName}
//                         onChange={(e) =>
//                           handleInputChange("lastName", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <Label htmlFor="mobile">Mobile</Label>
//                       <Input
//                         id="mobile"
//                         placeholder="+1 (555) 123-4567"
//                         value={formData.mobile}
//                         onChange={(e) =>
//                           handleInputChange("mobile", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="pincode">Pincode</Label>
//                       <Input
//                         id="pincode"
//                         placeholder="Postal Code"
//                         value={formData.pincode}
//                         onChange={(e) =>
//                           handleInputChange("pincode", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label htmlFor="address">Address</Label>
//                     <Input
//                       id="address"
//                       placeholder="123 Main St"
//                       value={formData.address}
//                       onChange={(e) =>
//                         handleInputChange("address", e.target.value)
//                       }
//                       className="mt-2"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="landmark">Landmark</Label>
//                     <Input
//                       id="landmark"
//                       placeholder="Near Central Park, New York"
//                       value={formData.landmark}
//                       onChange={(e) =>
//                         handleInputChange("landmark", e.target.value)
//                       }
//                       className="mt-2"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <Label htmlFor="city">City</Label>
//                       <Input
//                         id="city"
//                         placeholder="New York"
//                         value={formData.city}
//                         onChange={(e) =>
//                           handleInputChange("city", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="state">State</Label>
//                       <Input
//                         id="state"
//                         placeholder="NY"
//                         value={formData.state}
//                         onChange={(e) =>
//                           handleInputChange("state", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Billing */}
//             {currentStep === 3 && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-2">Select Plan</h2>
//                 <p className="text-gray-500 mb-8">
//                   Select Plan as per Your Requirements
//                 </p>

//                 {/* Plan Selection */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                   {[
//                     {
//                       id: "basic",
//                       name: "Basic",
//                       description: "Get 1 project with 1 team member.",
//                       price: "0",
//                       period: "/month",
//                     },
//                     {
//                       id: "pro",
//                       name: "Pro",
//                       description: "Get 5 projects with 5 team members.",
//                       price: "99",
//                       period: "/month",
//                     },
//                     {
//                       id: "elite",
//                       name: "Elite",
//                       description: "Get 25 projects with 25 team members.",
//                       price: "299",
//                       period: "/year",
//                     },
//                   ].map((plan) => (
//                     <Card
//                       key={plan.id}
//                       className={`cursor-pointer transition-all ${
//                         formData.selectedPlan === plan.id
//                           ? "ring-2 ring-black"
//                           : "hover:border-gray-400"
//                       }`}
//                       onClick={() =>
//                         handleInputChange("selectedPlan", plan.id as any)
//                       }
//                     >
//                       <CardContent className="p-6 text-center">
//                         <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
//                         <p className="text-sm text-gray-500 mb-4 min-h-[40px]">
//                           {plan.description}
//                         </p>
//                         <div className="mb-4">
//                           <span className="text-sm align-top">$</span>
//                           <span className="text-4xl font-bold">
//                             {plan.price}
//                           </span>
//                           <span className="text-sm text-gray-500">
//                             {plan.period}
//                           </span>
//                         </div>
//                         <div
//                           className={`w-3 h-3 rounded-full mx-auto ${
//                             formData.selectedPlan === plan.id
//                               ? "bg-black"
//                               : "bg-gray-300"
//                           }`}
//                         />
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>

//                 {/* Payment Information */}
//                 <h2 className="text-2xl font-bold mb-2">Payment Information</h2>
//                 <p className="text-gray-500 mb-8">
//                   Enter Your Card Information
//                 </p>

//                 <div className="space-y-6">
//                   <div>
//                     <Label htmlFor="cardNumber">Card Number</Label>
//                     <Input
//                       id="cardNumber"
//                       placeholder="1234 5678 9012 3456"
//                       value={formData.cardNumber}
//                       onChange={(e) =>
//                         handleInputChange("cardNumber", e.target.value)
//                       }
//                       className="mt-2"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="md:col-span-1">
//                       <Label htmlFor="nameOnCard">Name on Card</Label>
//                       <Input
//                         id="nameOnCard"
//                         placeholder="John Doe"
//                         value={formData.nameOnCard}
//                         onChange={(e) =>
//                           handleInputChange("nameOnCard", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="expiryDate">Expiry Date</Label>
//                       <Input
//                         id="expiryDate"
//                         placeholder="MM/YY"
//                         value={formData.expiryDate}
//                         onChange={(e) =>
//                           handleInputChange("expiryDate", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="cvc">CVC</Label>
//                       <Input
//                         id="cvc"
//                         placeholder="123"
//                         value={formData.cvc}
//                         onChange={(e) =>
//                           handleInputChange("cvc", e.target.value)
//                         }
//                         className="mt-2"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between mt-12">
//               <Button
//                 variant="outline"
//                 onClick={handlePrevious}
//                 disabled={currentStep === 1}
//                 className="flex items-center gap-2"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//                 Previous
//               </Button>

//               {currentStep < 3 ? (
//                 <Button
//                   onClick={handleNext}
//                   className="flex items-center gap-2 bg-black hover:bg-gray-800"
//                 >
//                   Next
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={handleSubmit}
//                   className="bg-green-600 hover:bg-green-700 px-8"
//                 >
//                   Submit
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
