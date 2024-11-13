import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

interface File {
  size: number;
  type: string;
  name: string;
  lastModified: string;
  arrayBuffer(): Promise<ArrayBuffer>;
}

// Set the maximum file size to 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed MIME types for file uploads
const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "application/pdf",
  "application/msword",
];

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData = await req.formData();

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  //   Check file type
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File size exceeds 5MB limit" },
      { status: 400 }
    );
  }

  //   check file type
  if (!allowedMimeTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file format." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.replaceAll(" ", "_");
  const filePath = "uploads/" + fileName;

  try {
    await writeFile(path.join(process.cwd(), "public/" + filePath), buffer);

    return NextResponse.json({
      message: "Success",
      status: 201,
      filePath,
      fileName,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};
