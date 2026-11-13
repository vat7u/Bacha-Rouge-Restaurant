"use client";

import { useState, type FormEvent } from "react";
import { FLOURISHES, type Dictionary } from "@/i18n/dictionaries";

const LABEL = "flex flex-col gap-1.5 text-[10.5px] tracking-[.26em] uppercase text-gold";
/** Submitted values, language-neutral; labels come from `t.guestOptions` in the same order. */
const GUEST_VALUES = ["2", "1", "3", "4", "5", "6+"];

export function ReservationForm({ t }: { t: Dictionary["reservation"]["form"] }) {
  const [sent, setSent] = useState(false);

  // No booking backend yet: the request is only acknowledged on screen.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-2.5 py-7 border-y border-gold/50">
        <div lang="fr" className="font-serif text-[26px] tracking-[.06em]">
          {FLOURISHES.thanks}
        </div>
        <p className="m-0 text-[15px] leading-[1.7] font-light">
          {t.thanks}
        </p>
      </div>
    );
  }

  return (
    <form
      data-stagger=""
      onSubmit={onSubmit}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-[26px] mt-3 [color-scheme:dark]"
    >
      <label data-item="" className={LABEL}>
        {t.name}
        <input required type="text" name="name" autoComplete="name" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        {t.contact}
        <input required type="text" name="contact" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        {t.date}
        <input required type="date" name="date" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        {t.time}
        <input required type="time" name="time" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        {t.guests}
        <select name="guests" className="field">
          {GUEST_VALUES.map((value, i) => (
            <option key={value} value={value}>
              {t.guestOptions[i]}
            </option>
          ))}
        </select>
      </label>
      <label data-item="" className={LABEL}>
        {t.note}
        <input type="text" name="note" className="field" />
      </label>
      <div data-item="" className="col-span-full flex mt-2">
        <button
          type="submit"
          className="border-0 cursor-pointer bg-ivory text-oxblood px-9 py-[18px] text-[11px] tracking-[.28em] uppercase font-medium font-sans hover:bg-gold hover:text-ink"
        >
          {t.submit}
        </button>
      </div>
    </form>
  );
}
