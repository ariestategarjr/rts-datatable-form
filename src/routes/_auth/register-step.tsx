import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChevronRight, ChevronLeft, ChevronDownIcon } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Check } from "lucide-react";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_auth/register-step")({
  component: RouteComponent,
});

const steps = [{}, {}, {}];

function RouteComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const form = useForm();

  const handleNext = () => {
    setCurrentStep((step) => step + 1);
  };

  const handlePrev = () => {
    setCurrentStep((step) => step - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Pendaftaran Karyawan Baru
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4 mx-8">
          <Form {...form}>
            <form className="space-y-8">
              {currentStep === 0 && (
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username*</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password*</FormLabel>
                        <FormControl>
                          <Input placeholder="Masukkan password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan konfirmasi password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {currentStep === 1 && (
                <div>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Depan*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama depan"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Belakang*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nama belakang"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="nik"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NIK*</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan NIK" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>No Telepon (Aktif)*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan nomor telepon"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tempat Lahir*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan tempat lahir"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Lahir*</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-3">
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    id="date"
                                    className="justify-between font-normal"
                                  >
                                    {field.value
                                      ? new Date(
                                          field.value
                                        ).toLocaleDateString("id-ID")
                                      : "Pilih tanggal lahir"}
                                    <ChevronDownIcon />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    captionLayout="dropdown"
                                    selected={
                                      field.value
                                        ? new Date(field.value)
                                        : undefined
                                    }
                                    onSelect={(selectedDate) => {
                                      field.onChange(selectedDate);
                                      setOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis Kelamin*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Select
                                value={field.value || ""}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Jenis Kelamin</SelectLabel>
                                    <SelectItem value="male">
                                      Laki-laki
                                    </SelectItem>
                                    <SelectItem value="female">
                                      Perempuan
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maritalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status Perkawinan*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Select
                                value={field.value || ""}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Pilih status perkawinan" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status Perkawinan</SelectLabel>
                                    <SelectItem value="unmarried">
                                      Lajang
                                    </SelectItem>
                                    <SelectItem value="married">
                                      Menikah
                                    </SelectItem>
                                    <SelectItem value="divorced">
                                      Cerai Hidup
                                    </SelectItem>
                                    <SelectItem value="widowed">
                                      Cerai Mati
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alamat*</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Textarea placeholder="Type your message here." />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan instagram"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
              )}
            </form>
          </Form>

          <div className="flex justify-between mt-12">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4" /> Kembali
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" variant="outline" onClick={handleNext}>
                Lanjut <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button type="button" variant="outline">
                Kirim <Check className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
