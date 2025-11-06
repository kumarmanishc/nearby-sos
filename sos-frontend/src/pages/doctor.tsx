import { useState } from "react";
import DoctorList from "@/components/DoctorList";
import DoctorForm from "@/components/DoctorForm";
import type { Ambulance as Doctor } from "@/services/api";

export const DoctorPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  // Doctor page
  if (showDoctorForm) {
    return (
      <DoctorForm
        doctor={selectedDoctor}
        onSave={() => {
          setShowDoctorForm(false);
          setSelectedDoctor(undefined);
        }}
        onCancel={() => {
          setShowDoctorForm(false);
          setSelectedDoctor(undefined);
        }}
      />
    );
  }

  return (
    <DoctorList
      onAdd={() => {
        setSelectedDoctor(undefined);
        setShowDoctorForm(true);
      }}
      onEdit={(doctor) => {
        setSelectedDoctor(doctor);
        setShowDoctorForm(true);
      }}
      onDelete={() => {
        // Refresh is handled within the component
      }}
    />
  );
};
