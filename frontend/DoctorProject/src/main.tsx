import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
// import SettingsPage from "@/pages/clinic/SettingsPage";
// import SchedulePage from "./pages/clinic/SchedulePage";
import FinancePage from "./pages/clinic/FinancePage";
// import BookAppointmentPage from "@/pages/patient/BookAppointmentPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <BookAppointmentPage /> */}
    <FinancePage />
  </StrictMode>
);
