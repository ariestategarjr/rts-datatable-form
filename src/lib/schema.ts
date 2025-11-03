import z from "zod";

export const RegisterFormSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  email: z.string().min(1, "Email harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
  confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  date: z.string().min(1, "Tanggal harus diisi"),
});

export const RegisterTestFormSchema = z.object({
  // firstName: z.string().min(1, "Nama depan wajib diisi"),
  // lastName: z.string().min(1, "Nama belakang wajib diisi"),
  username: z.string().min(1, "Username harus diisi"),
  email: z.string().min(1, "Email harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
  confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
});

export const FormDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "Zip is required"),
});

// firstName: z.string().min(1, "Nama depan wajib diisi"),
// lastName: z.string().min(1, "Nama belakang wajib diisi"),
