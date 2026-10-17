import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  User,
  Clock,
  ClipboardCheck,
  CalendarDays,
  CreditCard,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ndumie } from "@/api/ndumieClient";

// Helper: Convert "HH:mm" to minutes from midnight
const toMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.trim().split(":").map(Number);
  return h * 60 + m;
};

// Generate list of 30-minute candidate slots between open and close
const generateCandidateSlots = (openTime = "08:00", closeTime = "18:00") => {
  const slots = [];
  let current = toMinutes(openTime);
  const end = toMinutes(closeTime);

  while (current < end) {
    const hh = String(Math.floor(current / 60)).padStart(2, "0");
    const mm = String(current % 60).padStart(2, "0");
    slots.push(`${hh}:${mm}`);
    current += 30;
  }
  return slots;
};

const SERVICE_OPTIONS = [
  {
    id: "hands",
    title: "Hands Only",
    subtitle: "Acrylic, Gel or Overlays",
    duration: 90,
    priceNote: "From R150",
  },
  {
    id: "toes",
    title: "Toes Only",
    subtitle: "Gel, Acrylic or Pedicure",
    duration: 30,
    priceNote: "From R120",
  },
  {
    id: "both",
    title: "Hands & Toes",
    subtitle: "Full combo treatment",
    duration: 120,
    priceNote: "From R270",
  },
];

export default function Book() {
  const urlParams = new URLSearchParams(window.location.search);
  const isCourseBooking = urlParams.get("service") === "course";

  const STEPS = isCourseBooking
    ? [
        { id: 1, label: "Your Details", icon: User },
        { id: 2, label: "Course Dates", icon: CalendarDays },
        { id: 3, label: "Confirm", icon: ClipboardCheck },
        { id: 4, label: "Payment", icon: CreditCard },
      ]
    : [
        { id: 1, label: "Your Details", icon: User },
        { id: 2, label: "Service", icon: Sparkles },
        { id: 3, label: "Date & Time", icon: Clock },
        { id: 4, label: "Confirm", icon: ClipboardCheck },
        { id: 5, label: "Payment", icon: CreditCard },
      ];

  const LAST_STEP = STEPS[STEPS.length - 1].id;
  const CONFIRM_STEP = isCourseBooking ? 3 : 4;

  const initialForm = {
    client_name: "",
    client_phone: "",
    client_email: "",
    service_category: isCourseBooking ? "Beginner Nail Course" : "hands",
    service_detail: isCourseBooking ? "2-Week Beginner Course" : "Hands Only (90 min)",
    duration_minutes: isCourseBooking ? 0 : 90,
    price: isCourseBooking ? 4500 : 0,
    preferred_time: "",
    notes: "",
  };

  const navigate = useNavigate();
  const cardRef = useRef(null);
  const submitLockRef = useRef(false);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined });
  const [form, setForm] = useState(initialForm);
  const [rawBookings, setRawBookings] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");
  const [slotsCache, setSlotsCache] = useState({});
  const [bookingCreated, setBookingCreated] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBookedSlots = async (selectedDate) => {
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    if (slotsCache[dateStr]) {
      setRawBookings(slotsCache[dateStr]);
      return;
    }
    setLoadingSlots(true);
    try {
      const result = await ndumie.entities.Booking.filter({ preferred_date: dateStr });
      const bookings = Array.isArray(result) ? result : [];
      const validBookings = bookings.filter((b) => b && b.status !== "cancelled");
      setSlotsCache((prev) => ({ ...prev, [dateStr]: validBookings }));
      setRawBookings(validBookings);
    } catch (err) {
      console.error("Failed to fetch booked slots:", err);
      setRawBookings([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateSelect = (d) => {
    setDate(d);
    setForm((prev) => ({ ...prev, preferred_time: "" }));
    fetchBookedSlots(d);
  };

  const handleServiceSelect = (service) => {
    setForm((prev) => ({
      ...prev,
      service_category: service.id,
      service_detail: service.title,
      duration_minutes: service.duration,
      preferred_time: "", 
    }));
  };

  // --- ADJACENT ONLY ALGORITHM ---
  const isSlotAvailable = (startTimeStr) => {
    if (!date) return false;
    const startMin = toMinutes(startTimeStr);
    const duration = form.duration_minutes || 90;
    const endMin = startMin + duration;
    
    // Set exact closing times
    const isSaturday = date.getDay() === 6;
    const closingMin = isSaturday ? toMinutes("14:00") : toMinutes("18:00");

    // 1. Boundary Check: Cannot exceed closing time
    if (endMin > closingMin) return false;

    // 2. Overlap Check: Cannot clash with any existing booking
    for (const b of rawBookings) {
      if (!b.preferred_time || b.preferred_time === "All Day") continue;
      const bStart = toMinutes(b.preferred_time);
      const bDuration = Number(b.duration_minutes) || 120;
      const bEnd = bStart + bDuration;

      if (startMin < bEnd && endMin > bStart) {
        return false; // Absolute overlap
      }
    }

    // 3. Efficiency Check (Adjacent Only Logic)
    let isAdjacentOrAnchor = false;

    // Rule A: Anchor Times (Every 2 hours starting at 08:00 -> 480 mins)
    if (startMin % 120 === 0) {
      isAdjacentOrAnchor = true;
    }

    // Rule B: Touches closing time (Fills the end of the day perfectly)
    if (endMin === closingMin) {
      isAdjacentOrAnchor = true;
    }

    // Rule C: Touches an existing appointment back-to-back
    for (const b of rawBookings) {
      if (!b.preferred_time || b.preferred_time === "All Day") continue;
      const bStart = toMinutes(b.preferred_time);
      const bDuration = Number(b.duration_minutes) || 120;
      const bEnd = bStart + bDuration;

      if (startMin === bEnd || endMin === bStart) {
        isAdjacentOrAnchor = true;
        break;
      }
    }

    return isAdjacentOrAnchor;
  };

  // Validation Rules
  const isValidPhone = (phone) => /^[0-9\s\-+()]{7,}$/.test(phone.trim());
  const isValidName = (name) => name.trim().length >= 2 && !/\d/.test(name);
  const isValidEmail = (email) => email.trim() === "" || email.includes("@");

  const step1Valid = isValidName(form.client_name) && isValidPhone(form.client_phone) && isValidEmail(form.client_email);
  const stepServiceValid = Boolean(form.service_category && form.duration_minutes);
  const stepDateValid = isCourseBooking
    ? Boolean(dateRange.from && dateRange.to)
    : Boolean(date && form.preferred_time);

  const nameError = form.client_name && !isValidName(form.client_name) ? "Please enter a valid name (letters only)" : "";
  const phoneError = form.client_phone && !isValidPhone(form.client_phone) ? "Please enter a valid phone number" : "";
  const emailError = form.client_email && !isValidEmail(form.client_email) ? "Email must contain an '@' symbol" : "";

  const canProceed = () => {
    if (step === 1) return step1Valid;
    if (!isCourseBooking && step === 2) return stepServiceValid;
    if ((isCourseBooking && step === 2) || (!isCourseBooking && step === 3)) return stepDateValid;
    return true;
  };

  const handleNext = async () => {
    if (step === CONFIRM_STEP) {
      if (bookingCreated) {
        setStep(step + 1);
        setError("");
        return;
      }

      if (submitLockRef.current || isSubmitting) return;

      const bookingDate = isCourseBooking ? dateRange.from : date;
      const bookingTime = isCourseBooking ? "All Day" : form.preferred_time.trim();

      if (!isCourseBooking && !isSlotAvailable(bookingTime)) {
        setError("This time slot is no longer available. Please pick another one.");
        return;
      }

      submitLockRef.current = true;
      setIsSubmitting(true);
      setLoading(true);
      setError("");

      try {
        const bookingData = {
          ...form,
          preferred_date: isCourseBooking
            ? format(dateRange.from, "yyyy-MM-dd")
            : format(date, "yyyy-MM-dd"),
          preferred_time: bookingTime,
          duration_minutes: isCourseBooking ? 0 : form.duration_minutes,
          notes: isCourseBooking && dateRange.to
            ? `Course end date: ${format(dateRange.to, "yyyy-MM-dd")}`
            : form.notes,
          status: "pending",
        };

        const created = await ndumie.entities.Booking.create(bookingData);
        setBookingCreated({ ...bookingData, ...(created || {}) });
        setStep(step + 1);
        setError("");
      } catch (err) {
        console.error("Booking error:", err);
        setError("Could not save your booking. Please check your connection and try again.");
      } finally {
        submitLockRef.current = false;
        setLoading(false);
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
      setError("");
    }
  };

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  const isLastStep = step === LAST_STEP;
  const isSaturday = date?.getDay() === 6;
  const candidateTimeSlots = generateCandidateSlots("08:00", isSaturday ? "14:00" : "18:00");

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-2">Reserve Your Spot</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            {isCourseBooking ? "Enrol in the Nail Course" : "Book an Appointment"}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            At <span className="italic font-semibold text-foreground">Bloom</span> Skills &amp; Beauty · Sangro House, Durban
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-2 rounded-full">
            {isCourseBooking
              ? "💳 R4,500 course fee · R2,250 50% deposit to enrol"
              : "💳 R100 non-refundable deposit required to secure your slot"}
          </div>
        </motion.div>

        {/* Stepper Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-3 right-3 h-0.5 bg-border z-0" />
            <div
              className="absolute top-5 left-3 h-0.5 bg-primary z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((s) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center gap-2 z-10">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      done
                        ? "bg-primary border-primary text-primary-foreground"
                        : active
                        ? "bg-background border-primary text-primary shadow-lg shadow-primary/20"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {done ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>
                  <span className={`text-[11px] sm:text-xs font-medium ${active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-800">
            ⚠️ {error}
          </div>
        )}

        <div ref={cardRef} className="bg-card rounded-3xl border border-border/50 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="p-6 sm:p-8 md:p-10"
            >
              {/* STEP 1: Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" /> Your Details
                    </h2>
                    <p className="text-sm text-muted-foreground">Tell us a little about yourself.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="e.g. Naledi Dlamini"
                        value={form.client_name}
                        onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                        className={`mt-1.5 rounded-xl h-11 ${nameError ? "border-red-500" : ""}`}
                      />
                      {nameError && <p className="text-xs text-red-600 mt-1">{nameError}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">WhatsApp Number *</Label>
                      <p className="text-[11px] text-muted-foreground mb-1.5">This number must be registered on WhatsApp to receive your confirmation.</p>
                      <Input
                        id="phone"
                        placeholder="e.g. 079 806 0310"
                        value={form.client_phone}
                        onChange={(e) => setForm({ ...form, client_phone: e.target.value })}
                        className={`rounded-xl h-11 ${phoneError ? "border-red-500" : ""}`}
                      />
                      {phoneError && <p className="text-xs text-red-600 mt-1">{phoneError}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email <span className="text-muted-foreground font-normal">(optional)</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={form.client_email}
                        onChange={(e) => setForm({ ...form, client_email: e.target.value })}
                        className={`mt-1.5 rounded-xl h-11 ${emailError ? "border-red-500" : ""}`}
                      />
                      {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 (Appointment): Service Selection */}
              {!isCourseBooking && step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" /> What Are We Doing Today?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Select your treatment category so we reserve the exact right amount of time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SERVICE_OPTIONS.map((srv) => {
                      const selected = form.service_category === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => handleServiceSelect(srv)}
                          className={`cursor-pointer rounded-2xl p-5 border-2 text-center transition-all ${
                            selected
                              ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                              : "border-border hover:border-primary/40 bg-card"
                          }`}
                        >
                          <p className="font-heading font-bold text-base text-foreground mb-1">{srv.title}</p>
                          <p className="text-xs text-muted-foreground mb-3">{srv.subtitle}</p>
                          <div className="inline-block bg-secondary/80 text-foreground font-semibold text-xs px-3 py-1 rounded-full mb-1">
                            ⏱️ {srv.duration} mins
                          </div>
                          <p className="text-xs text-primary font-medium mt-1">{srv.priceNote}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 (Course): Date Range */}
              {isCourseBooking && step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-primary" /> Choose Course Dates
                    </h2>
                    <p className="text-sm text-muted-foreground">Select start and end date (2-week course).</p>
                  </div>
                  <div className="flex justify-center overflow-x-auto">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                      disabled={(d) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return d < today || d.getDay() === 0;
                      }}
                      className="rounded-xl border border-border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                      <p className="text-sm font-semibold text-foreground">
                        {dateRange.from ? format(dateRange.from, "d MMM yyyy") : "Not selected"}
                      </p>
                    </div>
                    <div className="bg-secondary/50 rounded-xl p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">End Date</p>
                      <p className="text-sm font-semibold text-foreground">
                        {dateRange.to ? format(dateRange.to, "d MMM yyyy") : "Not selected"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 (Appointment): Dynamic Date & Time */}
              {!isCourseBooking && step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" /> Pick a Date &amp; Time
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Displaying optimal slots available for your <strong>{form.duration_minutes} min</strong> treatment.
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Date *</Label>
                    <div className="flex justify-center overflow-x-auto">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        disabled={(d) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return d < today || d.getDay() === 0;
                        }}
                        className="rounded-xl border border-border"
                      />
                    </div>
                    {date && (
                      <p className="text-center text-sm font-medium text-primary mt-2">
                        📅 {format(date, "EEEE, d MMMM yyyy")}
                      </p>
                    )}
                    <p className="text-center text-xs text-muted-foreground mt-2">
                      🚫 Closed on Sundays · Weekday last entry 18:00 · Saturday last entry 14:00
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Available Starting Times *</Label>
                    {!date ? (
                      <p className="text-sm text-muted-foreground py-3">👆 Please select a date first</p>
                    ) : loadingSlots ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" /> Checking live availability...
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {candidateTimeSlots.map((t) => {
                          const available = isSlotAvailable(t);
                          const isSelected = form.preferred_time === t;

                          // Completely hide slots that violate the Adjacent Only / Tetris stacking rule
                          if (!available && !isSelected) return null;

                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => available && setForm({ ...form, preferred_time: t })}
                              disabled={!available}
                              className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                !available
                                  ? "hidden"
                                  : isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                  : "border-border hover:border-primary/50 text-foreground"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                        {candidateTimeSlots.every(t => !isSlotAvailable(t)) && (
                          <div className="col-span-full py-4 text-center text-sm text-muted-foreground bg-secondary/30 rounded-xl">
                            Sorry, no {form.duration_minutes}-minute slots available today.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3/4: Confirmation Review */}
              {step === CONFIRM_STEP && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                      <ClipboardCheck className="w-5 h-5 text-primary" /> Review &amp; Confirm
                    </h2>
                    <p className="text-sm text-muted-foreground">Please verify your booking details.</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Name", value: form.client_name, emoji: "👤" },
                      { label: "Phone", value: form.client_phone, emoji: "📱" },
                      { label: "Email", value: form.client_email || "Not provided", emoji: "📧" },
                      ...(isCourseBooking
                        ? [
                            { label: "Course", value: form.service_detail, emoji: "🎓" },
                            {
                              label: "Start Date",
                              value: dateRange.from ? format(dateRange.from, "EEEE, d MMMM yyyy") : "—",
                              emoji: "📅",
                            },
                            {
                              label: "End Date",
                              value: dateRange.to ? format(dateRange.to, "EEEE, d MMMM yyyy") : "—",
                              emoji: "📅",
                            },
                          ]
                        : [
                            { label: "Service", value: form.service_detail, emoji: "💅" },
                            { label: "Duration", value: `${form.duration_minutes} Minutes`, emoji: "⏱️" },
                            {
                              label: "Date",
                              value: date ? format(date, "EEEE, d MMMM yyyy") : "—",
                              emoji: "📅",
                            },
                            { label: "Time Slot", value: form.preferred_time, emoji: "⏰" },
                          ]),
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0"
                      >
                        <span className="text-xl shrink-0">{row.emoji}</span>
                        <div className="flex-1 flex items-center justify-between gap-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                            {row.label}
                          </span>
                          <span className="text-sm font-semibold text-foreground text-right">{row.value}</span>
                        </div>
                      </div>
                    ))}
                    {form.price > 0 && (
                      <div className="mt-2 bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Total Price</p>
                        <p className="font-heading text-3xl font-black text-primary">R{form.price}</p>
                      </div>
                    )}
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
                      ⚠️ {error}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4/5: Payment & Proof */}
              {step === LAST_STEP && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" /> Pay Your Deposit
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Complete your payment below to officially secure your slot.
                    </p>
                  </div>
                  
                  {/* Banking Details */}
                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">
                      FNB Account
                    </p>
                    <p className="font-heading text-3xl font-black text-primary tracking-widest">63193553469</p>
                    <p className="text-sm text-muted-foreground mt-1">Branch: 250355</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Reference: <span className="font-semibold text-foreground">{form.client_name || "Your Name"}</span>
                    </p>
                  </div>

                  {/* Immediate Payment Alert Box */}
                  <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-sm text-rose-900 shadow-sm">
                    <p className="font-bold mb-2 flex items-center gap-2">
                      <span className="text-lg">🚨</span> IMMEDIATE PAYMENT REQUIRED
                    </p>
                    <p className="leading-relaxed">
                      You must select <strong>Immediate / Instant Clearance</strong> from your banking app. 
                      Standard transfers that take 24–48 hours to clear will <strong>not</strong> secure your booking. 
                      <br /><br />
                      Pay <strong>{isCourseBooking ? "R2,250 deposit" : "R100 deposit"}</strong> now{isCourseBooking ? " (balance of R2,250 due before course commencement)" : ""}, then send proof via WhatsApp below.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/27798060310?text=${encodeURIComponent(
                      `Hi Bloom Skills & Beauty! I've just made my ${
                        isCourseBooking ? "R2,250 registration" : "R100"
                      } deposit for ${form.client_name}.\nDate: ${ isCourseBooking ? dateRange.from ? format(dateRange.from, "d MMM yyyy") : "" : date ? format(date, "d MMM yyyy") : "" }\nTime: ${form.preferred_time}\n\nPlease find my proof of payment attached. Thank you!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors shadow-md">
                      💬 Send Proof of Payment via WhatsApp
                    </button>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation */}
          <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between gap-4 border-t border-border/40 pt-4">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => {
                  setStep(step - 1);
                  setError("");
                }}
                className="rounded-xl px-5"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            ) : (
              <div />
            )}
            {!isLastStep ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || loading || isSubmitting}
                className="rounded-xl px-6 bg-primary hover:bg-primary/90 text-primary-foreground ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Continue <ChevronRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/booking-confirmed", { state: { booking: bookingCreated } })}
                size="lg"
                className="rounded-xl px-8 bg-primary hover:bg-primary/90 text-primary-foreground ml-auto shadow-lg shadow-primary/20"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {isCourseBooking ? "I've Paid — Enrol Me" : "I've Paid — Confirm Booking"}
              </Button>
            )}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground mt-6">
          We'll confirm your {isCourseBooking ? "enrolment" : "appointment"} via WhatsApp shortly 💬
        </p>
      </div>
    </div>
  );
}