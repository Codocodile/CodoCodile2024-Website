import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rules from "@/components/Rules";
import Timeline from "@/components/Timeline";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Rules />
        <Timeline />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
