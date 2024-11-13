import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/../../lib/verifyToken"; // Import JWT verification middleware
import AdminUser from "@/../../models/adminuser"; // Import the AdminUser model

// Ensure protected route is verified by the JWT token
export async function GET(req: NextRequest, res: NextResponse) {
  return new Promise((resolve) => {
    verifyToken(req, res, async () => {
      try {
        // Find the admin by primary key (ID) from the decoded JWT token
        // @ts-ignore
        const admin = await AdminUser.findByPk(req.admin.adminId);

        if (!admin) {
          return resolve(
            NextResponse.json({ message: "User not found" }, { status: 404 }) // If admin is not found, return a 404 error
          );
        }

        // If admin is found, return the admin details
        return resolve(NextResponse.json({ admin }, { status: 200 }));
      } catch (error) {
        console.error("Error finding admin:", error); // Log the error if any
        return resolve(
          NextResponse.json({ message: "Server Error" }, { status: 500 }) // Return a server error message
        );
      }
    });
  });
}
