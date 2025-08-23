const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { connectDB } = require('./connection');

const authRoutes = require("./routes/authRoutes");
const popupRoutes = require("./routes/PopupRouter");
const contactRoutes = require("./routes/contactRoutes");
const janArogyaRoutes = require("./routes/janArogyaRoutes");
const ambulanceRoutes = require("./routes/ambulanceBookingRoutes");
const applyInsurance = require('./routes/applyInsuranceRoutes');
const applyKendra = require('./routes/janArogyaApplyRoutes');
const statesRouter = require("./routes/statesRouter");
const userRoutes = require("./routes/userProfile");
const employeeRoutes = require("./routes/employeeRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashBoardRoutes=require("./routes/dashBoardRoutes")
const profileRoutes=require("./routes/profileRoutes")
const app = express();
const PORT = process.env.PORT || 8000;



const allowedOrigins = ["http://localhost:3000", "http://localhost:3001","https://admindashboard-hpl6.vercel.app","https://frontend-u85h.vercel.app"];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
app.use(express.json());
app.options("*", cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploads

// DB Connection
connectDB();

// Routes
app.use("/api/popup", popupRoutes);
app.use("/api/states", statesRouter);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services/janarogya", janArogyaRoutes);
app.use("/api/services/ambulance-booking", ambulanceRoutes);
app.use("/api/services/apply-insurance", applyInsurance);
app.use("/api/services/apply-kendra", applyKendra);
app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin",dashBoardRoutes)

app.use("/api/u",profileRoutes)
// Start server

// Debug: list all registered routes
function printRoutes(app) {
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Routes directly on app
      console.log("Route:", middleware.route.path);
    } else if (middleware.name === "router") {
      // Router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          console.log("Route:", handler.route.path);
        }
      });
    }
  });
}

printRoutes(app);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
