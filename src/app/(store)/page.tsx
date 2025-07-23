import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import SectionTop from "@/components/client/SectionTop";
import SectionAction from "@/components/client/SectionAction";
import { Hero, NewArrivals, StockClearance, TrendingCollections, WinterCollection } from "@/components/client/sections";
import CustomerSay from "@/components/client/CustomerSay";
import TestimonialSection from "@/components/client/TestimonialSection";


export default async function Home() {
  const queryClient = getQueryClient();

  return (
    <div className="container mx-auto w-full font-wilkyasta">
      <HydrationBoundary state={dehydrate(queryClient)}>

        {/* Hero Section */}
        <section>
          <Hero />
        </section>

        {/* New Arrivals Section */}
        <section className="mb-8 md:mb-10 lg:mb-12">
          <SectionTop title={{ primary: "New", secondary: "Arrivals", description: "Have a look on what's New now!" }} />
          <NewArrivals />
          <SectionAction action={{ label: "View All", link: "/" }} />
        </section>

        {/* Trending Collection Section */}
        <section className="mb-8 md:mb-10 lg:mb-12">
          <SectionTop title={{ primary: "Trending", secondary: "Collection", description: "Have a look on what’s trending now!" }} />
          <TrendingCollections />
          <SectionAction action={{ label: "View All", link: "/" }} />
        </section>

        {/* Stock Clearance Section */}
        <section className="mb-8 lg:mb-10 md:mb-12">
          <SectionTop title={{ primary: "Stock", secondary: "Clearance", description: "Have a look on what’s trending now!" }} />
          <StockClearance />
          <SectionAction action={{ label: "View All", link: "/" }} />
        </section>

        {/* Winter Collection Section */}
        <section className="mb-8 md:mb-10 lg:mb-12">
          <SectionTop title={{ primary: "Winter", secondary: "Collection", description: "We consider  your look and comfort on scorching weather." }} />
          <WinterCollection />
          <SectionAction action={{ label: "Explore", link: "/" }} />
        </section>


        {/* What Our Customer Says Section */}
        <section className="mb-8 md:mb-10 lg:mb-12">
          <SectionTop title={{ primary: " What Our Customer", secondary: "Says", description: "We value our customer’s feedback to provide  the best service." }} />
          {/* <CustomerSay /> */}
          <TestimonialSection />
          <SectionAction action={{ label: "Explore", link: "/" }} />
        </section>

      </HydrationBoundary>
    </div>
  );
}
