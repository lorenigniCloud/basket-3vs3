"use client";

import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import { Paper } from "@mui/material";
import { StaticImageData } from "next/image";

interface ImageItem {
  url: string;
  alt: string;
  title?: string;
}

type StaticImage = {
  src: StaticImageData;
  alt: string;
  title?: string;
};

interface ImageCarouselProps {
  items: (ImageItem | StaticImage)[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageCarousel = ({
  items,
  autoPlay = true,
  interval = 4000,
}: ImageCarouselProps) => {
  const getImageSrc = (
    item: ImageItem | StaticImage,
  ): string | StaticImageData => {
    if ("url" in item) {
      return item.url;
    }
    return item.src;
  };

  return (
    <div className="w-[400px]">
      <Carousel
        autoPlay={autoPlay}
        interval={interval}
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={true}
      >
        {items.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            className="flex items-center justify-center relative h-[400px] overflow-hidden"
          >
            <Image
              src={getImageSrc(item)}
              alt={item.alt}
              className="object-contain"
              fill
              sizes="400px"
              priority={index === 0}
            />
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                {item.title}
              </div>
            )}
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
