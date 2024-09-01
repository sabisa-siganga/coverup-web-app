import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idNumber = searchParams.get("idNumber");

    if (!idNumber) {
      return NextResponse.json(
        { error: "ID Number is required" },
        { status: 400 }
      );
    }

    // Mock data
    const result = {
      fullName: "Mary Douglas",
      idNumber,
      dateOfBirth: "1995-08-01",
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
