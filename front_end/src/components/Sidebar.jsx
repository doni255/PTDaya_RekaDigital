import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUtensils,
  FaPaintBrush,
  FaChartBar,
  FaUserShield,
  FaCog,
  FaBox,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineInventory2, MdOutlineStorage } from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Stock", path: "/stock", icon: <MdOutlineInventory2 /> },
    { name: "Customer", path: "/customer", icon: <FaUsers /> },
    { name: "Restaurant", path: "/restaurant", icon: <FaUtensils /> },
    { name: "Design", path: "/design", icon: <FaPaintBrush /> },
    { name: "Report", path: "/report", icon: <FaChartBar /> },
    { name: "Role & Admin", path: "/role-admin", icon: <FaUserShield /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const integrationItems = [
    { name: "Stock", path: "/integration-stock", icon: <MdOutlineStorage /> },
    { name: "Supply", path: "/supply", icon: <FaBox /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-screen">
      {/* Top Section - Menu & Integration */}
      <div className="flex-1  p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Square</h1>

        {/* Menu */}
        <nav className="">
          <p className="text-gray-500 text-sm uppercase mb-2">Menu</p>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition text-sm ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-200"
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Integration */}
        <nav className="mt-6">
          <p className="text-gray-500 text-sm uppercase mb-2">Integration</p>
          <ul>
            {integrationItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition text-gray-700 hover:bg-gray-200"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Fixed Profile & Logout Section */}
      <div className="flex-1 border-t border-gray-200 flex justify-center ">
        <div className="m-3">
          <div className="flex items-center gap-3 w-55">
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Savannah N</p>
              <p className="text-sm text-gray-500">Food Quality Manager</p>
            </div>
          </div>
          <button className="mt-3 w-55 flex items-center justify-center gap-2 p-2  text-red-600 rounded-lg hover:bg-red-200 transition">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
