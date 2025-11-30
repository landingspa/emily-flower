import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = registerSchema.parse(body)

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "Email đã được sử dụng" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        })

        return NextResponse.json(
            { message: "Đăng ký thành công", user },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Dữ liệu không hợp lệ", details: error },
                { status: 400 }
            )
        }

        console.error("Registration error:", error)
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi đăng ký" },
            { status: 500 }
        )
    }
}
