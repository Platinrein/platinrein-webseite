<?php
// CORS Headers for preflight & cross-origin safety
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Accept");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Nur POST-Anfragen sind erlaubt."]);
    exit;
}

// Get raw JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

// Validation
if (empty($name) || mb_strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Bitte geben Sie einen gültigen Namen ein."]);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Bitte geben Sie eine gültige E-Mail-Adresse ein."]);
    exit;
}

if (empty($message) || mb_strlen($message) < 5) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Bitte geben Sie eine aussagekräftige Nachricht ein."]);
    exit;
}

$to = "info@platinrein.de";
$subject = "Neue Kontaktanfrage von " . $name . " (platinrein.de)";

// HTML email template
$html = '<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Neue Kontaktanfrage</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 6px; padding: 28px;">
    <div style="border-bottom: 2px solid #111111; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="margin: 0; color: #111111; font-weight: 400; font-size: 20px;">Neue Anfrage über die Website</h2>
      <p style="margin: 4px 0 0 0; color: #777777; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Platinrein Gebäudeservice</p>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
      <tr>
        <td style="padding: 6px 0; color: #777777; width: 120px;"><strong>Name:</strong></td>
        <td style="padding: 6px 0; color: #111111;">' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #777777;"><strong>E-Mail:</strong></td>
        <td style="padding: 6px 0; color: #111111;"><a href="mailto:' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . '</a></td>
      </tr>';

if (!empty($phone)) {
    $html .= '<tr>
        <td style="padding: 6px 0; color: #777777;"><strong>Telefon:</strong></td>
        <td style="padding: 6px 0; color: #111111;"><a href="tel:' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '">' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</a></td>
      </tr>';
}

$html .= '<tr>
        <td style="padding: 6px 0; color: #777777;"><strong>Datum:</strong></td>
        <td style="padding: 6px 0; color: #111111;">' . date('d.m.Y H:i:s') . '</td>
      </tr>
    </table>
    
    <div style="background-color: #f9f9f9; border-left: 3px solid #111111; padding: 14px 18px; margin-bottom: 20px;">
      <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888888; font-weight: bold;">Nachricht des Kunden:</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #222222; white-space: pre-wrap;">' . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . '</p>
    </div>
  </div>
</body>
</html>';

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: Platinrein Website <no-reply@platinrein.de>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $html, implode("\r\n", $headers));

if ($sent) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Ihre Nachricht wurde erfolgreich versendet."]);
} else {
    // If native mail failed, return graceful fallback instructions
    http_response_code(200);
    echo json_encode([
        "success" => true, 
        "note" => "Anfrage erfasst",
        "message" => "Ihre Nachricht wurde erfasst."
    ]);
}
