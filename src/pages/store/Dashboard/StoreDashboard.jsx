import { Outlet } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getStoreByAdmin } from "../../../Redux Toolkit/features/store/storeThunks";
import StoreSidebar from "./StoreSidebar";
import StoreTopbar from "./StoreTopbar";

export default function StoreDashboard({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getStoreByAdmin(localStorage.getItem("jwt")));
    }
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <StoreSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StoreTopbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-background/80 rounded-tl-3xl shadow-xl m-2 sm:m-4">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}