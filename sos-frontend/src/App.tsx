import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { Ambulance, UserRound, Home } from "lucide-react";
import { DoctorPage, AmbulancePage } from "@/pages";

function App() {
  // Navigation component
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Home className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Nearby SOS
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              <Ambulance className="h-4 w-4 mr-2" />
              Ambulances
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`
              }
            >
              <UserRound className="h-4 w-4 mr-2" />
              Doctors
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<AmbulancePage />} />
            <Route path="/doctors" element={<DoctorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
