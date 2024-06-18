const app = require("express").Router();
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

app.get("/", (req, res) => {
  res.send("Inside animalize route.");
});

app.get("/report", async (req, res) => {
  let host = process.env.HOST;
  let id = req.query.id || "DLYGI1UQ3K";
  let redirect = req.query.redirect || "false";
  const dir = "public";
  const file = path.join(dir, `animalize-report-${id}.pdf`);

  let diskLocation = "";

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  if (fs.existsSync(file)) {
    diskLocation = `${host}/${file}`;
  } else {
    let url = `https://animalize.io/final-report/${id}/scrape`;
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    await page.pdf({
      path: file,
      printBackground: true,
      format: "A4",
    });
    await browser.close();
    diskLocation = `${host}/${file}`;
  }

  if (redirect === "true") return res.redirect(diskLocation);
  res.json({
    success: true,
    message: "PDF generated successfully.",
    data: {
      url: diskLocation,
    },
  });
});

app.get("/invoice", async (req, res) => {
  let host = process.env.HOST;
  let id = req.query.id || "DLYGI1UQ3K";
  let redirect = req.query.redirect || "false";
  const dir = "public";
  const file = path.join(dir, `animalize-invoice-${id}.pdf`);

  let diskLocation = "";

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  if (fs.existsSync(file)) {
    diskLocation = `${host}/${file}`;
  } else {
    let url = `https://animalize.io/invoice/${id}/scrape`;
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    await page.pdf({
      path: file,
      printBackground: true,
      format: "A4",
    });
    await browser.close();
    diskLocation = `${host}/${file}`;
  }

  if (redirect === "true") return res.redirect(diskLocation);
  res.json({
    success: true,
    message: "PDF generated successfully.",
    data: {
      url: diskLocation,
    },
  });
});

module.exports = app;
