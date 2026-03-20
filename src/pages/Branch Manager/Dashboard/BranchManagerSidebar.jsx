import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Redux Toolkit/features/user/userThunks";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Package,
  Users,
  UserCircle,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const navLinks = [
  {
    name: "Dashboard",
    path: "/branch/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Orders",
    path: "/branch/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
  },
  {
    name: "Refunds",
    path: "/branch/refunds",
    icon: <RefreshCw className="w-5 h-5" />,
  },
  {
    name: "Transactions",
    path: "/branch/transactions",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    name: "Inventory",
    path: "/branch/inventory",
    icon: <Package className="w-5 h-5" />,
  },
  {
    name: "Employees",
    path: "/branch/employees",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Customers",
    path: "/branch/customers",
    icon: <UserCircle className="w-5 h-5" />,
  },
  {
    name: "Reports",
    path: "/branch/reports",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/branch/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

<<<<<<< HEAD
export default function BranchManagerSidebar({ onClose }) {
=======
export default function BranchManagerSidebar() {
>>>>>>> c67068a59b5cf6e1f74d29eb8cc7ebe387ebcf5a
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state.branch);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
<<<<<<< HEAD
    <aside className="fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col py-6 px-4 shadow-lg z-50">
      
      {/* ✅ Close Button */}
      <button
        className="absolute top-3 right-3 text-xl"
        onClick={onClose}
      >
        ✕
      </button>

=======
    <aside className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col py-6 px-4 shadow-lg">
>>>>>>> c67068a59b5cf6e1f74d29eb8cc7ebe387ebcf5a
      <div className="mb-8 text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
        <Package className="w-7 h-7 text-primary" />
        Branch Manager
      </div>
<<<<<<< HEAD

      {branch && (
        <div className="mb-6 px-4 py-3 bg-sidebar-accent rounded-lg">
          <h3 className="font-medium text-sidebar-accent-foreground">
            {branch.name}
          </h3>
          <p className="text-xs text-sidebar-accent-foreground/70 mt-1">
            {branch.address}
          </p>
        </div>
      )}

=======
      {branch && (
        <div className="mb-6 px-4 py-3 bg-sidebar-accent rounded-lg">
          <h3 className="font-medium text-sidebar-accent-foreground">{branch.name}</h3>
          <p className="text-xs text-sidebar-accent-foreground/70 mt-1">{branch.address}</p>
        </div>
      )}
>>>>>>> c67068a59b5cf6e1f74d29eb8cc7ebe387ebcf5a
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
<<<<<<< HEAD
                onClick={onClose} // ✅ click pe close
=======
>>>>>>> c67068a59b5cf6e1f74d29eb8cc7ebe387ebcf5a
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-base font-medium group ${
                  location.pathname.startsWith(link.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <span
                  className={`transition-colors ${
                    location.pathname.startsWith(link.path)
                      ? "text-sidebar-primary"
                      : "text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                  }`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
<<<<<<< HEAD

      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg text-base font-medium w-full text-left"
=======
      <div className="mt-auto">
        <Button
          onClick={handleLogout}
          variant=""
          className="flex items-center gap-3 rounded-lg transition-colors text-base font-medium w-full text-left "
>>>>>>> c67068a59b5cf6e1f74d29eb8cc7ebe387ebcf5a
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}