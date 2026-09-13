import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function serveStatic(rootDir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(rootDir, decodeURIComponent(req.url.split("?")[0]));
      if (filePath.endsWith("/")) filePath = path.join(filePath, "index.html");

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        res.end(content);
      });
    });

    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  const publicDir = path.join(__dirname, "../public");
  const outputPath = path.join(publicDir, "resume.pdf");

  if (!fs.existsSync(path.join(publicDir, "resume", "index.html"))) {
    console.log("public/resume/index.html not found, skipping resume.pdf generation");
    return;
  }

  const server = await serveStatic(publicDir);
  const port = server.address().port;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/resume/`, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPath,
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log("Generated resume.pdf");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error("Error generating resume.pdf:", error);
  process.exit(1);
});
