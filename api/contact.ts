// Vercel-Funktion für das Kontaktformular (auf checkdomain übernimmt das public/api/contact.php).
// Benötigt in Vercel die Umgebungsvariable RESEND_API_KEY, optional RESEND_FROM (Absender einer bei Resend bestätigten Domain).

const TO = "info@platinrein.de";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8" } });

const fallback = (error: string, status: number) =>
  json({ success: false, error, fallbackEmail: TO }, status);

export async function POST(request: Request): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return fallback("Ungültige Anfrage.", 400);
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (name.length < 2) return fallback("Bitte geben Sie einen gültigen Namen ein.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fallback("Bitte geben Sie eine gültige E-Mail-Adresse ein.", 400);
  if (message.length < 5) return fallback("Bitte geben Sie eine aussagekräftige Nachricht ein (mindestens 5 Zeichen).", 400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fallback("Das Formular ist gerade nicht erreichbar. Bitte schreiben Sie uns direkt an info@platinrein.de oder per WhatsApp.", 503);
  }

  const time = new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #0f0f0f;">
      <h2 style="font-weight: 400;">Neue Kundenanfrage über platinrein.de</h2>
      <p><b>Name:</b> ${escapeHtml(name)}<br/>
      <b>E-Mail:</b> ${escapeHtml(email)}<br/>
      ${phone ? `<b>Telefon:</b> ${escapeHtml(phone)}<br/>` : ""}
      <b>Eingegangen:</b> ${time}</p>
      <p style="white-space: pre-wrap; border-left: 3px solid #0f0f0f; padding-left: 12px;">${escapeHtml(message)}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || "Platinrein Webseite <onboarding@resend.dev>",
      to: [TO],
      reply_to: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend-Fehler", res.status, await res.text());
    return fallback("Der E-Mail-Dienst meldete einen Fehler. Bitte schreiben Sie uns direkt an info@platinrein.de oder rufen Sie an: 0156 78332769.", 502);
  }

  return json({ success: true, message: "Vielen Dank! Ihre Nachricht wurde übermittelt. Wir melden uns zeitnah bei Ihnen." });
}
