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

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    const apiKey = process.env.RESEND_API_KEY;
    
    console.log("NEUE ANFRAGE ERHALTEN:");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    if (apiKey) {
      const resend = new Resend(apiKey);
      try {
        const { data, error } = await resend.emails.send({
          from: "Platinrein Kontakt <onboarding@resend.dev>", 
          to: ["info@platinrein.de"],
          replyTo: email,
          subject: `Neue Kontaktanfrage von ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
              <h2 style="color: #1A1A1A; border-bottom: 1px solid #eee; padding-bottom: 10px;">Neue Kontaktanfrage</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Nachricht:</strong></p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; color: #444;">
                ${message.replace(/\n/g, '<br/>')}
              </div>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999;">Gesendet über das Kontaktformular auf platinrein.de</p>
            </div>
          `,
        });

        if (error) {
          console.error("Resend API Error:", error);
          // If the error is about the domain not being verified, we inform the user
          return res.status(400).json({ 
            success: false, 
            error: error.message,
            code: "RESEND_ERROR"
          });
        }

        console.log("Email erfolgreich gesendet:", data);
        res.json({ success: true, message: "Email erfolgreich gesendet." });
      } catch (err) {
        console.error("Server Exception sending email:", err);
        res.status(500).json({ success: false, error: "Interner Serverfehler beim Senden der Email." });
      }
    } else {
      console.warn("WARNUNG: RESEND_API_KEY ist nicht in den Umgebungsvariablen gesetzt.");
      // For testing, if no API Key is present, we log it and return success: false with a clear message
      res.status(500).json({ 
        success: false, 
        error: "RESEND_API_KEY fehlt. Bitte fügen Sie den API Key in den Einstellungen hinzu." 
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
