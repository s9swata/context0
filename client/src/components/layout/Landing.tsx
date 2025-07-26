import Image from "next/image";
import Marquee from "./Marquee";
import { NavBar } from "./NavBar";

export const Landing = () => {
  return (
    <>
      <div className="w-full bg-black min-h-screen relative overflow-hidden">
        <NavBar />

        <Image
          src="/images/blackhole.png"
          alt="Background"
          className="absolute inset-0 top-20 object-cover w-full h-full z-10 opacity-75"
          fill
          priority
        />
        {/* Main Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-4 sm:px-6 lg:px-8">
          {/* Main Title
                        <div className="text-center mb-8 sm:mb-12">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-[Black] text-white tracking-[4px] sm:tracking-[8px] md:tracking-[15px] lg:tracking-[25px] xl:tracking-[35px] drop-shadow-xl leading-tight">
                                ARCHIVENET
                            </h1>
                        </div>


                        {/* Hero Description */}
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[Black] text-white leading-tight">
              WORLD&apos;S FIRST DECENTRALIZED PROTOCOL FOR AGENTIC MODELS
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[semiBold] text-white/90 leading-relaxed max-w-3xl mx-auto">
              Introducing the world&apos;s first decentralized protocol for
              Agentic Models — a trustless, scalable framework that lets AI
              agents access, store, and manage context securely across networks.
              Built for interoperability, privacy, and permanence.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black pt-8 sm:pt-12 md:pt-16 lg:pt-10 px-4 sm:px-6 md:px-8 lg:px-10 flex justify-center items-center overflow-hidden">
        <Marquee />
      </div>
    </>
  );
};
