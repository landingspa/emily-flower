import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Parse DATABASE_URL
const dbUrl = new URL(process.env.DATABASE_URL || "");
const password = decodeURIComponent(dbUrl.password);

console.log("🔍 Connecting to database...");
console.log("  Host:", dbUrl.hostname);
console.log("  Port:", dbUrl.port);
console.log("  Database:", dbUrl.pathname.slice(1));
console.log("  User:", dbUrl.username);

// Create Pool for adapter
const pool = new Pool({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port),
    database: dbUrl.pathname.slice(1),
    user: dbUrl.username,
    password: password,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@emilyflower.com" },
        update: {},
        create: {
            email: "admin@emilyflower.com",
            name: "Admin Emily",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("✅ Admin user created:", admin.email);

    // Create sample products
    const products = [
        {
            name: "Hoa hồng sáp hộp tim",
            slug: "hoa-hong-sap-hop-tim",
            description: "Hoa hồng sáp thơm được làm thủ công, đóng trong hộp hình trái tim sang trọng",
            price: 450000,
            originalPrice: 550000,
            category: "Hoa sáp",
            image: "https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=500",
            images: ["https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=500"],
            tag: "Bán chạy",
            rating: 4.8,
            reviews: 124,
            inStock: true,
            featured: true,
        },
        {
            name: "Gấu bông hoa hồng đỏ",
            slug: "gau-bong-hoa-hong-do",
            description: "Gấu bông được làm từ hoa hồng sáp cao cấp, món quà tặng độc đáo và ý nghĩa",
            price: 650000,
            category: "Gấu bông hoa",
            image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500",
            images: ["https://images.unsplash.com/photo-1520763185298-1b434c919102?w=500"],
            tag: "Mới",
            rating: 5.0,
            reviews: 89,
            inStock: true,
            featured: true,
        },
        {
            name: "Hộp hoa sáp sang trọng",
            slug: "hop-hoa-sap-sang-trong",
            description: "Hộp hoa sáp thiết kế sang trọng, phù hợp làm quà tặng cho dịp đặc biệt",
            price: 850000,
            category: "Hộp quà",
            image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500",
            images: ["https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=500"],
            rating: 4.9,
            reviews: 67,
            inStock: true,
            featured: true,
        },
        {
            name: "Combo hoa sáp + Gấu",
            slug: "combo-hoa-sap-gau",
            description: "Combo tiết kiệm bao gồm hoa sáp và gấu bông xinh xắn",
            price: 990000,
            originalPrice: 1200000,
            category: "Combo",
            image: "https://images.unsplash.com/photo-1522057306606-0db9e3883cfc?w=500",
            images: ["https://images.unsplash.com/photo-1522057306606-0db9e3883cfc?w=500"],
            tag: "Giảm giá",
            rating: 4.7,
            reviews: 156,
            inStock: true,
            featured: true,
        },
        {
            name: "Hoa tulip sáp thơm",
            slug: "hoa-tulip-sap-thom",
            description: "Hoa tulip sáp với hương thơm dịu nhẹ, tươi lâu",
            price: 380000,
            category: "Hoa sáp",
            image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
            images: ["https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500"],
            rating: 4.6,
            reviews: 92,
            inStock: true,
            featured: true,
        },
        {
            name: "Gấu bông hoa baby",
            slug: "gau-bong-hoa-baby",
            description: "Gấu bông hoa nhỏ xinh, phù hợp làm quà tặng cho bạn gái",
            price: 550000,
            category: "Gấu bông hoa",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500",
            images: ["https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500"],
            rating: 4.8,
            reviews: 78,
            inStock: true,
            featured: true,
        },
        {
            name: "Hoa sáp để bàn mini",
            slug: "hoa-sap-de-ban-mini",
            description: "Hoa sáp kích thước nhỏ gọn, phù hợp trang trí bàn làm việc",
            price: 280000,
            category: "Hoa sáp",
            image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500",
            images: ["https://images.unsplash.com/photo-1487070183336-b863922373d4?w=500"],
            rating: 4.5,
            reviews: 103,
            inStock: true,
            featured: false,
        },
        {
            name: "Hộp hoa sáp trái tim",
            slug: "hop-hoa-sap-trai-tim",
            description: "Hộp hoa sáp hình trái tim lãng mạn, thích hợp cho ngày lễ tình nhân",
            price: 720000,
            category: "Hộp quà",
            image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
            images: ["https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500"],
            tag: "Hot",
            rating: 4.9,
            reviews: 142,
            inStock: true,
            featured: false,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: {
                ...product,
                createdById: admin.id,
            },
        });
    }

    console.log("✅ Sample products created");
    console.log("\n🎉 Seeding completed!");
    console.log("\n📝 Admin credentials:");
    console.log("   Email: admin@emilyflower.com");
    console.log("   Password: admin123");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
