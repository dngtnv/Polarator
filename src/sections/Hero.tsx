import Image from "next/image";
import React from "react";
import Camera from "../assets/camera.png";

const Hero = () => {
  return (
    <section className="pb-20 pt-8 md:pb-10 md:pt-5">
      <div className="container">
        <div className="mx-auto max-w-lg">
          <div className="flex flex-col items-center md:relative md:w-[478px]">
            <h1 className="mt-6 text-center text-5xl font-bold tracking-tighter md:text-7xl">
              Polaroid Photo{" "}
              <span className="bg-[linear-gradient(to_bottom,transparent_55%,#ffdc58_50%)]">
                Generator
              </span>
            </h1>
            <Image
              src={Camera}
              alt="Polaroid Camera"
              className="w-24 rotate-6 md:absolute md:-bottom-10 md:-right-16 md:w-[120px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
