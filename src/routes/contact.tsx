import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { ArrowDown, ArrowUpRight, CalendarCheck, Clock, Mail, ShieldAlert } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/components/site/SiteSettingsContext";
import { EmailText } from "@/components/site/EmailText";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import type { SubmitFormInput } from "@/lib/api/forms";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact. Magma Legal Practitioners" },
      {
        name: "description",
        content: "Tell us about your matter, or book an hour with an attorney.",
      },
      { property: "og:title", content: "Contact Magma Legal Practitioners" },
      {
        property: "og:description",
        content: "Tell us what has happened and where it stands.",
      },
    ],
  }),
  component: Contact,
});

const CONSULTATIONS = [
  "Initial consultation",
  "Case review",
  "Contract review",
  "Written legal opinion",
  "Regulatory advice",
];

const fieldClass =
  "mt-3 w-full border-b border-border bg-transparent pb-3 text-lg outline-none transition-colors focus:border-accent";

/** Off-screen, unlabelled for people, irresistible to bots. Both forms on this
 *  page carry one, so the id has to be per-form or the document has duplicates. */
function Honeypot({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor={id}>Leave this field empty</label>
      <input
        id={id}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

/** Said once, above both forms: nothing sent through here is privileged. */
function PrivilegeNotice() {
  return (
    <p className="mt-10 flex gap-4 border-l-2 border-accent bg-accent-wash p-6 text-sm leading-relaxed text-muted-foreground">
      <ShieldAlert
        size={18}
        strokeWidth={1.5}
        className="mt-0.5 shrink-0 text-accent"
        aria-hidden="true"
      />
      <span>
        Contacting us does not create an attorney–client relationship, and this form is not a
        confidential channel. Send enough for us to identify the matter and run a conflict check —
        not your confidential documents. We will tell you where to send those once we can act.
      </span>
    </p>
  );
}

function Contact() {
  const settings = useSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Tell us what has happened"
        crumb="Contact"
        lead="Write to us, or book an hour. We read everything ourselves and reply within one business day."
      />

      {/* Three ways in, before anything asks you to fill in a form. The rules
          between them are grid gaps showing the border colour through, so the
          padding has to sit outside the grid or it prints two grey margins. */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <div className="grid gap-px bg-border lg:grid-cols-3">
            <Reveal className="bg-background p-8 md:p-10">
              <p className="flex items-center gap-3 eyebrow text-accent">
                <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
                Email
              </p>
              <a
                href={`mailto:${settings.email}`}
                className="link-underline mt-5 inline-block break-words font-display text-2xl transition-colors hover:text-accent lg:text-xl xl:text-2xl"
              >
                <EmailText address={settings.email} />
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Read by an attorney, not by an inbox nobody owns.
              </p>
            </Reveal>

            <Reveal delay={80} className="bg-background p-8 md:p-10">
              <p className="flex items-center gap-3 eyebrow text-accent">
                <Clock size={15} strokeWidth={1.8} aria-hidden="true" />
                Office hours
              </p>
              <p className="mt-5 font-display text-2xl lg:text-xl xl:text-2xl">{settings.hours}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Emergency motions are covered outside them.
              </p>
            </Reveal>

            <Reveal delay={160} className="bg-background p-8 md:p-10">
              <p className="flex items-center gap-3 eyebrow text-accent">
                <CalendarCheck size={15} strokeWidth={1.8} aria-hidden="true" />
                Consultation
              </p>
              <a
                href="#book"
                className="group mt-5 inline-flex items-center gap-3 font-display text-2xl transition-colors hover:text-accent lg:text-xl xl:text-2xl"
              >
                Book an hour
                <ArrowDown
                  size={22}
                  strokeWidth={1.4}
                  className="transition-transform duration-500 group-hover:translate-y-1"
                />
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                In person or by video, at a time that suits you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="relative mx-auto grid max-w-[92rem] gap-14 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">New matter</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] md:text-5xl">
              Send us the facts and the dates.
            </h2>
            <p className="mt-7 leading-relaxed text-muted-foreground">
              Enough to identify the matter and run a conflict check is enough to start. An attorney
              replies within one business day.
            </p>
            <PrivilegeNotice />
          </Reveal>

          <Reveal delay={120}>
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <section
        id="book"
        className="scroll-mt-28 border-t border-border bg-accent-wash py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-[92rem] gap-14 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-accent">Book a consultation</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.1] md:text-5xl">
              An hour with an attorney, at a time that suits you.
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
              Pick a time and we will confirm by email. Consultations are held at our office, at
              yours, or by video — whichever is more useful at this stage.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Bring the contract, the correspondence and the dates. You will leave knowing your
              options and what each would cost.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <BookingForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

const ENQUIRY_INITIAL = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  scope: "",
  website: "",
};

function EnquiryForm() {
  const build = useCallback(
    (values: typeof ENQUIRY_INITIAL): SubmitFormInput => ({
      kind: "enquiry",
      name: values.name,
      company: values.company || undefined,
      email: values.email,
      phone: values.phone || undefined,
      subject: values.subject || undefined,
      scope: values.scope,
      website: values.website,
    }),
    [],
  );

  const form = useFormSubmit(ENQUIRY_INITIAL, build);

  if (form.success) {
    return (
      <div>
        <p className="font-display text-3xl leading-snug">
          Thank you, we have it. An attorney will reply within one business day, after a conflict
          check.
        </p>
        <button
          type="button"
          onClick={form.reset}
          className="eyebrow mt-8 border border-border px-6 py-3 transition-colors hover:border-accent hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={form.onSubmit} className="relative space-y-8">
      <Honeypot
        id="enquiry-website"
        value={form.values.website}
        onChange={(next) => form.setField("website", next)}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow text-muted-foreground">
            Your name
          </label>
          <input
            id="name"
            required
            maxLength={200}
            value={form.values.name}
            onChange={(event) => form.setField("name", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="company" className="eyebrow text-muted-foreground">
            Company (optional)
          </label>
          <input
            id="company"
            maxLength={200}
            value={form.values.company}
            onChange={(event) => form.setField("company", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow text-muted-foreground">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            maxLength={320}
            value={form.values.email}
            onChange={(event) => form.setField("email", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow text-muted-foreground">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={60}
            value={form.values.phone}
            onChange={(event) => form.setField("phone", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="eyebrow text-muted-foreground">
          Nature of the matter
        </label>
        <input
          id="subject"
          maxLength={300}
          placeholder="Contract dispute, lease renewal, license application…"
          value={form.values.subject}
          onChange={(event) => form.setField("subject", event.target.value)}
          className={`${fieldClass} placeholder:text-muted-foreground/50 placeholder:text-base`}
        />
      </div>

      <div>
        <label htmlFor="scope" className="eyebrow text-muted-foreground">
          What has happened so far
        </label>
        <textarea
          id="scope"
          rows={4}
          required
          maxLength={4000}
          value={form.values.scope}
          onChange={(event) => form.setField("scope", event.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {form.error ? <p className="text-sm text-destructive">{form.error}</p> : null}

      <button
        type="submit"
        disabled={form.submitting}
        className="btn-sweep eyebrow inline-flex items-center gap-4 bg-primary px-9 py-4 text-primary-foreground disabled:opacity-40"
      >
        {form.submitting ? "Sending…" : "Send inquiry"}
        <ArrowUpRight size={16} strokeWidth={1.5} />
      </button>
    </form>
  );
}

const BOOKING_INITIAL = {
  name: "",
  email: "",
  phone: "",
  service: CONSULTATIONS[0] ?? "Initial consultation",
  preferredDate: "",
  preferredTime: "",
  notes: "",
  website: "",
};

function BookingForm() {
  const build = useCallback(
    (values: typeof BOOKING_INITIAL): SubmitFormInput => ({
      kind: "booking",
      name: values.name,
      email: values.email,
      phone: values.phone || undefined,
      service: values.service,
      preferredDate: values.preferredDate,
      preferredTime: values.preferredTime,
      notes: values.notes || undefined,
      website: values.website,
    }),
    [],
  );

  const form = useFormSubmit(BOOKING_INITIAL, build);

  if (form.success) {
    return (
      <div>
        <p className="font-display text-3xl leading-snug">
          Booked in. We will email you to confirm the slot.
        </p>
        <button
          type="button"
          onClick={form.reset}
          className="eyebrow mt-8 border border-border px-6 py-3 transition-colors hover:border-accent hover:text-accent"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={form.onSubmit} className="relative space-y-8">
      <Honeypot
        id="booking-website"
        value={form.values.website}
        onChange={(next) => form.setField("website", next)}
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="eyebrow text-muted-foreground">
            Your name
          </label>
          <input
            id="booking-name"
            required
            maxLength={200}
            value={form.values.name}
            onChange={(event) => form.setField("name", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-email" className="eyebrow text-muted-foreground">
            Email address
          </label>
          <input
            id="booking-email"
            type="email"
            required
            maxLength={320}
            value={form.values.email}
            onChange={(event) => form.setField("email", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-phone" className="eyebrow text-muted-foreground">
            Phone (optional)
          </label>
          <input
            id="booking-phone"
            type="tel"
            maxLength={60}
            value={form.values.phone}
            onChange={(event) => form.setField("phone", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-service" className="eyebrow text-muted-foreground">
            Consultation type
          </label>
          <select
            id="booking-service"
            required
            value={form.values.service}
            onChange={(event) => form.setField("service", event.target.value)}
            className={fieldClass}
          >
            {CONSULTATIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="booking-date" className="eyebrow text-muted-foreground">
            Preferred date
          </label>
          <input
            id="booking-date"
            type="date"
            required
            value={form.values.preferredDate}
            onChange={(event) => form.setField("preferredDate", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="booking-time" className="eyebrow text-muted-foreground">
            Preferred time
          </label>
          <input
            id="booking-time"
            type="time"
            required
            value={form.values.preferredTime}
            onChange={(event) => form.setField("preferredTime", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-notes" className="eyebrow text-muted-foreground">
          Anything we should read first (optional)
        </label>
        <textarea
          id="booking-notes"
          rows={3}
          maxLength={4000}
          value={form.values.notes}
          onChange={(event) => form.setField("notes", event.target.value)}
          className={`${fieldClass} resize-none`}
        />
      </div>

      {form.error ? <p className="text-sm text-destructive">{form.error}</p> : null}

      <button
        type="submit"
        disabled={form.submitting}
        className="btn-sweep eyebrow inline-flex items-center gap-4 bg-primary px-9 py-4 text-primary-foreground disabled:opacity-40"
      >
        {form.submitting ? "Booking…" : "Request booking"}
        <ArrowUpRight size={16} strokeWidth={1.5} />
      </button>
    </form>
  );
}
