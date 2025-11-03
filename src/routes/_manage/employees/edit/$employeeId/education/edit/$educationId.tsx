import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_manage/employees/edit/$employeeId/education/edit/$educationId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_manage/employees/edit/$employeeId/education/edit/$educationId"!
    </div>
  );
}
