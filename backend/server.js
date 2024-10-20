const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Authentication routes should come first
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Serve static files from the uploads directory
//app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
