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

export type EmployeeEducation = {
  id: number;
  employeeId: number; // id karyawan (foreign key)
  jenjang: string;
  instansi: string;
  tahun_lulus: number;
};

export type Employee = {
  id: number;
  nama: string;
  email: string;
  telepon: string;
  status?: { id: number; nama: string };
  departemen?: { id: number; nama: string };
};

// Kolom dasar yang digunakan di semua halaman
const baseColumns: ColumnDef<EmployeeEducation>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "jenjang",
    header: "Jenjang",
  },
  {
    accessorKey: "instansi",
    header: "Instansi",
  },
  {
    accessorKey: "tahun_lulus",
    header: "Tahun Lulus",
  },
];

// eslint-disable-next-line react-refresh/only-export-components
function EmployeeEducationActions({ employee }: { employee: EmployeeEducation }) {
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
              to: "/employees/edit/$employeeId/education/edit/$educationId", // ✅ sesuaikan dengan route-mu
              params: {
                employeeId: String(employee.employeeId),
                educationId: String(employee.id),
              },
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

// Kolom aksi opsional
const actionColumn: ColumnDef<EmployeeEducation> = {
  id: "actions",
  header: "Aksi",
  cell: ({ row }) => <EmployeeEducationActions employee={row.original} />,
  // cell: () => {
  //   return (
  //     //   <div className="flex gap-2">
  //     //     <Button
  //     //       variant="outline"
  //     //       size="sm"
  //     //       onClick={() => console.log("Edit", data.id)}
  //     //     >
  //     //       Edit
  //     //     </Button>
  //     //     <Button
  //     //       variant="destructive"
  //     //       size="sm"
  //     //       onClick={() => console.log("Hapus", data.id)}
  //     //     >
  //     //       Hapus
  //     //     </Button>
  //     //   </div>
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="ghost" className="h-8 w-8 p-0">
  //           <span className="sr-only">Open menu</span>
  //           <MoreHorizontal className="h-4 w-4" />
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuLabel>Aksi</DropdownMenuLabel>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem
  //         >Edit</DropdownMenuItem>
  //         <DropdownMenuItem>Hapus</DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   );
  // },
};

/**
 * Fungsi helper untuk generate kolom:
 * - showAction = true → tambahkan kolom aksi
 * - showAction = false → hanya kolom dasar
 */
export function getEmployeeEducationColumns(showAction: boolean) {
  if (showAction) {
    return [...baseColumns, actionColumn];
  }
  return baseColumns;
}
