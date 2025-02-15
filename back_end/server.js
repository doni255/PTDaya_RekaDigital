require("dotenv").config();
const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(cors());
app.use(express.json()); // ✅ This must be here
app.use(express.urlencoded({ extended: true })); // ✅ Allows form submissions

app.use("/api/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
