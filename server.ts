import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.resolve(process.cwd(), 'dist');

// Middleware
app.use(express.json());

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static assets from dist
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SPA fallback: return index.html for all client-side routes
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head><title>SR Mart</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
          <h2>SR Mart is loading...</h2>
          <p>Please run build to compile production assets.</p>
        </body>
      </html>
    `);
  }
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`SR Mart production server listening on http://0.0.0.0:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
