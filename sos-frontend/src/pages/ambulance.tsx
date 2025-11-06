import { useState } from "react";
import AmbulanceList from "@/components/AmbulanceList";

import AmbulanceForm from "@/components/AmbulanceForm";
import type { Ambulance as AmbulanceType } from "@/services/api";

export const AmbulancePage = () => {
  const [selectedAmbulance, setSelectedAmbulance] = useState<
    AmbulanceType | undefined
  >();
  const [showAmbulanceForm, setShowAmbulanceForm] = useState(false);

  if (showAmbulanceForm) {
    return (
      <AmbulanceForm
        ambulance={selectedAmbulance}
        onSave={() => {
          setShowAmbulanceForm(false);
          setSelectedAmbulance(undefined);
        }}
        onCancel={() => {
          setShowAmbulanceForm(false);
          setSelectedAmbulance(undefined);
        }}
      />
    );
  }

  return (
    <AmbulanceList
      onAdd={() => {
        setSelectedAmbulance(undefined);
        setShowAmbulanceForm(true);
      }}
      onEdit={(ambulance) => {
        setSelectedAmbulance(ambulance);
        setShowAmbulanceForm(true);
      }}
      onDelete={() => {
        // Refresh is handled within the component
      }}
    />
  );
};
