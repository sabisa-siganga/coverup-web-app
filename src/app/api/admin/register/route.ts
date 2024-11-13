import AdminUser from "@/../../models/adminuser";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        {
          message: "Endpoint not found",
        },
        {
          status: 404,
        }
      );
    }

    const { email, firstName, lastName, password } = await req.json();

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = await AdminUser.create({
      email,
      firstName,
      lastName,
      password: hash,
    });

    return NextResponse.json(
      {
        message: "Successfully added the admin user",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error adding the admin:", error);
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
