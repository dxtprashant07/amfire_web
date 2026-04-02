import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || "");
  }
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL || "amfire <noreply@amfire.in>";

/** Send welcome email with login credentials to a newly created user */
export async function sendWelcomeEmail({
  to,
  name,
  email,
  password,
  role,
}: {
  to: string;
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://amfire.in";
  const portalUrl = role === "CLIENT" ? `${baseUrl}/login` : `${baseUrl}/login`;
  const portalLabel = role === "CLIENT" ? "Client Portal" : "Admin Dashboard";

  await getResend().emails.send({
    from: FROM,
    to,
    subject: `Welcome to amfire — Your ${portalLabel} Credentials`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px;">
        <h2 style="color: #1a1a1a; font-size: 22px; margin-bottom: 8px;">Welcome to amfire, ${name}!</h2>
        <p style="color: #666; font-size: 15px; line-height: 1.7;">
          Your ${portalLabel} account has been created. Use the credentials below to log in:
        </p>

        <div style="background: #f9f9f9; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #eee;">
          <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Email</p>
          <p style="margin: 0 0 16px; font-size: 15px; color: #1a1a1a; font-weight: 600;">${email}</p>
          <p style="margin: 0 0 8px; font-size: 14px; color: #666;">Password</p>
          <p style="margin: 0; font-size: 15px; color: #1a1a1a; font-weight: 600;">${password}</p>
        </div>

        <a href="${portalUrl}" style="display: inline-block; background: linear-gradient(135deg, hsl(5,77%,57%), hsl(25,87%,58%)); color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 14px; font-weight: 600;">
          Log in to ${portalLabel}
        </a>

        <p style="color: #999; font-size: 13px; margin-top: 32px; line-height: 1.6;">
          For security, please change your password after your first login.<br/>
          If you did not expect this email, please contact <a href="mailto:contact@amfire.in" style="color: #F97316;">contact@amfire.in</a>.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #bbb; font-size: 12px;">amfire — AI-First Digital Solutions</p>
      </div>
    `,
  });
}
