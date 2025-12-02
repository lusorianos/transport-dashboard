import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./routes/PrivateRoute";

import Login from "./pages/page-login";
import Painel from "./pages/page-home";
import PageShipmentDetails from "./pages/page-shipment-details";
import ReportBuilderPage from "./pages/page-reports"; // <-- NOVO

import { ToastContainer } from "react-toastify";
import { ShipmentProvider } from "./context/ShipmentContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ShipmentProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Painel />
                </PrivateRoute>
              }
            />
            <Route
              path="/embarque/:id"
              element={
                <PrivateRoute>
                  <PageShipmentDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/relatorios"
              element={
                <PrivateRoute>
                  <ReportBuilderPage />
                </PrivateRoute>
              }
            />

          </Routes>
        </ShipmentProvider>

        <ToastContainer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;