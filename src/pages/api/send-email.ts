import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the shape of the data we expect from the frontend
type EmailData = {
  name: string;
  email: string;
  phonenumber: string;
  subject: string;
  message: string;
};

// Define the API response format
type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests to this API route
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  // Destructure the expected data from the request body
  const { email, subject, message, phonenumber, name }: EmailData = req.body;

  // Basic validation to ensure required fields are present
  if (!email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Missing required fields: to, subject, or body.",
    });
  }

  try {
    // Send the email using the Resend API
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // You must replace this with a verified Resend domain
      to: ["albertbaisa@gmail.com"], // Replace with the recipient email address
      subject: subject,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                padding: 20px;
                background-color: #f4f4f4;
                box-sizing: border-box;
            }
            .card {
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                padding: 25px;
                max-width: 600px;
                margin: 0 auto;
                border: 1px solid #ddd;
            }
            .header {
                border-bottom: 2px solid #007bff;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .header h2 {
                margin: 0;
                color: #333;
                font-size: 24px;
            }
            .info-item {
                margin-bottom: 15px;
                line-height: 1.6;
            }
            .info-item strong {
                display: inline-block;
                color: #555;
                width: 120px;
            }
            .message {
                background-color: #f9f9f9;
                border-left: 4px solid #007bff;
                padding: 15px;
                margin-top: 20px;
                border-radius: 4px;
            }
            .message-title {
                font-weight: bold;
                color: #333;
                margin-bottom: 10px;
            }
            .message-content {
                color: #666;
                line-height: 1.6;
                white-space: pre-wrap;
            }
            hr {
                border: 0;
                border-top: 1px solid #eee;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <div class="card">
            <div class="header">
                <h2>Contact Inquiry</h2>
            </div>
            
            <div class="info-item">
                <strong>Name:</strong> ${name}
            </div>
            <div class="info-item">
                <strong>From:</strong> ${email}
            </div>
            <div class="info-item">
                <strong>Phone Number:</strong> ${phonenumber}
            </div>
            <div class="info-item">
                <strong>Subject:</strong> ${subject}
            </div>
            
            <hr />
            
            <div class="message">
                <p class="message-title">Message:</p>
                <p class="message-content">${message}</p>
            </div>
        </div>
    </div>

    </body>
    </html>
  `,
    });

    if (error) {
      // If the Resend API returns an error, log it and return a server error status
      console.error("Resend API Error:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to send email via Resend." });
    }

    // Return a success message if the email was sent
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    // Catch any other unexpected errors and return a server error
    console.error("Server Error:", err);
    res
      .status(500)
      .json({ success: false, error: "An unexpected server error occurred." });
  }
}
