"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import texturedFrame from "../../assets/textured-frame.png";
import html2canvas from "html2canvas";

export default function Upload() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("Your Text Here");
  const [font, setFont] = useState("font-caveat");
  const polaroidRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!polaroidRef.current) return;

    const canvas = await html2canvas(polaroidRef.current, {
      backgroundColor: null,
      scale: 2, // Higher resolution
    });
    const imageURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "polaroid.png";
    link.click();
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const img = urlParams.get("image");
    if (img) {
      setImage(img);
    } else {
      router.push("/"); // Redirect to home if no image is found
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#ebc477] p-4">
      {image && (
        <div
          ref={polaroidRef}
          className="relative w-72 overflow-clip rounded-lg bg-white px-4 py-5 shadow-lg md:w-[400px]"
        >
          <div
            className="absolute inset-0 rounded-lg bg-cover"
            style={{ backgroundImage: `url(${texturedFrame.src})` }}
          />
          <Image
            src={image}
            alt="Polaroid"
            height={300}
            width={200}
            className="relative h-full w-full object-cover"
          />
          <div className="mt-3 flex items-center justify-center">
            <p
              className={`h-12 whitespace-nowrap text-center leading-10 tracking-wider ${font} text-xl font-bold text-[#4b4b4b] md:text-4xl`}
            >
              {text}
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-1 md:flex-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-4 w-64 rounded border p-2 text-center focus-within:outline-dashed focus-within:outline-4"
        />
        <select
          onChange={(e) => setFont(e.target.value)}
          className="mt-4 rounded border p-2 focus-within:outline-dashed focus-within:outline-4"
        >
          <option value="font-caveat">Caveat</option>
          <option value="font-imperial">Imperial Script</option>
          <option value="font-shadow">Shadow Into Light</option>
        </select>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleDownload}
          className="mt-4 cursor-pointer rounded-3xl border-4 border-black bg-[#bae6ff] px-3 py-2 font-semibold"
        >
          Download
        </button>
        <button
          onClick={() => router.push("/")}
          className="mt-4 cursor-pointer rounded-3xl border-4 border-black bg-[#ff6258] px-3 py-2 font-semibold"
        >
          Upload another image
        </button>
      </div>
    </div>
  );
}
