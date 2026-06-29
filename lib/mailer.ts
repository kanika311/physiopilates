import nodemailer from "nodemailer";

/**
 * SMTP mail service. Configure these in `.env`:
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=587
 *   SMTP_USER=your@email.com
 *   SMTP_PASS=app-password
 *   SMTP_FROM="Physio Pilates <your@email.com>"  (optional, defaults to SMTP_USER)
 */
function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS in .env"
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587/STARTTLS
    auth: { user, pass },
  });
}

type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export async function sendMail({ to, subject, html, text }: SendMailArgs) {
  const transport = getTransport();
  const from =
    process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@localhost";

  await transport.sendMail({ from, to, subject, html, text });
}

export function passwordResetEmail(resetUrl: string) {
  const subject = "Reset your Physio Pilates admin password";
  const text = `We received a request to reset your admin password.\n\nReset it using this link (valid for 1 hour):\n${resetUrl}\n\nIf you didn't request this, you can safely ignore this email.`;
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#f6fbfa;border-radius:16px;color:#12344d">
    <h2 style="margin:0 0 8px;color:#0f766e">Reset your password</h2>
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6">
      We received a request to reset your Physio Pilates admin password.
      Click the button below to choose a new one. This link is valid for
      <strong>1 hour</strong>.
    </p>
    <a href="${resetUrl}"
       style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 28px;border-radius:9999px;font-size:15px">
      Reset Password
    </a>
    <p style="margin:24px 0 0;color:#94a3b8;font-size:13px;line-height:1.6">
      If the button doesn't work, copy and paste this link into your browser:<br/>
      <span style="color:#0f766e;word-break:break-all">${resetUrl}</span>
    </p>
    <p style="margin:20px 0 0;color:#94a3b8;font-size:13px">
      If you didn't request a password reset, you can safely ignore this email.
    </p>
  </div>`;
  return { subject, text, html };
}
