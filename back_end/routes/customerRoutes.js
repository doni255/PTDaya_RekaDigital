const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer"); // ✅ Ensure correct import

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll({
      where: { deleted_at: null },
    });

    console.log("Customers from DB:", customers); // ✅ Debugging output

    if (!customers || customers.length === 0) {
      return res.status(200).json([]); // ✅ Always return an array
    }

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body); // Debugging incoming request

    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.address
    ) {
      return res
        .status(400)
        .json({ message: "Missing required fields", received: req.body });
    }

    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error("🚨 Database Error:", err); // Log full error to find issue

    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: err.errors.map((e) => e.message),
      });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Unique constraint error",
        errors: err.errors.map((e) => e.message),
      });
    }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

// router.post("/", async (req, res) => {
//   try {
//     console.log("📥 Incoming Data:", req.body); // ✅ Debugging

//     if (
//       !req.body.name ||
//       !req.body.email ||
//       !req.body.phone ||
//       !req.body.address
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Missing required fields", received: req.body });
//     }

//     const customer = await Customer.create(req.body);
//     res.status(201).json(customer);
//   } catch (err) {
//     console.error("🚨 Database Error:", err);

//     if (err.name === "SequelizeUniqueConstraintError") {
//       return res.status(400).json({
//         message: "Validation Error",
//         errors: err.errors.map((e) => e.message), // Extract specific validation errors
//       });
//     }

//     res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// });

module.exports = router; // ✅ Ensure router is exported
