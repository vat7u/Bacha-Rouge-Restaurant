import { Fragment, type ReactNode } from "react";

/** One masked word of a split headline; GSAP targets the inner [data-w]. */
export function W({ children }: { children: ReactNode }) {
  return (
    <span className="split-word">
      <span data-w="" className="inline-block">
        {children}
      </span>
    </span>
  );
}

/** Splits plain text into masked words separated by single spaces. */
export function words(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .map((word, i) => (
      <Fragment key={i}>
        {i > 0 && " "}
        <W>{word}</W>
      </Fragment>
    ));
}
