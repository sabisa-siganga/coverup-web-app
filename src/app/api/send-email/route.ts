// pages/api/send-email.ts

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    // Extract JSON body from the request
    const body = await req.json();
    const {
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      enquiry,
      message,
    } = body;

    // Create a transporter using nodemailer and environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"${firstName} ${lastName}" <${emailAddress}>`, // sender address
      to: "info@coverupquotes.co.za", // list of receivers
      subject: `New Enquiry from ${firstName} ${lastName}`, // Subject line
      html: `
        <h1>Contact Us Form Submission</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Contact Number:</strong> ${contactNumber}</p>
        <p><strong>Email Address:</strong> ${emailAddress}</p>
        <p><strong>Enquiry:</strong> ${enquiry}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return the success response with status 200
    return NextResponse.json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    // Return an error response with status 500
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
