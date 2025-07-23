import Image from "next/image";
import heroGirl from "@/../public/hero/heroGirl.png";
import heroBg from "@/../public/hero/heroBg.png";
import { Button } from "@/components/ui/button";


export default function Hero() {
  return (
    <div className="max-h-screen container mx-auto w-full flex justify-between items-center">
      <div className="">
        <h1 className="text-[96px]">Elevate Style, Embrace Story</h1>
        <p>
          We provide the largest clothing collection for any season. You can
          choose trendy or classy design according to your preferences. Our
          services are super fast and we update within 24 hours.
        </p>
        <Button>Explore More</Button>
      </div>
      <div className="relative -z-10">
        <Image
          src={heroBg}
          alt="hero"
          width={722}
          height={874}
          className="w-[722px] h-[874px]"
        />

        <div className="absolute z-10 top-0">
          <Image
            src={heroGirl}
            alt="hero girl"
            width={580}
            height={825}
            className="w-[580px] h-[825px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
