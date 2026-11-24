"use client";

import React from "react";
import { motion } from "framer-motion";

interface CarouselInfiniteProps {
    images?: string[];
    backgroundColor?: string;
    imageBgColor?: string;
    imageBorderRadius?: string;
    imageOpacity?: number;
    imageGap?: string;
    imageHeight?: string;
    imageWidth?: string;
    animationDuration?: number;
    maskGradient?: string;
    maxWidth?: string;
}

const CarouselInfinite: React.FC<CarouselInfiniteProps> = ({
    images = [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
        "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&q=80",
    ],
    backgroundColor = "transparent",
    imageBgColor = "#e4e4e7",
    imageBorderRadius = "0.5rem",
    imageOpacity = 0.8,
    imageGap = "0.5rem",
    imageHeight = "6rem",
    imageWidth = "8rem",
    animationDuration = 20,
    maskGradient = "linear-gradient(to_right,transparent,black_20%,black_80%,transparent)",
    maxWidth = "32rem",
}) => {
    const duplicatedImages = [...images, ...images, ...images];

    return (
        <div
            className="w-full overflow-hidden whitespace-nowrap"
            style={{
                backgroundColor,
                maxWidth,
                maskImage: maskGradient,
            }}
        >
            <motion.div
                animate={{ x: ["0%", "-33.333333%"] }}
                transition={{ repeat: Infinity, duration: animationDuration, ease: "linear" }}
                className="inline-block"
            >
                {duplicatedImages.map((src, i) => (
                    <div
                        key={i}
                        className="inline-block overflow-hidden"
                        style={{
                            marginLeft: imageGap,
                            marginRight: imageGap,
                            height: imageHeight,
                            width: imageWidth,
                            borderRadius: imageBorderRadius,
                            backgroundColor: imageBgColor,
                        }}
                    >
                        <img
                            src={src}
                            className="h-full w-full object-cover"
                            alt=""
                            style={{ opacity: imageOpacity }}
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default CarouselInfinite;


