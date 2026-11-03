import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // CORS Middleware for Mobile Browsers & Preflights
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    } else {
      res.setHeader("Access-Control-Allow-Origin", "*");
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Platinrein Backend", timestamp: new Date().toISOString() });
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, message } = req.body || {};
    
    // Strict Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Bitte geben Sie einen gültigen Namen ein (mindestens 2 Zeichen)."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
      });
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: "Bitte geben Sie eine aussagekräftige Nachricht ein (mindestens 5 Zeichen)."
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const trimmedMessage = message.trim();
    const timestampStr = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
    const apiKey = process.env.RESEND_API_KEY;
    
    console.log("=========================================");
    console.log(`[${timestampStr}] NEUE KONTAKTANFRAGE:`);
    console.log(`Name: ${trimmedName}`);
    console.log(`Email: ${trimmedEmail}`);
    if (trimmedPhone) console.log(`Telefon: ${trimmedPhone}`);
    console.log(`Nachricht:\n${trimmedMessage}`);
    console.log("=========================================");

    if (apiKey) {
      const resend = new Resend(apiKey);
      try {
        const { data, error } = await resend.emails.send({
          from: "Platinrein Kontakt <onboarding@resend.dev>", 
          to: ["info@platinrein.de"],
          replyTo: trimmedEmail,
          subject: `Neue Kontaktanfrage von ${trimmedName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border: 1px solid #eaeaea; border-radius: 8px;">
              <div style="border-bottom: 2px solid #0f0f0f; padding-bottom: 16px; margin-bottom: 24px;">
                <span style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #888888; font-weight: bold; display: block; margin-bottom: 4px;">Platinrein Gebäudeservice</span>
                <h1 style="color: #0f0f0f; font-size: 24px; font-weight: 300; margin: 0; letter-spacing: -0.02em;">Neue Kundenanfrage</h1>
              </div>
              
              <div style="background-color: #fafafa; border: 1px solid #f0f0f0; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #777777; width: 120px; font-weight: 500;">Name:</td>
                    <td style="padding: 6px 0; color: #0f0f0f; font-weight: 600;">${trimmedName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #777777; font-weight: 500;">E-Mail:</td>
                    <td style="padding: 6px 0;"><a href="mailto:${trimmedEmail}" style="color: #0f0f0f; text-decoration: underline;">${trimmedEmail}</a></td>
                  </tr>
                  ${trimmedPhone ? `
                  <tr>
                    <td style="padding: 6px 0; color: #777777; font-weight: 500;">Telefon:</td>
                    <td style="padding: 6px 0;"><a href="tel:${trimmedPhone}" style="color: #0f0f0f; text-decoration: underline;">${trimmedPhone}</a></td>
                  </tr>` : ""}
                  <tr>
                    <td style="padding: 6px 0; color: #777777; font-weight: 500;">Eingegangen:</td>
                    <td style="padding: 6px 0; color: #555555;">${timestampStr}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 30px;">
                <h2 style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #555555; margin-bottom: 10px;">Nachricht des Kunden:</h2>
                <div style="background-color: #fcfcfc; border-left: 3px solid #0f0f0f; padding: 16px 20px; color: #222222; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                  ${trimmedMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}
                </div>
              </div>

              <div style="text-align: center; margin-bottom: 24px;">
                <a href="mailto:${trimmedEmail}?subject=Re:%20Ihre%20Anfrage%20bei%20Platinrein%20Geb%C3%A4udeservice" style="display: inline-block; background-color: #0f0f0f; color: #ffffff; font-size: 12px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 28px; text-decoration: none; border-radius: 4px;">
                  Direkt antworten
                </a>
              </div>

              <div style="border-top: 1px solid #eaeaea; padding-top: 16px; font-size: 11px; color: #999999; text-align: center;">
                Diese E-Mail wurde über das Kontaktformular auf <a href="https://platinrein.de" style="color: #666666;">platinrein.de</a> generiert.
              </div>
            </div>
          `,
        });

        if (error) {
          console.error("Resend API Error:", error);
          // If Resend failed (e.g. trial restrictions), inform gracefully
          return res.status(502).json({ 
            success: false, 
            error: "Der E-Mail-Dienst meldete einen temporären Fehler. Bitte kontaktieren Sie uns direkt unter info@platinrein.de oder telefonisch unter +49 156 78332769.",
            code: "RESEND_ERROR",
            fallbackEmail: "info@platinrein.de"
          });
        }

        console.log("Email erfolgreich via Resend übermittelt:", data);
        return res.json({ 
          success: true, 
          message: "Vielen Dank! Ihre Nachricht wurde erfolgreich übermittelt. Wir melden uns zeitnah bei Ihnen." 
        });
      } catch (err: any) {
        console.error("Server Exception sending email:", err);
        return res.status(500).json({ 
          success: false, 
          error: "Beim Versenden ist ein technischer Fehler aufgetreten. Bitte schreiben Sie uns direkt an info@platinrein.de.",
          fallbackEmail: "info@platinrein.de"
        });
      }
    } else {
      console.warn("WARNUNG: RESEND_API_KEY ist nicht in den Umgebungsvariablen gesetzt. Die Anfrage wurde protokolliert.");
      // Inquiry is logged on the server.
      return res.json({ 
        success: true, 
        message: "Ihre Anfrage wurde erfolgreich aufgenommen. Wir werden uns umgehend mit Ihnen in Verbindung setzen." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
