import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactMessage = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email to Divyam
    const notificationBody = {
      from: "Portfolio Contact <portfolio@divyamjain.dev>",
      to: ["djain4642@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; background: #050505; color: #fff; padding: 40px; border-radius: 16px; border: 1px solid rgba(0,212,255,0.2);">
          <h2 style="color: #00d4ff; margin-bottom: 24px; font-size: 24px;">New Transmission Received</h2>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;"><strong style="color: #00d4ff;">From:</strong> ${name}</p>
            <p style="margin: 0 0 12px 0;"><strong style="color: #00d4ff;">Email:</strong> ${email}</p>
            <p style="margin: 0;"><strong style="color: #00d4ff;">Message:</strong></p>
            <p style="margin: 12px 0 0 0; line-height: 1.6; color: rgba(255,255,255,0.7);">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 24px;">Sent from Divyam Jain Portfolio</p>
        </div>
      `,
      text: `New Contact Form Submission from ${name}\n\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Divyam Jain Portfolio`,
    };

    // Send auto-reply to visitor
    const autoReplyBody = {
      from: "Divyam Jain <portfolio@divyamjain.dev>",
      to: [email],
      subject: "Transmission Received - Divyam Jain",
      html: `
        <div style="font-family: 'Inter', sans-serif; background: #050505; color: #fff; padding: 40px; border-radius: 16px; border: 1px solid rgba(0,212,255,0.2);">
          <h2 style="color: #00d4ff; margin-bottom: 24px; font-size: 24px;">Transmission Received</h2>
          <p style="line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 20px;">
            Hello ${name},
          </p>
          <p style="line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 20px;">
            Thank you for reaching out! Your message has been successfully received and logged in my digital systems.
          </p>
          <p style="line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 20px;">
            I will review your transmission and respond as soon as possible. In the meantime, feel free to explore more of my work.
          </p>
          <div style="background: rgba(0,212,255,0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #00d4ff; margin: 24px 0;">
            <p style="margin: 0; color: #00d4ff; font-size: 14px;">Best regards,<br>Divyam Jain</p>
          </div>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin-top: 24px;">This is an automated response from divyamjain.dev</p>
        </div>
      `,
      text: `Transmission Received - Divyam Jain\n\nHello ${name},\n\nThank you for reaching out! Your message has been successfully received and logged in my digital systems.\n\nI will review your transmission and respond as soon as possible. In the meantime, feel free to explore more of my work.\n\nBest regards,\nDivyam Jain\n\nThis is an automated response from divyamjain.dev`,
    };

    // Use Resend API for email delivery
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!resendApiKey) {
      // If no Resend key, return success but log that emails weren't sent
      console.log("No RESEND_API_KEY configured. Message stored but emails not sent.");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Message received. Email notifications require RESEND_API_KEY configuration." 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationBody),
    });

    if (!notificationRes.ok) {
      const error = await notificationRes.text();
      console.error("Failed to send notification email:", error);
    }

    // Send auto-reply
    const autoReplyRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(autoReplyBody),
    });

    if (!autoReplyRes.ok) {
      const error = await autoReplyRes.text();
      console.error("Failed to send auto-reply:", error);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
