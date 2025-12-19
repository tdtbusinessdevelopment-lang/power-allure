import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js';
import hashRoutes from './routes/hashRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/products", productRoutes);
app.use("/models", modelRoutes);
app.use("/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', hashRoutes);

export default app;
