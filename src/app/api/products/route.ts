import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const productSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    price: z.number(),
    originalPrice: z.number().optional().nullable(),
    category: z.string().min(1),
    image: z.string().min(1), // Changed from url() to accept local paths
    images: z.array(z.string().min(1)).optional(), // Changed from url() to accept local paths
    tag: z.string().optional().nullable(),
    rating: z.number().min(0).max(5).optional(),
    reviews: z.number().min(0).optional(),
    inStock: z.boolean().optional(),
    featured: z.boolean().optional(),
})

// GET all products
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const category = searchParams.get("category")
        const featured = searchParams.get("featured")
        const search = searchParams.get("search")

        const where: any = {}

        if (category && category !== "Tất cả") {
            where.category = category
        }

        if (featured === "true") {
            where.featured = true
        }

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ]
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error("Get products error:", error)
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi lấy danh sách sản phẩm" },
            { status: 500 }
        )
    }
}

// POST create new product (Admin only)
export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json(
                { error: "Bạn cần đăng nhập" },
                { status: 401 }
            )
        }

        if (session.user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Bạn không có quyền thực hiện hành động này" },
                { status: 403 }
            )
        }

        const body = await req.json()
        const validatedData = productSchema.parse(body)

        // Check if slug already exists
        const existingProduct = await prisma.product.findUnique({
            where: { slug: validatedData.slug },
        })

        if (existingProduct) {
            return NextResponse.json(
                { error: "Slug đã tồn tại" },
                { status: 400 }
            )
        }

        const product = await prisma.product.create({
            data: {
                ...validatedData,
                images: validatedData.images || [],
                createdById: session.user.id,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Dữ liệu không hợp lệ", details: error },
                { status: 400 }
            )
        }

        console.error("Create product error:", error)
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi tạo sản phẩm" },
            { status: 500 }
        )
    }
}
