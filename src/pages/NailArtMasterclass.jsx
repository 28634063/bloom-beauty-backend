import { Button } from "@/components/ui/button";
import { Check, Sparkles, MessageCircle, Clock, UserCheck } from "lucide-react";
import { NailArt } from "@/lib/images";

const curriculum = [
  { title: "Advanced Nail Art", desc: "Master intricate line work, trending designs & advanced patterns." },
  { title: "Nail Art of Your Choice", desc: "Tailored to what you specifically want to master (French, 3D, chrome, ombré, etc.)." },
  { title: "Finishing Techniques", desc: "Flawless topcoat application, sharp lines & salon-grade longevity." },
  { title: "Bonus: Q&A Session", desc: "Ask any industry questions, product recommendations & client troubleshooting." },
  { title: "Personalised Guidance", desc: "1-on-1 hands-on correction and direct coaching tailored to your current skill level." },
];

export default function NailArtMasterclass() {
  const whatsappUrl = `https://wa.me/27798060310?text=${encodeURIComponent(
    "Hi Bloom Skills & Beauty! I would like to inquire/book the Nail Art Masterclass (R950, 1 Day)."
  )}`;

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">1-on-1 Upskilling Session</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
            🎨 Nail Art Masterclass ✨
          </h1>
          <p className="font-heading italic text-primary text-lg mb-4">Learn. Perfect. Elevate.</p>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Designed for nail techs who are looking to improve their nail art techniques and elevate the overall quality and speed of their work.
          </p>
        </div>

        <div className="mb-12 rounded-3xl overflow-hidden shadow-xl max-w-md mx-auto border border-border/50">
          <img src={NailArt} alt="Nail Art Masterclass" className="w-full h-auto object-cover max-h-[350px]" />
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-6 sm:p-10 shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pb-8 border-b border-border/60">
            <div className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-4">
              <Clock className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Duration</p>
                <p className="font-heading text-lg font-bold text-foreground">1 Day</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-4">
              <UserCheck className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Format</p>
                <p className="font-heading text-lg font-bold text-foreground">1-on-1 Session</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <Sparkles className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-primary uppercase font-medium">Course Fee</p>
                <p className="font-heading text-2xl font-black text-primary">R950</p>
              </div>
            </div>
          </div>

          <h2 className="font-heading text-xl font-bold text-foreground mb-6">What You'll Learn:</h2>
          <div className="space-y-4 mb-10">
            {curriculum.map((item) => (
              <div key={item.title} className="flex items-start gap-3.5 bg-secondary/20 p-4 rounded-2xl">
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

          {/* CTA - Fixed width and wrapping for mobile */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/30 rounded-2xl p-6 sm:p-8 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-4">
              Limited 1-on-1 slots available. Book your date directly via WhatsApp!
            </p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-10 bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg text-xs sm:text-sm whitespace-normal h-auto py-3">
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Inquire & Book via WhatsApp (079 806 0310)</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}