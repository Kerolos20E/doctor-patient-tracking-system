import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
// import SettingsPage from "@/pages/clinic/SettingsPage";
// import SchedulePage from "./pages/clinic/SchedulePage";
// import FinancePage from "./pages/clinic/FinancePage";
// import MedicalRecordsPage from "./pages/patient/MedicalRecordsPage";
import QueuePage from "./pages/patient/QueuePage";
// import BookAppointmentPage from "@/pages/patient/BookAppointmentPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <BookAppointmentPage /> */}
    <QueuePage />
  </StrictMode>
);
