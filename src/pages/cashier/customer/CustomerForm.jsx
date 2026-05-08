// CustomerForm.jsx
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "@/Redux Toolkit/features/customer/customerThunks";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CustomerForm = ({
  showCustomerForm,
  setShowCustomerForm
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customer);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name must be less than 50 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
    email: Yup.string().email("Please enter a valid email address").optional(),
  });

  const initialValues = {
    fullName: "",
    email: "",
    phone: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(createCustomer(values)).unwrap();
      toast.success("Customer created successfully!");
      resetForm();
      setShowCustomerForm(false);
    } catch (error) {
      toast.error(error || "Failed to create customer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowCustomerForm(false);
  };

  return (
    <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl sm:rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Add New Customer</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Field
                  as={Input}
                  id="fullName"
                  name="fullName"
                  placeholder="Enter customer full name"
                  className={`min-h-[44px] text-base ${errors.fullName && touched.fullName ? "border-red-500" : ""}`}
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  className={`min-h-[44px] text-base ${errors.phone && touched.phone ? "border-red-500" : ""}`}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  className={`min-h-[44px] text-base ${errors.email && touched.email ? "border-red-500" : ""}`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <Button variant="outline" onClick={handleCancel} type="button" className="w-full sm:w-auto min-h-[44px]">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || loading} className="w-full sm:w-auto min-h-[44px]">
                  {isSubmitting || loading ? "Creating..." : "Create Customer"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerForm;