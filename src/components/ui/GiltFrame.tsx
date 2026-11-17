import Image from "next/image";
import type { HTMLAttributes, ReactNode } from "react";

/** Attributes for the photo opening, including `data-*` animation hooks. */
type OpeningProps = HTMLAttributes<HTMLDivElement> & { [hook: `data-${string}`]: string };

/**
 * The two gilt frame images and where their openings sit, as percentages of
 * the image. Each opening is a few pixels larger than the visible hole so the
 * photo bleeds under the inner moulding and no gap shows at any size.
 * If an image is replaced, re-measure its opening.
 */
const SHAPES = {
  // /assets/arch-frame.png, 614×970, from pics/Ornate Gold Frames on Transparency.png
  arch: {
    src: "/assets/arch-frame.png",
    aspect: "aspect-[614/970]",
    opening: "left-[15.8%] top-[15.15%] w-[67.75%] h-[74.43%] rounded-t-[50%_28.81%]",
  },
  // /assets/square-frame.png, 789×977, from pics/Ornate Gold Frames squere.png
  square: {
    src: "/assets/square-frame.png",
    aspect: "aspect-[789/977]",
    opening: "left-[18.88%] top-[19.14%] w-[61.72%] h-[64.38%]",
  },
} as const;

type GiltFrameProps = {
  shape: keyof typeof SHAPES;
  /** Position (`relative` by default, or `absolute …`) and one dimension; the aspect ratio is fixed by the frame image. */
  className?: string;
  /** `sizes` for the frame image, matching the frame's rendered width. */
  sizes: string;
  /** Put animation hooks here: only the opening (the photo) moves, the frame stays still. */
  openingProps?: OpeningProps;
  children: ReactNode;
};

/** Ornate gilt frame (arched or square) drawn over a photo in its opening. */
export function GiltFrame({ shape, className = "relative", sizes, openingProps, children }: GiltFrameProps) {
  const frame = SHAPES[shape];
  const { className: openingClass = "", ...openingRest } = openingProps ?? {};
  return (
    <div className={`${frame.aspect} ${className}`}>
      <div {...openingRest} className={`absolute overflow-hidden ${frame.opening} ${openingClass}`}>
        {children}
      </div>
      <Image
        src={frame.src}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        className="pointer-events-none object-fill drop-shadow-[0_24px_36px_rgba(23,16,18,.35)]"
      />
    </div>
  );
}
