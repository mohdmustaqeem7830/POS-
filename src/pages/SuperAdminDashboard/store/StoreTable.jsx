import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Card, CardContent } from "../../../components/ui/card";
import { Eye, MoreHorizontal, Ban, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import StoreStatusBadge from "./StoreStatusBadge";
import { getAllStores, moderateStore } from "../../../Redux Toolkit/features/store/storeThunks";
import { formatDateTime } from "../../../utils/formateDate";

export default function StoreTable({ onViewDetails, onBlockStore, onActivateStore }) {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(getAllStores(statusFilter === "all" ? undefined : statusFilter));
  }, [dispatch, statusFilter]);

  const filteredStores = (stores || []).filter((store) => {
    const matchesSearch =
      (store.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (store?.owner?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (store?.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleStatusChange = async (storeId, newStatus) => {
    setUpdatingId(storeId);
    try {
      await dispatch(moderateStore({ storeId, action: newStatus })).unwrap();
    } catch (e) {
      // handle error
    } finally {
      setUpdatingId(null);
    }
  };

  // Reusable Actions Dropdown - same on both mobile & desktop
  const ActionMenu = ({ store }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onViewDetails?.(store)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        {store.status === "active" && (
          <DropdownMenuItem onClick={() => onBlockStore?.(store.id)}>
            <Ban className="mr-2 h-4 w-4" />
            Block Store
          </DropdownMenuItem>
        )}
        {store.status === "blocked" && (
          <DropdownMenuItem onClick={() => onActivateStore?.(store.id)}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Activate Store
          </DropdownMenuItem>
        )}
        {store.status === "pending" && (
          <>
            <DropdownMenuItem onClick={() => onActivateStore?.(store.id)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Store
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onBlockStore?.(store.id)}>
              <Ban className="mr-2 h-4 w-4" />
              Reject Store
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-4">

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search stores, owners, emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Loading / Error ── */}
      {loading ? (
        <div className="text-center py-8">Loading stores...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : (
        <>
          {/* ══════════════════════════════════════
              MOBILE: Card layout — hidden on md+
          ══════════════════════════════════════ */}
          <div className="flex flex-col gap-3 md:hidden">
            {stores.map((store) => (
              <Card key={store.id}>
                <CardContent className="p-4 space-y-3">

                  {/* Row 1: Store Name + Actions */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{store.brand}</p>
                      <p className="text-xs text-muted-foreground">
                        {store.storeAdmin?.fullName || "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <StoreStatusBadge status={store.status} />
                      <ActionMenu store={store} />
                    </div>
                  </div>

                  {/* Row 2: Phone + Email */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p>{store.contact?.phone || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="truncate">{store.contact?.email || "-"}</p>
                    </div>
                  </div>

                  {/* Row 3: Registered On */}
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Registered On</p>
                    <p>{formatDateTime(store.createdAt)}</p>
                  </div>

                  {/* Row 4: Update Status */}
                  <div className="flex items-center gap-2 pt-1 border-t">
                    <span className="text-xs text-muted-foreground shrink-0">
                      Update Status:
                    </span>
                    <Select
                      value={store.status?.toUpperCase()}
                      onValueChange={(val) => handleStatusChange(store.id, val)}
                      disabled={updatingId === store.id}
                    >
                      <SelectTrigger className="h-8 text-xs flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="BLOCKED">Blocked</SelectItem>
                      </SelectContent>
                    </Select>
                    {updatingId === store.id && (
                      <span className="text-xs text-muted-foreground">Updating...</span>
                    )}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* ══════════════════════════════════════
              DESKTOP: Table layout — hidden on mobile
          ══════════════════════════════════════ */}
          <div className="hidden md:block border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Update Status</TableHead>
                  <TableHead>Registered On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.brand}</TableCell>
                    <TableCell>{store.storeAdmin?.fullName}</TableCell>
                    <TableCell>{store.contact?.phone}</TableCell>
                    <TableCell>{store.contact?.email}</TableCell>
                    <TableCell>
                      <StoreStatusBadge status={store.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Select
                          value={store.status?.toUpperCase()}
                          onValueChange={(val) => handleStatusChange(store.id, val)}
                          disabled={updatingId === store.id}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                        {updatingId === store.id && (
                          <span className="text-xs text-muted-foreground">Updating...</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatDateTime(store.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <ActionMenu store={store} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {filteredStores.length === 0 && !loading && !error && (
        <div className="text-center py-8 text-muted-foreground">
          No stores found matching your criteria.
        </div>
      )}

    </div>
  );
}