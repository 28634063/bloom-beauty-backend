import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const nailServices = {
  title: "Nail Services",
  emoji: "💅",
  categories: [
    {
      name: "Acrylic Services",
      items: [
        { service: "Short Plain / Frenchie", price: 250 },
        { service: "Medium Plain / Frenchie", price: 280 },
        { service: "Long Plain / Frenchie", price: 300 },
      ],
    },
    {
      name: "Gel Services",
      items: [
        { service: "Rubberbase Gel", price: 250, from: true },
        { service: "Polygel", price: 280, from: true },
        { service: "Gel Extensions", price: 220, from: true },
      ],
    },
    {
      name: "Pedicure",
      items: [
        { service: "Gel Toes", price: 120 },
        { service: "Acrylic Frenchies / Plain", price: 160 },
        { service: "Rubberbase Frenchies / Plain", price: 150 },
        { service: "Polygel Frenchies / Plain", price: 200 },
      ],
    },
    {
      name: "Soak Off",
      items: [
        { service: "In-house Soak", price: 70 },
        { service: "Foreign Soak", price: 100 },
      ],
    },
    {
      name: "Enhancements ✨",
      items: [
        { service: "Frenchie Minimal Art", price: 20, from: true },
        { service: "Detailed Art", price: 50, from: true },
        { service: "3D Art", price: 30, from: true },
        { service: "Cateye", price: 50, from: true },
        { service: "Chrome", price: 50, from: true },
        { service: "Aura", price: 20, from: true },
      ],
      note: "Prices may vary depending on design complexity.",
    },
  ],
};

function PriceCategory({ category, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="mb-8 last:mb-0"
    >
      <h3 className="font-heading text-base font-semibold text-foreground mb-4 pb-2 border-b-2 border-primary/20 flex items-center gap-2">
        {category.name}
      </h3>
      <div className="space-y-3">
        {category.items.map((item) => (
          <div key={item.service} className="flex items-center justify-between group py-1">
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {item.service}
            </span>
            <div className="flex-1 mx-4 border-b border-dotted border-border/60" />
            <span className="text-sm font-bold text-primary">
              {item.from ? "from " : ""}R{item.price}
            </span>
          </div>
        ))}
      </div>
      {category.note && (
        <p className="text-xs italic text-muted-foreground mt-3">{category.note}</p>
      )}
    </motion.div>
  );
}

export default function Services() {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const navigate = useNavigate();

  const handleProceedToBooking = () => {
    if (policyAgreed) {
      setIsPolicyModalOpen(false);
      navigate("/book");
    }
  };

  return (
    <div className="py-12 sm:py-20 relative">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Our Menu</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Services & Prices
          </h1>
          <p className="font-heading italic text-primary text-lg mb-4">Bloom Skills & Beauty</p>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Professional nail art at Sangro House, Durban. Quality you can trust 💅
          </p>
        </motion.div>
      </div>

      {/* Price Lists */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12">
          <div id="nails">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl shadow-sm">
                {nailServices.emoji}
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">{nailServices.title}</h2>
            </div>
            <div className="bg-card rounded-3xl border border-border/50 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              {nailServices.categories.map((cat, i) => (
                <PriceCategory key={cat.name} category={cat} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground text-sm mb-6 italic">Ready to glow? Book your appointment today ✨</p>
          <Button
            size="lg"
            onClick={() => setIsPolicyModalOpen(true)}
            className="rounded-full px-12 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            Book Now 💅
          </Button>
        </div>
      </div>

      {/* Policy Agreement Pop-Up Modal */}
      <AnimatePresence>
        {isPolicyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-background border border-border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative"
            >
              <div className="text-center mb-6">
                <span className="text-4xl">⏰</span>
                <h3 className="font-heading text-2xl font-bold text-foreground mt-2">
                  Booking Policy Notice
                </h3>
                <p className="text-muted-foreground text-xs mt-1">
                  Please read and accept our policies before booking.
                </p>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 sm:p-5 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0">✅</span>
                  <p>
                    <strong className="text-foreground">No extra charge for being late:</strong> There is no fee penalty if you are running late.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0">❌</span>
                  <p>
                    <strong className="text-foreground">15-minute cancellation rule:</strong> Arriving <strong>15 minutes or later</strong> results in an automatic cancellation to avoid delaying subsequent clients.
                  </p>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer select-none mb-6 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={policyAgreed}
                  onChange={(e) => setPolicyAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  I have read, understood, and agree to the policy
                </span>
              </label>

              {/* Modal Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsPolicyModalOpen(false);
                    setPolicyAgreed(false);
                  }}
                  className="flex-1 rounded-full py-5"
                >
                  Cancel
                </Button>
                <Button
                  disabled={!policyAgreed}
                  onClick={handleProceedToBooking}
                  className="flex-1 rounded-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                >
                  Proceed to Book 💅
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}