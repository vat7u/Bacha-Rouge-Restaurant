"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { CONTACT, WHATSAPP_MARKER, telLink, waLink } from "@/content/contact";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const LABEL = "flex flex-col gap-1.5 text-[10.5px] tracking-[.26em] uppercase text-gold";
const PRIMARY =
  "inline-block border-0 cursor-pointer bg-ivory text-oxblood px-9 py-[18px] text-[11px] tracking-[.28em] uppercase font-medium font-sans hover:bg-gold hover:text-ink";
const SECONDARY =
  "cursor-pointer bg-transparent border-0 border-b border-gold p-0 pb-[3px] text-ivory text-[11px] tracking-[.24em] uppercase font-sans hover:text-gold";

/**
 * Submitted values, language-neutral; labels come from `t.guestOptions` in the same order.
 * The WhatsApp message is the one place these are shown in the page's language.
 */
const GUEST_VALUES = ["2", "1", "3", "4", "5", "6+"];

/** Today in the visitor's own time zone, as the date input expects (YYYY-MM-DD). */
function todayIso() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** "2026-12-24" → "Thursday, December 24, 2026" (in the page's language). UTC so no time zone moves the day. */
function formatDate(iso: string, locale: Locale) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" }).format(date);
}

type Request = { message: string; url: string };

/**
 * Reservation form that hands the request to WhatsApp. Submitting opens a chat
 * with the restaurant's reservation number and a pre-written message; nothing
 * is sent until the guest presses Send there, and the panel shown afterwards
 * says so. The form stays mounted (hidden) so "Edit request" keeps the entries.
 */
export function ReservationForm({ locale, t }: { locale: Locale; t: Dictionary["reservation"]["form"] }) {
  const [request, setRequest] = useState<Request | null>(null);
  const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLTextAreaElement>(null);

  // Block past dates. Set after load, in the visitor's time zone, so the pre-built HTML never disagrees.
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayIso();
  }, []);

  useEffect(() => {
    if (request) panelRef.current?.focus();
  }, [request]);

  useEffect(() => {
    if (copy === "failed") copyRef.current?.select();
  }, [copy]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (request) return;
    const data = new FormData(e.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    const guests = value("guests");
    const lines = [
      WHATSAPP_MARKER,
      t.message.greeting,
      `${t.name}: ${value("name")}`,
      `${t.date}: ${formatDate(value("date"), locale)}`,
      `${t.time}: ${value("time")}`,
      `${t.guests}: ${t.guestOptions[GUEST_VALUES.indexOf(guests)] ?? guests}`,
    ];
    const note = value("note");
    if (note) lines.push(`${t.message.note}: ${note}`);

    const message = lines.join("\n");
    const url = waLink(message);
    // Opened inside the submit event with no delay, so pop-up blockers allow it.
    window.open(url, "_blank", "noopener");
    setCopy("idle");
    setRequest({ message, url });
  }

  function onEdit() {
    flushSync(() => setRequest(null));
    nameRef.current?.focus();
  }

  async function onCopy() {
    if (!request) return;
    try {
      await navigator.clipboard.writeText(request.message);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }

  return (
    <>
      <form
        data-stagger=""
        onSubmit={onSubmit}
        hidden={request !== null}
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-8 gap-y-[26px] mt-3 [color-scheme:dark]"
      >
        <label data-item="" className={LABEL}>
          {t.name}
          <input ref={nameRef} required type="text" name="name" autoComplete="name" maxLength={80} className="field" />
        </label>
        <label data-item="" className={LABEL}>
          {t.date}
          <input ref={dateRef} required type="date" name="date" className="field" />
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
        <label data-item="" className={`${LABEL} col-span-full`}>
          {t.note}
          <input type="text" name="note" maxLength={300} className="field" />
        </label>
        <div data-item="" className="col-span-full flex mt-2">
          <button type="submit" className={PRIMARY}>
            {t.submit}
          </button>
        </div>
      </form>

      {request && (
        <div
          ref={panelRef}
          role="status"
          tabIndex={-1}
          className="flex flex-col gap-5 py-7 border-y border-gold/50 outline-none"
        >
          <div className="font-serif text-[26px] tracking-[.04em] leading-tight">{t.sentTitle}</div>
          <p className="m-0 text-[15px] leading-[1.7] font-light">{t.sentText}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={request.url} target="_blank" rel="noopener" className={PRIMARY}>
              {t.openAgain}
            </a>
            <button type="button" onClick={onEdit} className={SECONDARY}>
              {t.edit}
            </button>
            <button type="button" onClick={onCopy} className={SECONDARY}>
              {copy === "copied" ? t.copied : t.copy}
            </button>
          </div>
          {copy === "failed" && (
            <label className={LABEL}>
              {t.copyFailed}
              <textarea
                ref={copyRef}
                readOnly
                value={request.message}
                rows={7}
                className="field resize-none text-[14px] leading-[1.5]"
              />
            </label>
          )}
          <p className="m-0 text-[13px] leading-[1.7] font-light text-ivory/80">
            {t.noWhatsapp}{" "}
            <a href={telLink(CONTACT.whatsapp)} className="whitespace-nowrap underline underline-offset-4 hover:text-gold">
              {CONTACT.whatsappDisplay}
            </a>
            {" · "}
            <a href={telLink(CONTACT.phone)} className="whitespace-nowrap underline underline-offset-4 hover:text-gold">
              {CONTACT.phoneDisplay}
            </a>
          </p>
        </div>
      )}
    </>
  );
}
