import React from "react";
import { MapPin, UserRound } from "lucide-react";
import { doctorApi } from "@/services/api";
import type { Doctor } from "@/services/api";
import TableMaster, { type TableConfig, type TableColumn } from "./TableMaster";

interface DoctorListProps {
  onAdd?: () => void;
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (id: string) => void;
}

export default function DoctorList({
  onAdd,
  onEdit,
  onDelete,
}: DoctorListProps) {
  const columns: TableColumn[] = [
    {
      key: "image",
      label: "Image",
      render: (value, item) =>
        value ? (
          <img
            src={value}
            alt={item.title}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <UserRound className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
    },
    {
      key: "title",
      label: "Title",
      className: "font-medium",
    },
    {
      key: "description",
      label: "Description",
      className: "max-w-xs truncate",
    },
    {
      key: "location",
      label: "Location",
      render: (value) => (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="truncate">{value}</span>
        </div>
      ),
    },
  ];

  const config: TableConfig<Doctor> = {
    title: "Doctors",
    icon: UserRound,
    columns,
    api: doctorApi,
    actions: {
      onAdd,
      onEdit,
      onDelete,
    },
    emptyMessage: "Get started by adding your first doctor.",
    addButtonText: "Add Doctor",
  };

  return <TableMaster config={config} />;
}
