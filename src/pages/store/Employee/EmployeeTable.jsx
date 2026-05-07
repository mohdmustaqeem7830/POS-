import React from "react";
import {
  Table, TableHeader, TableRow, TableHead,
  TableBody, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Mail, Phone, MapPin, User } from "lucide-react";
import { toast } from "sonner";

const RoleBadge = ({ role }) => {
  const colors = {
    ROLE_CASHIER: "bg-blue-50 text-blue-700 border-blue-200",
    ROLE_BRANCH_MANAGER: "bg-amber-50 text-amber-700 border-amber-200",
    ROLE_STORE_ADMIN: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  const cls = colors[role] || "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${cls}`}>
      {role?.replace("ROLE_", "").replace("_", " ")}
    </span>
  );
};

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm">
        No employees found.
      </div>
    );
  }

  return (
    <>
      {/* ── Mobile Card List (< sm) ─────────────────────────────────────── */}
      <div className="block sm:hidden space-y-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="rounded-xl border bg-card p-4 shadow-sm space-y-3"
          >
            {/* Top row: name + actions */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{employee.fullName}</p>
                  <RoleBadge role={employee.role} />
                </div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(employee)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onDelete(employee.id);
                    toast.success("Employee deleted successfully!");
                  }}
                  className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{employee.phone}</span>
              </div>
              {employee.branch?.name && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{employee.branch.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop Table (≥ sm) ────────────────────────────────────────── */}
      <div className="hidden sm:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.fullName}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{employee.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <RoleBadge role={employee.role} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{employee.branch?.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(employee)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onDelete(employee.id);
                      toast.success("Employee deleted successfully!");
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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