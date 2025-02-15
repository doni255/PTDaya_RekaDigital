import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../features/customerSlice";

const CustomerForm = ({ onClose }) => {
  const dispatch = useDispatch();

  // Local state for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "phone" ? String(value).replace(/\s/g, "") : value, // Ensure phone is string & remove spaces
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors before new submission

    try {
      await dispatch(createCustomer(formData)).unwrap();
      setFormData({ name: "", email: "", phone: "", address: "" }); // Reset form
      setErrorMessage(""); // Clear errors on success
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("🚨 Error adding customer:", error);

      if (typeof error === "string") {
        setErrorMessage(error); // Directly use error message if it's a string
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Phone"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        placeholder="Enter Address"
        required
      />

      {/* Display error message if exists */}
      {errorMessage && (
        <div className="p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
          ❌{" "}
          {typeof errorMessage === "object"
            ? JSON.stringify(errorMessage)
            : errorMessage}
        </div>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-400"
        >
          Add Customer
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
