'use client';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface SvgIconProps {
  src: StaticImageData;
  alt?: string;
  size?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export const SvgIcon = ({
  src,
  alt = '',
  size = 100,
  color = '#000',
  animate = false,
  className = '',
}: SvgIconProps) => {
  const MotionImage = motion(Image);

  return (
    <MotionImage
      src={src}
      alt={alt}
      height={size}
      width={size}
      className={className}
      style={{
        filter: `brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) drop-shadow(0 0 0 ${color})`,
      }}
      animate={
        animate
          ? {
              scale: [1, 1.05, 1],
              rotate: [0, 3, -3, 0],
              y: [0, -5, 0, 5, 0],
            }
          : {}
      }
      transition={
        animate
          ? {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
    />
  );
};
