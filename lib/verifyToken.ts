import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Middleware to verify JWT token
export function verifyToken(
  req: NextRequest,
  res: NextResponse,
  next: () => void
) {
  const token = req.headers.get("Authorization"); // Get the token from the Authorization header
  if (!token) {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 }); // Return access denied if no token is present
  }

  try {
    const decoded = jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET || "your_secret_key"
    );
    // Verify and decode the token
    // @ts-ignore
    req.admin = decoded; // Attach the decoded admin data (from token) to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error); // Log the error
    return NextResponse.json({ message: "Invalid Token" }, { status: 401 }); // Return an invalid token error
  }
}
