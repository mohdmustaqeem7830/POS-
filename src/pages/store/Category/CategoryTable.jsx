import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Tag } from "lucide-react";
import { useDispatch } from 'react-redux';
import { deleteCategory } from '@/Redux Toolkit/features/category/categoryThunks';
import { toast } from '@/components/ui/use-toast';

const CategoryTable = ({ categories, loading, onEdit }) => {
  const dispatch = useDispatch();

  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem("jwt");
      await dispatch(deleteCategory({ id, token })).unwrap();
      toast({ title: "Success", description: "Category deleted successfully" });
    } catch (err) {
      toast({ title: "Error", description: err || "Failed to delete category", variant: "destructive" });
    }
  };

  // ── Shared spinner row ──────────────────────────────────────────────────────
  const SpinnerRow = () => (
    <TableRow>
      <TableCell colSpan={4} className="text-center py-8">
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-6 w-6 text-emerald-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading categories...
        </div>
      </TableCell>
    </TableRow>
  );

  // ── Mobile card list (shown only on small screens) ──────────────────────────
  const MobileList = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <svg className="animate-spin h-6 w-6 text-emerald-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-muted-foreground">Loading categories...</span>
        </div>
      );
    }

    if (categories.length === 0) {
      return (
        <div className="text-center py-10 text-sm text-muted-foreground px-4">
          No categories found. Add your first category to get started.
        </div>
      );
    }

    return (
      <div className="divide-y">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors"
          >
            {/* Left: icon + name */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex-shrink-0 w-8 h-8 rounded-md bg-emerald-50 flex items-center justify-center">
                <Tag className="h-4 w-4 text-emerald-500" />
              </div>
              <span className="font-medium text-sm truncate">{category.name}</span>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2 ml-3 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(category)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ── Desktop table (hidden on small screens) ─────────────────────────────────
  const DesktopTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <SpinnerRow />
        ) : categories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-8">
              No categories found. Add your first category to get started.
            </TableCell>
          </TableRow>
        ) : (
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-emerald-500" />
                  <span className="font-medium">{category.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <>
      {/* Mobile view */}
      <div className="block sm:hidden">
        <MobileList />
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block">
        <DesktopTable />
      </div>
    </>
  );
};

export default CategoryTable;
