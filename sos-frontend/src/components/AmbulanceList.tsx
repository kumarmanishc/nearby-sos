import React from "react";
import { MapPin, Ambulance as AmbulanceIcon } from "lucide-react";
import { ambulanceApi } from "@/services/api";
import type { Ambulance } from "@/services/api";
import TableMaster, { type TableConfig, type TableColumn } from "./TableMaster";

interface AmbulanceListProps {
  onAdd?: () => void;
  onEdit?: (ambulance: Ambulance) => void;
  onDelete?: (id: string) => void;
}

export default function AmbulanceList({
  onAdd,
  onEdit,
  onDelete,
}: AmbulanceListProps) {
  const columns: TableColumn[] = [
    {
      key: "image",
      label: "Image",
      render: (value, item) =>
        value ? (
          <img
            src={value}
            alt={item.title}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
            <AmbulanceIcon className="h-6 w-6 text-muted-foreground" />
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

  const config: TableConfig<Ambulance> = {
    title: "Ambulances",
    icon: AmbulanceIcon,
    columns,
    api: ambulanceApi,
    actions: {
      onAdd,
      onEdit,
      onDelete,
    },
    emptyMessage: "Get started by adding your first ambulance.",
    addButtonText: "Add Ambulance",
  };

  return <TableMaster config={config} />;
}
