import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: import.meta.env.CONTACT_EMAIL,
      subject: `Nieuw bericht van ${data.get("name")}`,
      html: `
        <h2>Nieuw contactbericht</h2>
        <p><strong>Naam:</strong> ${data.get("name")}</p>
        <p><strong>Email:</strong> ${data.get("email")}</p>
        <p><strong>Bericht:</strong> ${data.get("message")}</p>
      `
    })
  })

  return new Response(null, {
    status: 303,
    headers: { Location: "/succes" }
  })
}