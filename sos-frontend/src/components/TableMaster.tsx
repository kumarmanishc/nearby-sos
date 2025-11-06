import React, { useState, useEffect, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  type LucideIcon,
} from "lucide-react";

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, item: any) => ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface TableConfig<T = any> {
  title: string;
  icon: LucideIcon;
  columns: TableColumn[];
  api: {
    getAll: (
      page: number,
      limit: number
    ) => Promise<{ data: T[]; totalPages: number }>;
    getCount: () => Promise<number>;
    delete: (id: string) => Promise<void>;
  };
  actions?: {
    onAdd?: () => void;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
  };
  itemsPerPage?: number;
  emptyMessage?: string;
  addButtonText?: string;
}

interface TableMasterProps<T = any> {
  config: TableConfig<T>;
}

export default function TableMaster<T extends { id: string }>({
  config,
}: TableMasterProps<T>) {
  const [data, setData] = useState<{ data: T[]; totalPages: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = config.itemsPerPage || 10;
  const IconComponent = config.icon;

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await config.api.getAll(page, itemsPerPage);
      setData(response);

      // Get total count
      const count = await config.api.getCount();
      setTotalCount(count);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to fetch ${config.title.toLowerCase()}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${config.title
          .toLowerCase()
          .slice(0, -1)}?`
      )
    ) {
      try {
        await config.api.delete(id);
        // Refresh the list
        fetchData(currentPage);
        if (config.actions?.onDelete) config.actions.onDelete(id);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : `Failed to delete ${config.title.toLowerCase().slice(0, -1)}`
        );
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderCellValue = (column: TableColumn, item: T) => {
    const value = item[column.key as keyof T];
    if (column.render) {
      return column.render(value, item);
    }
    return value as ReactNode;
  };

  // Loading state
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <Skeleton className="h-16 w-16 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-2" />
                  <Skeleton className="h-3 w-32 mb-1" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            onClick={() => fetchData(currentPage)}
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (!data || data.data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className="h-6 w-6" />
                {config.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Total: {totalCount} {config.title.toLowerCase()}
              </p>
            </div>
            {config.actions?.onAdd && (
              <Button
                onClick={config.actions.onAdd}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                {config.addButtonText || `Add ${config.title.slice(0, -1)}`}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <IconComponent className="h-24 w-24 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No {config.title.toLowerCase()} found
            </h3>
            <p className="text-muted-foreground mb-4">
              {config.emptyMessage ||
                `Get started by adding your first ${config.title
                  .toLowerCase()
                  .slice(0, -1)}.`}
            </p>
            {config.actions?.onAdd && (
              <Button onClick={config.actions.onAdd} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {config.addButtonText || `Add ${config.title.slice(0, -1)}`}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <IconComponent className="h-6 w-6" />
              {config.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Total: {totalCount} {config.title.toLowerCase()}
            </p>
          </div>
          {config.actions?.onAdd && (
            <Button
              onClick={config.actions.onAdd}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              {config.addButtonText || `Add ${config.title.slice(0, -1)}`}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4">
          {data.data.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="space-y-2">
                {config.columns.map((column) => (
                  <div
                    key={column.key}
                    className="flex justify-between items-start"
                  >
                    <span className="text-sm font-medium text-muted-foreground">
                      {column.label}:
                    </span>
                    <div className="text-sm text-right flex-1 ml-2">
                      {renderCellValue(column, item)}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-2 border-t">
                  {config.actions?.onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => config.actions?.onEdit?.(item)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                {config.columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((item) => (
                <TableRow key={item.id}>
                  {config.columns.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {renderCellValue(column, item)}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {config.actions?.onEdit && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => config.actions?.onEdit?.(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
              results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === data.totalPages ||
                      Math.abs(page - currentPage) <= 1
                  )
                  .map((page, index, arr) => (
                    <React.Fragment key={page}>
                      {index > 0 && arr[index - 1] !== page - 1 && (
                        <span className="px-2">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
