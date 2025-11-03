import { createFileRoute } from "@tanstack/react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getEmployeeById } from "@/api/employee";
import {
  employeeInventoriesTableConfig,
  employeeEducationsDetailTableConfig,
} from "@/config/data-table/employee";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/data-table/data-table";
import {
  type EmployeeInventory,
  EmployeeInventoryColumns,
} from "@/components/data-table/features/employees/columns/column-inventories";
import {
  type EmployeeEducation,
  getEmployeeEducationColumns,
} from "@/components/data-table/features/employees/columns/column-educations";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useServerTable } from "@/hooks/useServerTable";

export const Route = createFileRoute("/_manage/employees/detail/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const column = getEmployeeEducationColumns(false);
  const { id } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployeeById(Number(id)),
    placeholderData: keepPreviousData,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Terjadi kesalahan saat memuat data.</p>;

  console.log(data[0].inventories);

  // const table = useServerTable(
  //   `pendidikan-${id}`,
  //   (params) => getEmployeeById(Number(id), params)
  // );

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Detail Karyawan</h2>
        <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="mt-5 flex flex-row gap-3">
        <Card className={cn("w-1/3")}>
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <CardTitle className="text-lg font-semibold">
                {data[0].nama}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="text-foreground/80 text-sm">Email</span>
                <span className="text-right text-sm font-medium">
                  {data[0].email}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-foreground/80 text-sm">Telepon</span>
                <span className="text-right text-sm font-medium">
                  {data[0].telepon}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="w-full space-y-3"></div>
          </CardFooter>
        </Card>
        <Card className={cn("w-2/3")}>
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
            <div className="flex-1 space-y-1">
              <CardTitle className="text-lg font-semibold">
                Pendidikan
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTable<EmployeeEducation>
              data={data[0].pendidikan ?? []}
              columns={column}
              config={employeeEducationsDetailTableConfig}
            />
          </CardContent>
        </Card>
      </div>
      <div className="mt-5">
        <Card className={cn("w-full")}>
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
            <div className="flex-1 space-y-1">
              <CardTitle className="text-lg font-semibold">
                Inventaris
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <DataTable<EmployeeInventory>
              data={data[0].inventories ?? []}
              columns={EmployeeInventoryColumns}
              config={employeeInventoriesTableConfig}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
