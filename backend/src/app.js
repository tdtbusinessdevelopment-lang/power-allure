import express from "express";
import cors from "cors";
import helmetConfig from "./config/helmet.config.js";
import productRoutes from "./routes/productRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

// Security headers via Helmet
app.use(helmetConfig);

// CORS configuration with specific origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      process.env.FRONTEND_URL, // Production frontend URL
    ].filter(Boolean); // Remove undefined values
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Routes
app.use("/products", productRoutes);
app.use("/models", modelRoutes);
app.use("/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Backend API running"
  });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler - no stack traces in production
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.message || 'Internal server error',
  };
  
  // Only include stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  
  res.status(statusCode).json(response);
});

export default app;
