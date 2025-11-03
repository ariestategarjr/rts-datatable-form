import { type ColumnDef } from "@tanstack/react-table";

export type EmployeeInventory = {
  id: number;
  nama: string;
  serial_number: string;
  kategori: { id: number; nama: string }[]; // atau object tunggal jika bukan array
};

export const EmployeeInventoryColumns: ColumnDef<EmployeeInventory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "nama",
    header: "Nama",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
    cell: (info) => {
      const value = info.getValue() as { id: number; nama: string }[] | null;
      if (!value || value.length === 0) return "-";
      return value.map((item) => item.nama).join(", ");
    },
  },
];
