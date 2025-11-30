import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, WebP and GIF are allowed." },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File size exceeds 5MB limit" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, "-");
        const extension = path.extname(originalName);
        const nameWithoutExt = path.basename(originalName, extension);
        const filename = `${nameWithoutExt}-${timestamp}${extension}`;

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        // Save file
        const filepath = path.join(uploadsDir, filename);
        await writeFile(filepath, buffer);

        // Return URL
        const url = `/uploads/${filename}`;

        return NextResponse.json({
            success: true,
            url,
            filename,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}

// Delete uploaded image
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth();
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const filename = searchParams.get("filename");

        if (!filename) {
            return NextResponse.json(
                { error: "Filename is required" },
                { status: 400 }
            );
        }

        const filepath = path.join(process.cwd(), "public", "uploads", filename);

        if (existsSync(filepath)) {
            const { unlink } = await import("fs/promises");
            await unlink(filepath);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting file:", error);
        return NextResponse.json(
            { error: "Failed to delete file" },
            { status: 500 }
        );
    }
}
