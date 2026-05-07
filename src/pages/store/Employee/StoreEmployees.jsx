import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmployeeForm, EmployeeTable } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createStoreEmployee,
  findStoreEmployees,
  updateEmployee,
  deleteEmployee,
} from "@/Redux Toolkit/features/employee/employeeThunks";
import { storeAdminRole } from "../../../utils/userRole";

export default function StoreEmployees() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employee);
  const { store } = useSelector((state) => state.store);

  useEffect(() => {
    if (store?.id) {
      dispatch(
        findStoreEmployees({
          storeId: store?.id,
          token: localStorage.getItem("jwt"),
        })
      );
    }
  }, [dispatch, store?.id, localStorage.getItem("jwt")]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  const handleAddEmployee = (newEmployeeData) => {
    if (store?.id && localStorage.getItem("jwt")) {
      dispatch(
        createStoreEmployee({
          employee: {
            ...newEmployeeData,
            storeId: store?.id,
            username: newEmployeeData.email.split("@")[0],
          },
          storeId: store?.id,
          token: localStorage.getItem("jwt"),
        })
      );
      setIsAddDialogOpen(false);
    }
  };

  const handleEditEmployee = (updatedEmployeeData) => {
    if (currentEmployee?.id && localStorage.getItem("jwt")) {
      dispatch(
        updateEmployee({
          employeeId: currentEmployee.id,
          employeeDetails: updatedEmployeeData,
          token: localStorage.getItem("jwt"),
        })
      );
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteEmployee = (id) => {
    if (localStorage.getItem("jwt")) {
      dispatch(deleteEmployee({ employeeId: id, token: localStorage.getItem("jwt") }));
    }
  };

  const openEditDialog = (employee) => {
    setCurrentEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl sm:text-3xl font-bold tracking-tight leading-tight">
          Employee Management
        </h1>

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 flex-shrink-0 h-9 sm:h-10 px-3 sm:px-4 text-sm">
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Add Employee</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleAddEmployee}
              initialData={{
                fullName: "",
                email: "",
                password: "",
                phone: "",
                role: "",
                branchId: "",
              }}
              roles={storeAdminRole}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[calc(100%-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-xl">
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
            </DialogHeader>
            <EmployeeForm
              onSubmit={handleEditEmployee}
              roles={storeAdminRole}
              initialData={
                currentEmployee
                  ? { ...currentEmployee, branchId: currentEmployee.branchId || "" }
                  : null
              }
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <EmployeeTable
        employees={employees}
        onEdit={openEditDialog}
        onDelete={handleDeleteEmployee}
      />
    </div>
  );
}