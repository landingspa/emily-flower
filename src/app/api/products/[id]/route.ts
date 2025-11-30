import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const productUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    originalPrice: z.number().optional().nullable(),
    category: z.string().min(1).optional(),
    image: z.string().min(1).optional(), // Changed from url() to accept local paths
    images: z.array(z.string().min(1)).optional(), // Changed from url() to accept local paths
    tag: z.string().optional().nullable(),
    rating: z.number().min(0).max(5).optional(),
    reviews: z.number().min(0).optional(),
    inStock: z.boolean().optional(),
    featured: z.boolean().optional(),
})

// GET single product
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const product = await prisma.product.findUnique({
            where: { id },
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

        if (!product) {
            return NextResponse.json(
                { error: "Không tìm thấy sản phẩm" },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("Get product error:", error)
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi lấy thông tin sản phẩm" },
            { status: 500 }
        )
    }
}

// PUT update product (Admin only)
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params
        const body = await req.json()
        console.log("Update request body:", body)
        console.log("Product ID:", id)

        const validatedData = productUpdateSchema.parse(body)
        console.log("Validated data:", validatedData)

        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        })

        if (!existingProduct) {
            return NextResponse.json(
                { error: "Không tìm thấy sản phẩm" },
                { status: 404 }
            )
        }

        // If slug is being updated, check if it's already taken
        if (validatedData.slug && validatedData.slug !== existingProduct.slug) {
            const slugTaken = await prisma.product.findUnique({
                where: { slug: validatedData.slug },
            })

            if (slugTaken) {
                return NextResponse.json(
                    { error: "Slug đã tồn tại" },
                    { status: 400 }
                )
            }
        }

        // Filter out undefined values
        const updateData = Object.fromEntries(
            Object.entries(validatedData).filter(([_, value]) => value !== undefined)
        )

        console.log("Update data after filter:", updateData)

        const product = await prisma.product.update({
            where: { id },
            data: updateData,
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

        return NextResponse.json(product)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Dữ liệu không hợp lệ", details: error },
                { status: 400 }
            )
        }

        console.error("Update product error:", error)
        if (error instanceof Error) {
            console.error("Error message:", error.message)
            console.error("Error stack:", error.stack)
        }
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi cập nhật sản phẩm" },
            { status: 500 }
        )
    }
}

// DELETE product (Admin only)
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params
        // Check if product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id },
        })

        if (!existingProduct) {
            return NextResponse.json(
                { error: "Không tìm thấy sản phẩm" },
                { status: 404 }
            )
        }

        await prisma.product.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Xóa sản phẩm thành công" })
    } catch (error) {
        console.error("Delete product error:", error)
        return NextResponse.json(
            { error: "Có lỗi xảy ra khi xóa sản phẩm" },
            { status: 500 }
        )
    }
}
