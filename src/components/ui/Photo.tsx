import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  sizes: string;
  /** `cover` crops to fill the parent; `contain` shows the whole image, centred. */
  fit?: "cover" | "contain";
};

/** Photo that fills its positioned parent. */
export function Photo({ src, alt, sizes, fit = "cover" }: PhotoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={fit === "contain" ? "object-contain object-center" : "object-cover"}
    />
  );
}
