const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
// Serve static files from the uploads directory
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());

// Authentication routes should come first
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);
app.use("/api/chapters", chapterRoutes);

app.use("/api/enrollments", enrollmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
