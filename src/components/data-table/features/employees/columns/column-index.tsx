import { type ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

export type Employee = {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  status?: { id: number; nama: string };
  departemen?: { id: number; nama: string };
};

// eslint-disable-next-line react-refresh/only-export-components
function EmployeeActions({ employee }: { employee: Employee }) {
  const navigate = useNavigate(); // ✅ pakai hook di komponen React

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            navigate({
              to: "/employees/detail/$id", // ✅ sesuaikan dengan route-mu
              params: { id: String(employee.id) },
            })
          }
        >
          Detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            navigate({
              to: "/employees/edit/$employeeId", // ✅ sesuaikan dengan route-mu
              params: { employeeId: String(employee.id) },
            })
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Hapus</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const EmployeeColumns: ColumnDef<Employee>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telepon",
    header: "Telepon",
  },
  {
    accessorFn: (row) => row.status?.nama ?? "-",
    id: "status",
    header: "Status",
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.departemen?.nama ?? "-",
    id: "departemen",
    header: "Departemen",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "tanggal_masuk",
    header: "Tanggal Masuk",
    cell: ({ getValue }) =>
      format(new Date(getValue() as string), "dd/MM/yyyy"),
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      return (
        date >= new Date(filterValue.from) && date <= new Date(filterValue.to)
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => <EmployeeActions employee={row.original} />, // ✅ panggil komponen
  },
];
