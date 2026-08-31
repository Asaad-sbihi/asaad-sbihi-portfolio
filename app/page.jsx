import Contact from "@/components/Contact";
import Focus from "@/components/Focus";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Path from "@/components/Path";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trust />
        <Focus />
        <Services />
        <Work />
        <Path />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
