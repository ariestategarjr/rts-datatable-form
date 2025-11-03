import { createFileRoute } from "@tanstack/react-router";

import { DataTable } from "@/components/data-table/data-table";
import { type Employee, EmployeeColumns } from "@/components/data-table/features/employees/columns/column-index";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllEmployees } from "@/api/employee";
import { employeeIndexTableConfig } from "@/config/data-table/employee";

export const Route = createFileRoute("/_manage/employees/")({
  component: RouteComponent,
});

function RouteComponent() {
  // const employees: Employee[] = [
  //   {
  //     id: 1,
  //     nama: "Andi",
  //     email: "andi@example.com",
  //     telepon: "08123456789",
  //     golongan: { id: 1, nama: "Golongan A" },
  //   },
  //   {
  //     id: 2,
  //     nama: "Budi",
  //     email: "budi@example.com",
  //     telepon: "08198765432",
  //     golongan: { id: 2, nama: "Golongan B" },
  //   },
  // ];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getAllEmployees(),
    placeholderData: keepPreviousData,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Terjadi kesalahan saat memuat data.</p>;

  console.log();

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Daftar Karyawan</h2>
        <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="mt-5">
        <DataTable<Employee>
          data={data ?? []}
          columns={EmployeeColumns}
          config={employeeIndexTableConfig}
        />
      </div>
    </div>
  );
}
