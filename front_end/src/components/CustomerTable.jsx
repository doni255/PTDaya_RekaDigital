import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const CustomerTable = ({ customers, status, error, handleDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-600 text-center">
          <th className="p-3 ">Customer Name</th>
          <th className="p-3 ">Level</th>
          <th className="p-3">Favorite Menu</th>
          <th className="p-3 ">Total Transaction</th>
          <th className="p-3 ">Actions</th>
        </tr>
      </thead>
      <tbody>
        {status === "loading" && (
          <tr>
            <td colSpan="5" className="text-center p-3">
              Loading...
            </td>
          </tr>
        )}
        {status === "failed" && (
          <tr>
            <td colSpan="5" className="text-center p-3 text-red-500">
              Error: {error}
            </td>
          </tr>
        )}
        {status === "succeeded" && customers.length > 0 ? (
          customers.map((customer, index) => (
            <tr key={index} className="border-b text-center">
              <td className="p-3">{customer.name}</td>
              <td className="p-3">{customer.level || "-"}</td>
              <td className="p-3">{customer.favoriteMenu || "-"}</td>
              <td className="p-3">{customer.transaction || 0}</td>
              <td className="p-3 flex space-x-3">
                <button className="text-blue-500 flex items-center">
                  <FaEye className="mr-1" /> Detail
                </button>
                <button className="text-yellow-500 flex items-center">
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  className="text-red-500 flex items-center"
                  onClick={() => handleDelete(customer.id)}
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center p-3">
              No customers found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CustomerTable;
