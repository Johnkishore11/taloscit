"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
} from "motion/react";
import "./RollingGallery.css";

const IMGS: string[] = [
  "https://images.unsplash.com/photo-1528109966604-5a6a4a964e8d?q=80&w=3024&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570675335622-555246765422?q=80&w=3387&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?q=80&w=3456&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=3456&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507207611509-9807c64cda4b?q=80&w=3456&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611604548018-d56bbd85d681?q=80&w=3456&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551381297-86288b052ea6?q=80&w=3456&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516205651411-a416745265dd?q=80&w=3556&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?q=80&w=3556&auto=format&fit=crop",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
}

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}: RollingGalleryProps) => {

  // ✅ derived value (DO NOT mutate props)
  const galleryImages = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = galleryImages.length;
  const radius = cylinderWidth / (2 * Math.PI);
  const dragFactor = 0.05;

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDrag = (_: unknown, info: PanInfo) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.1,
      },
    });
  };

  const transform = useTransform(rotation, (value) =>
    `rotate3d(0, 1, 0, ${value}deg)`
  );

  useEffect(() => {
    if (!autoplay) return;

    autoplayRef.current = setInterval(() => {
      rotation.set(rotation.get() - 0.5);
    }, 16);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, rotation]);

  return (
    <div className="gallery-container relative h-[500px] w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-[50px] h-full z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute top-0 right-0 w-[50px] h-full z-10 bg-gradient-to-l from-black to-transparent" />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          className="relative flex h-full origin-center cursor-grab justify-center [transform-style:preserve-3d] active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformOrigin: `50% 50% -${radius}px`,
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onMouseEnter={() => {
            if (autoplay && pauseOnHover && autoplayRef.current) {
              clearInterval(autoplayRef.current);
            }
          }}
          onMouseLeave={() => {
            if (autoplay && pauseOnHover) {
              autoplayRef.current = setInterval(() => {
                rotation.set(rotation.get() - 0.5);
              }, 16);
            }
          }}
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="group absolute top-1/2 left-1/2 flex h-[300px] w-[350px] 
                         -translate-x-1/2 -translate-y-1/2 items-center justify-center 
                         p-[6%] [backface-visibility:hidden]"
              style={{
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none h-full w-full rounded-[15px] 
                           border-[3px] border-white object-cover 
                           transition-transform duration-300 
                           group-hover:scale-110 group-hover:border-[#ff0000]"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
