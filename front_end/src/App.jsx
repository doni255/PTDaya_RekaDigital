import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Stock from "./pages/Stock";
import Restaurant from "./pages/Restaurant";
import Design from "./pages/Design";
import Report from "./pages/Report";
import RoleAdmin from "./pages/RoleAdmin";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="flex bg-white overflow-hidden h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col pl-6 pr-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/design" element={<Design />} />
            <Route path="/report" element={<Report />} />
            <Route path="/role-admin" element={<RoleAdmin />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
