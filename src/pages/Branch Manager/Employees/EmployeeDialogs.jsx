import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeForm } from "../../store/Employee";
import { Plus } from "lucide-react";
import { branchAdminRole } from "../../../utils/userRole";

export const AddEmployeeDialog = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  handleAddEmployee,
  roles,
}) => (
  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
    <DialogTrigger asChild>
      <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
        <Plus className="mr-2 h-4 w-4" /> Add Employee
      </Button>
    </DialogTrigger>
    <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Employee</DialogTitle>
      </DialogHeader>
      <EmployeeForm
        initialData={null}
        onSubmit={handleAddEmployee}
        roles={roles}
      />
    </DialogContent>
  </Dialog>
);

export const EditEmployeeDialog = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedEmployee,
  handleEditEmployee,
  roles,
}) =>
  selectedEmployee && (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>
        <EmployeeForm
          initialData={
            selectedEmployee
              ? {
                  ...selectedEmployee,
                  branchId: selectedEmployee.branchId || "",
                }
              : null
          }
          onSubmit={handleEditEmployee}
          roles={roles}
        />
      </DialogContent>
    </Dialog>
  );

export const ResetPasswordDialog = ({
  isResetPasswordDialogOpen,
  setIsResetPasswordDialogOpen,
  selectedEmployee,
  handleResetPassword,
}) =>
  selectedEmployee && (
    <Dialog
      open={isResetPasswordDialogOpen}
      onOpenChange={setIsResetPasswordDialogOpen}
    >
      <DialogContent className="w-[95vw] max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>
            Are you sure you want to reset the password for{" "}
            <strong>{selectedEmployee.name}</strong>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            A temporary password will be generated and sent to their email
            address.
          </p>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setIsResetPasswordDialogOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleResetPassword}
            className="w-full sm:w-auto"
          >
            Reset Password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

export const PerformanceDialog = ({
  isPerformanceDialogOpen,
  setIsPerformanceDialogOpen,
  selectedEmployee,
}) =>
  selectedEmployee && (
    <Dialog
      open={isPerformanceDialogOpen}
      onOpenChange={setIsPerformanceDialogOpen}
    >
      <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Performance Summary - {selectedEmployee.name}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {selectedEmployee.role === "ROLE_BRANCH_CASHIER" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-500">
                        Orders Processed
                      </h3>
                      <p className="text-3xl font-bold mt-2">127</p>
                      <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-500">
                        Total Sales
                      </h3>
                      <p className="text-3xl font-bold mt-2">₹78,450</p>
                      <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-500">
                        Avg. Order Value
                      </h3>
                      <p className="text-3xl font-bold mt-2">₹617</p>
                      <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Daily Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">
                      Sales chart would appear here in production
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-500">
                        Stock Updates
                      </h3>
                      <p className="text-3xl font-bold mt-2">42</p>
                      <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-500">
                        Products Managed
                      </h3>
                      <p className="text-3xl font-bold mt-2">156</p>
                      <p className="text-sm text-gray-500 mt-1">Total</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center">
                      <h3 className="text-lg font-medium text-gray-500">
                        Inventory Accuracy
                      </h3>
                      <p className="text-3xl font-bold mt-2">98%</p>
                      <p className="text-sm text-gray-500 mt-1">Last audit</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">
                          Updated stock for 12 products
                        </p>
                        <p className="text-sm text-gray-500">
                          Grocery category
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 ml-4 shrink-0">
                        2 days ago
                      </p>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">Added 5 new products</p>
                        <p className="text-sm text-gray-500">Dairy category</p>
                      </div>
                      <p className="text-sm text-gray-500 ml-4 shrink-0">
                        5 days ago
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          Completed monthly inventory audit
                        </p>
                        <p className="text-sm text-gray-500">All categories</p>
                      </div>
                      <p className="text-sm text-gray-500 ml-4 shrink-0">
                        1 week ago
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            onClick={() => setIsPerformanceDialogOpen(false)}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Export Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );