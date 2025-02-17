"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import texturedFrame from "../../assets/textured-frame.png";
import html2canvas from "html2canvas";
import Cropper, { Area } from "react-easy-crop";
import Image from "next/image";

export default function Upload() {
  const router = useRouter();
  const polaroidRef = useRef<HTMLDivElement>(null);
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("Your Text Here");
  const [font, setFont] = useState("font-caveat");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [finalCroppedImage, setFinalCroppedImage] = useState<string | null>(
    null,
  );

  const handleDownload = async () => {
    const croppedImage = await getCroppedImage(); // First, crop the image

    if (!croppedImage || !polaroidRef.current) return;

    const imageElement = polaroidRef.current.querySelector("img");
    if (imageElement) imageElement.src = croppedImage;

    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for image to load

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

  const getCroppedImage = async () => {
    if (!image || !cropCanvasRef.current || !croppedArea) return;

    const canvas = cropCanvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to match Polaroid frame
    const polaroidWidth = 400;
    const polaroidHeight = 500;
    canvas.width = polaroidWidth;
    canvas.height = polaroidHeight;

    // Load image into canvas
    const img = document.createElement("img") as HTMLImageElement;
    img.src = image;
    await new Promise((resolve) => (img.onload = resolve));

    // Draw cropped image into canvas
    ctx.drawImage(
      img,
      croppedArea.x, // Crop X position
      croppedArea.y, // Crop Y position
      croppedArea.width,
      croppedArea.height,
      0,
      0,
      polaroidWidth,
      polaroidHeight,
    );

    const croppedImageUrl = canvas.toDataURL("image/png");
    setFinalCroppedImage(croppedImageUrl);
    return croppedImageUrl;
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
          className="relative h-[500px] w-[400px] overflow-clip rounded-lg bg-white px-4 py-5 shadow-lg"
        >
          <div
            className="absolute inset-0 rounded-lg bg-cover"
            style={{ backgroundImage: `url(${texturedFrame.src})` }}
          />
          <div className="relative h-[368px] w-full overflow-hidden">
            {finalCroppedImage ? (
              <Image
                src={finalCroppedImage}
                alt="Polaroid"
                width={468}
                height={468}
                className="relative h-full w-full"
              />
            ) : (
              <div className="relative h-[368px] w-full overflow-hidden">
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedAreaPixels) =>
                    setCroppedArea(croppedAreaPixels)
                  }
                  showGrid={false}
                  cropShape="rect"
                  objectFit="cover"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <p
              className={`h-12 whitespace-nowrap text-center leading-10 tracking-wider ${font} text-2xl font-bold text-[#4b4b4b] md:text-4xl`}
            >
              {text}
            </p>
          </div>
        </div>
      )}
      {/* Hidden canvas for cropping */}
      <canvas ref={cropCanvasRef} className="hidden" />

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
