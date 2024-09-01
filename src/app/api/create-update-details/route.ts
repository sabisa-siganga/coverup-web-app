import { NextRequest, NextResponse } from "next/server";

interface User {
  idNumber: string;
  address: string;
  email: string;
  phone: string;
  region: string;
  payment: string;
  cover: string;
  status: string;
}

// Mock database (for demonstration purposes)
let users: User[] = [
  {
    idNumber: "1234567890123",
    address: "123 Main St",
    email: "john@example.com",
    phone: "1234567890",
    region: "Region1",
    payment: "Payment1",
    cover: "Cover1",
    status: "",
  },
  // Add more users as needed
];

export async function POST(req: NextRequest) {
  try {
    const { idNumber, address, email, phone, region, payment, cover, status } =
      await req.json();

    // Validate required fields
    if (
      !idNumber ||
      !address ||
      !email ||
      !phone ||
      !region ||
      !payment ||
      !cover ||
      !status
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user with idNumber exists
    const user = users.find((user) => user.idNumber === idNumber);

    if (user) {
      // Update user details
      user.address = address;
      user.email = email;
      user.phone = phone;
      user.region = region;
      user.payment = payment;
      user.cover = cover;
      user.status = status;

      return NextResponse.json({
        message: "User details updated successfully",
        user,
      });
    } else {
      // Create new user
      const newUser: User = {
        idNumber,
        address,
        email,
        phone,
        region,
        payment,
        cover,
        status,
      };
      users.push(newUser);

      return NextResponse.json(
        { message: "User created successfully", user: newUser },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
