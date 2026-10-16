import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, MessageCircle, Clock, Zap, Gift } from "lucide-react";

const curriculum = [
  { title: "Correct bits to use", desc: "Understanding bit materials, shapes, grits, and specific applications." },
  { title: "Suitable speeds", desc: "Operating your e-file at safe, effective RPMs to prevent heat spikes and friction." },
  { title: "Cuticle sealing", desc: "Creating seamless cuticle flush for zero lifting and salon-quality regrowth." },
  { title: "Debulking", desc: "Effortlessly slimming down thick acrylics and polygel with precision." },
  { title: "Product removal", desc: "Safe, rapid enhancement removal without damaging the natural nail plate." },
  { title: "Refined filing", desc: "Achieving sharp, structured square, coffin, and almond shapes with machine precision." },
];

export default function NailDrillMasterclass() {
  const whatsappUrl = `https://wa.me/27798060310?text=${encodeURIComponent(
    "Hi Bloom Skills & Beauty! I would like to inquire/book the Nail Drill / E-File Masterclass (R1,500, 1 Day with Kit)."
  )}`;

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Comprehensive Hands-On Masterclass</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
            ⚡ Nail Drill / E-File Masterclass 💅
          </h1>
          <p className="font-heading italic text-primary text-lg mb-4">Learn. Perfect. Elevate.</p>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Upgrade your speed, safety, and precision. Master the electric file to save hours at your nail desk and provide cleaner, longer-lasting sets.
          </p>
        </div>

        {/* Main Details Card */}
        <div className="rounded-3xl border border-border/50 bg-card p-6 sm:p-10 shadow-lg mb-12">
          
          {/* Top Inclusions & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-border/60">
            <div className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-4">
              <Clock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Duration</p>
                <p className="font-heading text-lg font-bold text-foreground">1 Day</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-4">
              <Gift className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Included</p>
                <p className="font-heading text-sm font-bold text-foreground">Drill &amp; Bits</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <Zap className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-primary uppercase font-medium">Total Fee</p>
                <p className="font-heading text-2xl font-black text-primary">R1,500</p>
              </div>
            </div>
          </div>

          {/* Kit Inclusions Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 mb-8 flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-amber-500 shrink-0" />
            <div>
              <p className="font-bold text-foreground text-sm uppercase tracking-wide">Included with your class:</p>
              <p className="text-muted-foreground text-xs mt-0.5">
                • Quality Nail Drill Machine &nbsp;|&nbsp; • Set of Essential Professional Drill Bits
              </p>
            </div>
          </div>

          {/* Curriculum */}
          <h2 className="font-heading text-xl font-bold text-foreground mb-6">What You Will Learn:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {curriculum.map((item) => (
              <div key={item.title} className="bg-secondary/20 p-4 rounded-2xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/30 rounded-2xl p-8 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-4">
              Kit supplies are ordered in advance for each student. Book your spot today!
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-10 bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg">
                <MessageCircle className="w-5 h-5" />
                Book Your E-File Class via WhatsApp (079 806 0310)
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}