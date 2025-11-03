"use client";

import { useState } from "react";
import { type Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { Select } from "@/components/custom/select";

const employeeStatusOptions = [
  "Calon Karyawan",
  "Training",
  "Kontrak",
  "Tetap",
  "Resign",
  "Internship",
  "Habis Kontrak",
];

const departmentOptions = [
  "Production & Logistic Development",
  "Marketing & Service Development",
  "Product & Brand Development",
  "Administrative & Financial Development",
  "Human Resource, Public Relation & General Affairs Development",
  "Research & System Development",
];

// interface FilterDrawerProps {
//   filters: string[];
// }
interface FilterDrawerProps<TData> {
  table: Table<TData>;
}

export function FilterDrawer<TData>({ table }: FilterDrawerProps<TData>) {
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);

  const [monthFrom, setMonthFrom] = useState<Date>(new Date()); // ← state untuk kontrol bulan

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openDept, setOpenDept] = useState(false);

  const [dateDummy, setDateDummy] = useState<Date | undefined>(new Date());

  const applyFilters = () => {
    const filters = [];

    if (dateFrom && dateTo) {
      filters.push({
        id: "tanggal_masuk", // pastikan nama accessorKey cocok
        value: { from: dateFrom, to: dateTo },
      });
    }

    if (status) {
      filters.push({ id: "status", value: status });
    }

    if (department) {
      filters.push({ id: "departemen", value: department });
    }

    table.setColumnFilters(filters);
  };

  const resetFilters = () => {
    setDateFrom(null);
    setDateTo(null);
    setStatus(null);
    setDepartment(null);
    table.setColumnFilters([]); // 🧹 hapus semua filter di TanStack
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-3 space-y-6">
          {/* Date Range */}
          <div className="grid gap-3">
            <Label>Periode Tanggal</Label>
            <div className="flex-col space-y-2">
              {/* From */}
              <div>
                <Popover open={openFrom} onOpenChange={setOpenFrom}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal w-full"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom
                        ? format(dateFrom, "dd/MM/yyyy")
                        : "Dari Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="" align="start">
                    <Calendar
                      mode="single"
                      month={monthFrom} // ← controlled month
                      // month={dateFrom ?? undefined}
                      selected={dateFrom}
                      onSelect={(date) => {
                        // setDateFrom(date);
                        if (date) {
                          setDateFrom(date);
                          setMonthFrom(date); // ← sinkronkan bulan tampilan
                        }
                        setOpenFrom(false); // ⬅️ otomatis tutup setelah pilih
                      }}
                      onMonthChange={(m) => setMonthFrom(m)} // ← update state bulan saat user ubah via dropdown atau tombol prev/next
                      captionLayout="dropdown"
                    />
                    <div className="flex justify-between pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDateFrom(new Date()); // set ke hari ini
                          setOpenFrom(false);
                        }}
                      >
                        Hari ini
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDateFrom(null); // clear
                          setOpenFrom(false);
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              {/* To */}
              <div>
                <Popover open={openTo} onOpenChange={setOpenTo}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start w-full text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "dd/MM/yyyy") : "Sampai Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      month={dateTo ?? undefined}
                      onSelect={(date) => {
                        setDateTo(date);
                        setOpenTo(false); // ⬅️ otomatis tutup juga
                      }}
                      captionLayout="dropdown"
                    />
                    <div className="flex justify-between pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDateTo(new Date()); // set ke hari ini
                          setOpenTo(false);
                        }}
                      >
                        Hari ini
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setDateTo(null); // clear
                          setOpenTo(false);
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* <div className="grid gap-3">
            <Label>Periode Tanggal (Dummy)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal w-full"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateDummy ? format(dateDummy, "dd/MM/yyyy") : "Tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateDummy}
                  onSelect={setDateDummy}
                  className="rounded-md border shadow-sm"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div> */}

          {/* Status Karyawan */}
          {/* <div className="grid gap-3">
            <Label>Status Karyawan</Label>
            <Popover open={openStatus} onOpenChange={setOpenStatus}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {status || "Pilih Status"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[300px]" align="start">
                <Command>
                  <CommandInput placeholder="Cari status..." />
                  <CommandList>
                    {employeeStatusOptions.map((option) => (
                      <CommandItem
                        key={option}
                        onSelect={() => {
                          setStatus(option);
                          setOpenStatus(false); // ⬅️ tutup otomatis
                        }}
                        className="cursor-pointer"
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div> */}

          {/* Departemen Karyawan */}
          {/* <div className="grid gap-3">
            <Label>Departemen</Label>
            <Popover open={openDept} onOpenChange={setOpenDept}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {department || "Pilih Departemen"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[300px]" align="start">
                <Command>
                  <CommandInput placeholder="Cari departemen..." />
                  <CommandList>
                    {departmentOptions.map((option) => (
                      <CommandItem
                        key={option}
                        onSelect={() => {
                          setDepartment(option);
                          setOpenDept(false); // ⬅️ tutup otomatis
                        }}
                        className="cursor-pointer"
                      >
                        {option}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div> */}

          {/* Status Karyawan (Dummy) */}
          {/* <Select
            options={employeeStatusOptions}
            defaultValue="Pilih Status"
          /> */}
        </div>

        {/* Footer Buttons */}
        <SheetFooter className="flex gap-2">
          <SheetClose asChild>
            <Button type="button" className="flex-1" onClick={applyFilters}>
              Terapkan
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline" onClick={resetFilters} className="flex-1">
              Reset
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// <Sheet>
//   <SheetTrigger asChild>
//     <Button variant="outline">
//       <Filter className="mr-2 h-4 w-4" /> Filter
//     </Button>
//   </SheetTrigger>
//   <SheetContent>
//     <SheetHeader>
//       <SheetTitle>Filter</SheetTitle>
//     </SheetHeader>
//     <div className="grid flex-1 auto-rows-min gap-6 px-4">
//       <div className="grid gap-3">
//         <Label htmlFor="sheet-demo-name">Tanggal</Label>
//         <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
//       </div>
//       <div className="grid gap-3">
//         <Label htmlFor="sheet-demo-username">Username</Label>
//         <Input id="sheet-demo-username" defaultValue="@peduarte" />
//       </div>
//     </div>
//     <SheetFooter>
//       <Button type="submit">Terapkan</Button>
//       <SheetClose asChild>
//         <Button variant="outline">Reset</Button>
//       </SheetClose>
//     </SheetFooter>
//   </SheetContent>
// </Sheet>

// <Sheet>
//   <SheetTrigger asChild>
//     <Button variant="outline" size="sm">
//       <Filter className="mr-2 h-4 w-4" /> Filter
//     </Button>
//   </SheetTrigger>
//   <SheetContent side="right" className="w-[300px] sm:w-[400px] p-3">
//     <h2 className="text-lg font-semibold mb-4">Filter</h2>
//     <div className="space-y-4">
//       {filters.includes("date") && (
//         <div>
//           <label className="text-sm font-medium mb-1 block">
//             Date Range
//           </label>
//           {/* Ganti dengan komponen date range picker kamu */}
//           <input type="date" className="border rounded p-1 w-full" />
//         </div>
//       )}

//       {/* note
//       dikarenakan filter custom disesuaikan dengan konteks data, maka kemungkinan akan dibuat di dalam /columns (ganti nama), untuk component filter nya
//         jadi, komponen di bawah diperoleh dari import
//       */}
//       {filters.includes("status") && (
//         <div>
//           <label className="text-sm font-medium mb-1 block">Status</label>
//           <select className="border rounded p-1 w-full">
//             <option value="">All</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       )}
//       {/* Tambah filter lain sesuai kebutuhan */}

//       {/* Tombol Apply & Reset */}
//       <div className="flex justify-end space-x-2">
//         <Button className="btn-secondary">Reset</Button>
//         <Button className="btn-primary">Apply</Button>
//       </div>
//     </div>
//   </SheetContent>
// </Sheet>
