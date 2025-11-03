import { createFileRoute } from "@tanstack/react-router";
import { getEmployeeById } from "@/api/employee";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { employeeEducationsEditTableConfig } from "@/config/data-table/employee";
import { DataTable } from "@/components/data-table/data-table";
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

export const Route = createFileRoute("/_manage/employees/edit/$employeeId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { employeeId } = Route.useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployeeById(Number(employeeId)),
    placeholderData: keepPreviousData,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Terjadi kesalahan saat memuat data.</p>;

  const column = getEmployeeEducationColumns(true);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Edit Karyawan</h2>
        <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
      </div>
      <div className="mt-5">
        <Card className={cn("w-full")}>
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
              config={employeeEducationsEditTableConfig}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
