import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "@/../../lib/db"; // Importing the Sequelize instance
import AdminUser from "@/../../models/adminuser"; // Importing the AdminUser model

// Secret used for JWT (token-based authentication)
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// Login API route
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json(); // Extract email and password from the request body

    // Find the admin by email in the database
    const admin = await AdminUser.findOne({ where: { email } });

    // Check if the admin exists
    if (!admin) {
      return NextResponse.json(
        { message: "Incorrect Email or Password" },
        { status: 400 }
      );
    }

    // Check if the password is valid using bcrypt
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect Email or Password" },
        { status: 400 }
      );
    }

    // Generate JWT token if the credentials are valid
    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, {
      expiresIn: "30d", // Token will expire after 30 days
    });

    // Send the token back to the client
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error); // Log the error for debugging
    return NextResponse.json({ message: "Server Error" }, { status: 500 }); // Return a server error message
  }
}
