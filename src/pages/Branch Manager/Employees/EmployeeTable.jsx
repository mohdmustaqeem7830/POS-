import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, UserX, Key, BarChart } from "lucide-react";

const loginAccess = true;

const EmployeeTable = ({
  employees,
  handleToggleAccess,
  openResetPasswordDialog,
  openPerformanceDialog,
  openEditDialog,
}) => {
  // Reusable action buttons component
  const ActionButtons = ({ employee }) => (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleToggleAccess(employee)}
        title={employee.loginAccess ? "Disable Access" : "Enable Access"}
      >
        <UserX className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openResetPasswordDialog(employee)}
        title="Reset Password"
      >
        <Key className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openPerformanceDialog(employee)}
        title="View Performance"
      >
        <BarChart className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openEditDialog(employee)}
        title="Edit Employee"
      >
        <Edit className="h-4 w-4" />
      </Button>
    </div>
  );

  if (!employees?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No employees found matching your criteria
      </div>
    );
  }

  return (
    <>
      {/* ── MOBILE: Card layout — only visible below md ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {employees.map((employee) => (
          <Card key={employee.id}>
            <CardContent className="p-4 space-y-2">
              {/* Top row: Name + Badge */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-base">{employee.fullName}</p>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
                <Badge
                  className={
                    loginAccess
                      ? "bg-green-100 text-green-800 hover:bg-green-100/80"
                      : "bg-red-100 text-red-800 hover:bg-red-100/80"
                  }
                  variant="secondary"
                >
                  {loginAccess ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              {/* Email */}
              <p className="text-sm text-gray-600">{employee.email}</p>

              {/* Bottom row: Date + Actions */}
              <div className="flex justify-between items-center pt-1">
                <p className="text-xs text-gray-400">
                  Since: {employee.createdAt}
                </p>
                <ActionButtons employee={employee} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── DESKTOP: Table layout — only visible md and above ── */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Login Access</TableHead>
              <TableHead>Assigned Since</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  {employee.fullName}
                </TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      loginAccess
                        ? "bg-green-100 text-green-800 hover:bg-green-100/80"
                        : "bg-red-100 text-red-800 hover:bg-red-100/80"
                    }
                    variant="secondary"
                  >
                    {loginAccess ? "Enabled" : "Disabled"}
                  </Badge>
                </TableCell>
                <TableCell>{employee.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <ActionButtons employee={employee} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default EmployeeTable;