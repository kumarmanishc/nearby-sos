import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Ambulance as AmbulanceIcon
} from 'lucide-react';
import { ambulanceApi } from '@/services/api';
import type { Ambulance, PaginatedResponse } from '@/services/api';

interface AmbulanceListProps {
  onAdd?: () => void;
  onEdit?: (ambulance: Ambulance) => void;
  onDelete?: (id: string) => void;
}

export default function AmbulanceList({ onAdd, onEdit, onDelete }: AmbulanceListProps) {
  const [ambulances, setAmbulances] = useState<PaginatedResponse<Ambulance> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  const fetchAmbulances = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ambulanceApi.getAll(page, itemsPerPage);
      setAmbulances(response);
      
      // Get total count
      const count = await ambulanceApi.getCount();
      setTotalCount(count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ambulances');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmbulances(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ambulance?')) {
      try {
        await ambulanceApi.delete(id);
        // Refresh the list
        fetchAmbulances(currentPage);
        if (onDelete) onDelete(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete ambulance');
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
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
            onClick={() => fetchAmbulances(currentPage)} 
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
  if (!ambulances || ambulances.data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AmbulanceIcon className="h-6 w-6" />
                Ambulances
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Total: {totalCount} ambulances
              </p>
            </div>
            <Button onClick={onAdd} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Ambulance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AmbulanceIcon className="h-24 w-24 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No ambulances found</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first ambulance.
            </p>
            <Button onClick={onAdd} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Ambulance
            </Button>
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
              <AmbulanceIcon className="h-6 w-6" />
              Ambulances
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Total: {totalCount} ambulances
            </p>
          </div>
          <Button onClick={onAdd} className="flex items-center gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            Add Ambulance
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4">
          {ambulances.data.map((ambulance) => (
            <Card key={ambulance.id} className="p-4">
              <div className="flex items-start space-x-4">
                {ambulance.image ? (
                  <img 
                    src={ambulance.image} 
                    alt={ambulance.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                    <AmbulanceIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{ambulance.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {ambulance.description}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">
                      {ambulance.location}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onEdit?.(ambulance)}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(ambulance.id)}
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
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ambulances.data.map((ambulance) => (
                <TableRow key={ambulance.id}>
                  <TableCell>
                    {ambulance.image ? (
                      <img 
                        src={ambulance.image} 
                        alt={ambulance.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                        <AmbulanceIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{ambulance.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{ambulance.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{ambulance.location}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onEdit?.(ambulance)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(ambulance.id)}
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
        {ambulances && ambulances.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
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
                {Array.from({ length: ambulances.totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === ambulances.totalPages || 
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
                disabled={currentPage === ambulances.totalPages}
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