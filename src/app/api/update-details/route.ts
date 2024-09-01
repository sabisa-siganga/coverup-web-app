import { NextRequest, NextResponse } from "next/server";

// Mock database (for demonstration purposes)
let users = [
  {
    id: 1,
    idNumber: "1234567890123",
    fullName: "John Doe",
    dateOfBirth: "1980-06-20",
  },
  // Add more users as needed
];

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { idNumber, fullName, dateOfBirth } = await req.json();

  // Find user by ID
  let user = users.find((user) => user.id === parseInt(id as string, 10));

  if (user) {
    // Update user details if found
    user.idNumber = idNumber || user.idNumber;
    user.fullName = fullName || user.fullName;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    return NextResponse.json(
      {
        message: "User details updated successfully",
        user,
      },
      { status: 200 }
    );
  } else {
    // Create new user if not found
    user = {
      id: users.length + 1, // Generate a new ID
      idNumber,
      fullName,
      dateOfBirth,
    };
    users.push(user);

    return NextResponse.json(
      {
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  }
}
