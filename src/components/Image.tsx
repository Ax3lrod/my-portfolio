import { ImageProps } from "next/image";
import { CldImage } from "next-cloudinary";

type CustomImageProps = Omit<ImageProps, "src"> & {
  src: string | { default: string };
};

export default function Image({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  ...props
}: CustomImageProps) {
  return (
    <CldImage
      src={typeof src === "string" ? src : (src as { default: string }).default}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      sizes={sizes}
      {...props}
    />
  );
}
