const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Customer = sequelize.define("Customer", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: true, // ✅ Ensure timestamps are enabled
  createdAt: "created_at", // ✅ Define custom column names if needed
  updatedAt: "updated_at",
});

module.exports = Customer;
