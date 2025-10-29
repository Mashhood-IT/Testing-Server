// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import app from './src/app.js';
import connectDB from './src/config/db.js';
import { createSuperAdmin } from './src/utils/createSuperAdmin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Ensure uploads dir
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

// Static files (serve both /uploads and legacy /api/uploads)
app.use(
  '/uploads',
  cors(),
  express.static(uploadsPath, {
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  })
);
app.use('/api/uploads', cors(), express.static(uploadsPath)); // 👈 alias for old URLs

const start = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');

    await createSuperAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📁 Serving uploads from: ${uploadsPath}`);
    });
  } catch (err) {
    console.error('❌ Error starting server:', err.message);
    process.exit(1);
  }
};
start();
