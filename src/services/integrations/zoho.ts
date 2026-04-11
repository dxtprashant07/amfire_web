/**
 * Zoho CRM API helper.
 *
 * Required env vars:
 *   ZOHO_CLIENT_ID
 *   ZOHO_CLIENT_SECRET
 *   ZOHO_REFRESH_TOKEN   (obtained once via OAuth flow)
 *   ZOHO_API_DOMAIN       (default: https://www.zohoapis.in for India DC)
 *   ZOHO_ACCOUNTS_URL     (default: https://accounts.zoho.in)
 */

const ZOHO_API_DOMAIN = process.env.ZOHO_API_DOMAIN ?? "https://www.zohoapis.in";
const ZOHO_ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL ?? "https://accounts.zoho.in";

let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

/** Get a fresh Zoho access token using the refresh token grant */
async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho CRM credentials not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN.");
  }

  const params = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
  });

  const res = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token?${params.toString()}`, {
    method: "POST",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoho token refresh failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000; // refresh 60s early
  return cachedAccessToken!;
}

/** Create a Lead in Zoho CRM from contact form submission */
export async function createZohoLead(lead: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source?: string;
}) {
  const token = await getAccessToken();

  const body = {
    data: [
      {
        Last_Name: lead.name,
        Email: lead.email,
        Phone: lead.phone || null,
        Company: lead.company || "Not provided",
        Description: lead.message || "",
        Lead_Source: lead.source || "Website",
        // Custom fields — create these in Zoho CRM settings
        Service_Interest: lead.service || null,
        Budget_Range: lead.budget || null,
        Timeline: lead.timeline || null,
      },
    ],
  };

  const res = await fetch(`${ZOHO_API_DOMAIN}/crm/v6/Leads`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Zoho create lead failed:", res.status, text);
    throw new Error(`Zoho API error: ${res.status}`);
  }

  return res.json();
}

/** Fetch deals/projects for a specific contact email from Zoho */
export async function getZohoDealsForContact(email: string) {
  const token = await getAccessToken();

  // Search for contact by email
  const searchRes = await fetch(
    `${ZOHO_API_DOMAIN}/crm/v6/Contacts/search?email=${encodeURIComponent(email)}`,
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );

  if (!searchRes.ok || searchRes.status === 204) return [];

  const contacts = await searchRes.json();
  const contactId = contacts.data?.[0]?.id;
  if (!contactId) return [];

  // Get deals related to this contact
  const dealsRes = await fetch(
    `${ZOHO_API_DOMAIN}/crm/v6/Contacts/${contactId}/Deals`,
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );

  if (!dealsRes.ok || dealsRes.status === 204) return [];

  const deals = await dealsRes.json();
  return deals.data || [];
}

/** Check if Zoho is configured */
export function isZohoConfigured(): boolean {
  return !!(process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET && process.env.ZOHO_REFRESH_TOKEN);
}
