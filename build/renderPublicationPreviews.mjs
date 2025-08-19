import { pdfToPng } from "pdf-to-png-converter";
import fs from "node:fs/promises";
import { createWriteStream, unlink } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";
import os from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to download a file
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https:") ? https : http;

    const file = createWriteStream(outputPath);

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });

        file.on("error", (err) => {
          unlink(outputPath, () => {}); // Delete the file if it exists
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Function to parse frontmatter from markdown file
function parseFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const resourcesMatch = frontmatter.match(
    /resources:\s*\n((?:\s*-\s*name:\s*"[^"]*"\s*\n\s*url:\s*"[^"]*"\s*\n?)*)/
  );

  if (!resourcesMatch) return null;

  const resourcesText = resourcesMatch[1];
  const resources = [];

  // Parse each action
  const resourceMatches = resourcesText.matchAll(
    /\s*-\s*name:\s*"([^"]*)"\s*\n\s*url:\s*"([^"]*)"/g
  );

  for (const match of resourceMatches) {
    resources.push({
      name: match[1],
      url: match[2],
    });
  }

  return resources;
}

async function main() {
  const publicationsDir = path.join(__dirname, "../content/publications");
  const uploadsDir = path.join(__dirname, "../static/uploads");
  const previewDir = path.join(__dirname, "../static/images/publications");
  const tempDir = path.join(os.tmpdir(), "publication-previews");

  try {
    // Ensure directories exist
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.mkdir(previewDir, { recursive: true });
    await fs.mkdir(tempDir, { recursive: true });

    // Read all markdown files in publications directory
    const files = await fs.readdir(publicationsDir);
    const mdFiles = files.filter((file) => file.endsWith(".md"));

    console.log(`Found ${mdFiles.length} publication files`);

    for (const file of mdFiles) {
      const filePath = path.join(publicationsDir, file);
      const content = await fs.readFile(filePath, "utf-8");

      const resources = parseFrontmatter(content);
      if (!resources) {
        console.log(`No resources found in ${file}`);
        continue;
      }

      // Look for Document resource
      const documentResource = resources.find(
        (resource) => resource.name === "Document"
      );

      if (!documentResource) {
        console.log(`No Document resource found in ${file}`);
        continue;
      }

      const url = documentResource.url;
      let pdfPath;
      let pdfFileName;

      // Check if it's a local PDF file
      if (url.startsWith("/uploads/")) {
        pdfFileName = url.replace("/uploads/", "");
        pdfPath = path.join(uploadsDir, pdfFileName);

        // Check if PDF file exists
        try {
          await fs.access(pdfPath);
        } catch (error) {
          console.log(`PDF file not found: ${pdfPath}`);
          continue;
        }
      } else {
        // It's an external URL, download the PDF to temp directory
        console.log(`Downloading PDF from: ${url}`);

        // Extract filename from URL or use a default
        const urlParts = url.split("/");
        pdfFileName = urlParts[urlParts.length - 1] || "downloaded.pdf";

        // Ensure it has .pdf extension
        if (!pdfFileName.endsWith(".pdf")) {
          pdfFileName += ".pdf";
        }

        pdfPath = path.join(tempDir, pdfFileName);

        try {
          await downloadFile(url, pdfPath);
          console.log(`✓ Downloaded: ${pdfFileName}`);
        } catch (error) {
          console.error(`✗ Failed to download ${url}:`, error.message);
          continue;
        }
      }

      // Generate preview
      const mdBaseName = path.parse(file).name; // Use markdown filename
      const outputFile = path.join(previewDir, `${mdBaseName}.png`);

      console.log(`Generating preview for ${pdfFileName}...`);

      try {
        const pageToProcess = 1;
        // const pageToProcess = url.includes("hal.science") ? 2 : 1;
        const pages = await pdfToPng(pdfPath, {
          pagesToProcess: [pageToProcess],
          strictPagesToProcess: true,
          viewportScale: 2.0,
        });

        if (pages.length > 0) {
          const page = pages[0];
          await fs.writeFile(outputFile, page.content);
          console.log(
            `✓ Generated preview: images/publications/${mdBaseName}.png`
          );
        } else {
          console.error(`✗ No pages returned for ${pdfFileName}`);
        }
      } catch (error) {
        console.error(
          `✗ Error generating preview for ${pdfFileName}:`,
          error.message
        );
      }
    }

    // Clean up temporary directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
      console.log("✓ Cleaned up temporary files");
    } catch (error) {
      console.log("Note: Could not clean up temporary directory");
    }

    console.log("Preview generation complete!");
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();
