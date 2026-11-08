"use client";

import { useState, type FormEvent } from "react";

const LABEL = "flex flex-col gap-1.5 text-[10.5px] tracking-[.26em] uppercase text-gold";
const GUESTS = ["2 guests", "1 guest", "3 guests", "4 guests", "5 guests", "6+ guests"];

export function ReservationForm() {
  const [sent, setSent] = useState(false);

  // No booking backend yet: the request is only acknowledged on screen.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-2.5 py-7 border-y border-gold/50">
        <div className="font-serif text-[26px] tracking-[.06em]">MERCI.</div>
        <p className="m-0 text-[15px] leading-[1.7] font-light">
          Your request has been received. We will confirm your table shortly.
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
        Name
        <input required type="text" name="name" autoComplete="name" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        Phone or email
        <input required type="text" name="contact" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        Date
        <input required type="date" name="date" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        Time
        <input required type="time" name="time" className="field" />
      </label>
      <label data-item="" className={LABEL}>
        Guests
        <select name="guests" className="field">
          {GUESTS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label data-item="" className={LABEL}>
        Occasion / note
        <input type="text" name="note" className="field" />
      </label>
      <div data-item="" className="col-span-full flex mt-2">
        <button
          type="submit"
          className="border-0 cursor-pointer bg-ivory text-oxblood px-9 py-[18px] text-[11px] tracking-[.28em] uppercase font-medium font-sans hover:bg-gold hover:text-ink"
        >
          Request a reservation
        </button>
      </div>
    </form>
  );
}
