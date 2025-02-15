import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaFilter, FaSync, FaPlus } from "react-icons/fa";

import vectorImage from "../assets/Vector.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, fetchCustomers } from "../features/customerSlice";
import Modal from "../components/Modal";
import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

const Customer = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("Customer");
  const tabs = ["Customer", "Supplier", "Employee"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const {
    list: customers,
    status,
    error,
  } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  // ✅ FIX: Move `useDispatch()` inside the component, and only use it once
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      dispatch(deleteCustomer(id))
        .unwrap()
        .then(() => {
          alert("✅ Customer deleted successfully!");
        })
        .catch((error) => {
          alert("❌ Failed to delete customer: " + error);
        });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center  mb-4  pd-6 pt-6">
        <div className="">
          <h2 className="text-2xl font-semibold">Customer</h2>
          <p className="text-gray-600 mt-1">
            You can manage and organize your customer and other things here
          </p>
        </div>
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-lg font-medium relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Side: Table */}
        <div className="flex-1">
          <div className="bg-iris text-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold">Customer</h2>
            <p className="text-white/80">
              On this menu, you can manage customers.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button
                className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus className="mr-2" /> Add New Customer
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Customer"
                  className="p-2 pl-10 rounded-lg text-gray-600 bg-white shadow w-72"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button className="flex items-center bg-gray-200 px-4 py-2 rounded-lg text-gray-600 shadow">
                <FaFilter className="mr-2" /> Filter
              </button>
              <button className="flex items-center bg-gray-200 px-4 py-2 rounded-lg text-gray-600 shadow">
                <FaSync className="mr-2" /> Refresh
              </button>
            </div>
          </div>

          <CustomerTable
            customers={filteredCustomers}
            status={status}
            error={error}
            handleDelete={handleDelete}
          />
        </div>

        <div className="w-80">
          <div className=" bg-iris h-50 rounded-2xl shadow-md flex flex-col justify-between p-6 relative overflow-hidden font-quicksand">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-90 rounded-2xl"></div>

            {/* Text Content */}
            <div className="relative z-10 text-white font-semibold">
              <h1 className="text-lg leading-tight">
                See analytics of the Customer Clearly
              </h1>
            </div>

            {/* Button at Bottom */}
            <div className="relative z-10">
              <button className="w-32 h-12 flex items-center justify-center px-4 py-2 rounded-lg shadow bg-white/20 backdrop-blur-lg text-white">
                See Analytics
              </button>
            </div>
          </div>

          <div className="bg-white  rounded-2xl shadow-md">
            <div className="p-6 fit-content">
              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-900">Top Menu</h2>
              <h3 className="text-orange-500 font-bold text-xl">This Week</h3>
              <p className="text-gray-500 text-sm mt-1">10 - 12 Agustus 2023</p>

              {/* Top Item */}
              <div className="relative bg-white shadow-lg rounded-lg p-3 mt-4 flex items-start">
                <span className="absolute top-[-10px] right-[-10px] bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  1
                </span>
                <p className="text-black font-semibold">
                  Nasi Goreng Jamur Special Resto Pak Min
                </p>
              </div>

              {/* Other Menu Items */}
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>2. Tongseng Sapi Gurih</li>
                <li>3. Nasi Gudeg Telur Ceker</li>
                <li>4. Nasi Ayam Serundeng</li>
                <li>5. Nasi Goreng Seafood</li>
              </ul>
            </div>

            {/* Graph Design at Bottom */}
            <div className="w-full h-auto">
              <img
                src={vectorImage}
                alt="Graph"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Customer"
      >
        <CustomerForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Customer;
