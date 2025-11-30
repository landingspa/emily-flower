import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Products />
        <Testimonial />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
