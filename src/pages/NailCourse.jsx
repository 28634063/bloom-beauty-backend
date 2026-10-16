import { Button } from "@/components/ui/button";
import { Check, CalendarDays, Award, Sparkles, MessageCircle } from "lucide-react";
import { BeginnerCourse } from "@/lib/images";

const modules = [
  { title: "Nail Anatomy & Hygiene", desc: "Proper sanitization, nail structure, and health safety standards." },
  { title: "Product Knowledge", desc: "Understanding acrylics, gels, monomers, primers, and bonding agents." },
  { title: "Tip Application & Sculpting", desc: "Correct sizing, seamless blending, and form placement." },
  { title: "Filing & Shaping", desc: "Achieving crisp square, almond, and coffin structures." },
  { title: "Gel Polish & Top Coats", desc: "Streak-free application, cuticle painting, and high-gloss sealing." },
  { title: "Business & Client Care", desc: "Pricing your services, maintaining retention, and setting up your workspace." },
];

export default function NailCourse() {
  const whatsappUrl = `https://wa.me/27798060310?text=${encodeURIComponent(
    "Hi Bloom Skills & Beauty! I would like to inquire/book the Beginner Nail Course (R4,500)."
  )}`;

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Professional Academy</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Beginner Nail Course 🎓
          </h1>
          <p className="font-heading italic text-primary text-lg mb-4">Launch Your Beauty Career</p>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Our comprehensive 2-week beginner course equips you with everything you need to start your journey as a certified, confident nail technician.
          </p>
        </div>

        <div className="mb-12 rounded-3xl overflow-hidden shadow-xl max-w-md mx-auto border border-border/50">
          <img src={BeginnerCourse} alt="Beginner Nail Course" className="w-full h-auto object-cover max-h-[350px]" />
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-6 sm:p-10 shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pb-8 border-b border-border/60">
            <div className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-4">
              <CalendarDays className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Duration</p>
                <p className="font-heading text-lg font-bold text-foreground">2 Weeks</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-secondary/40 rounded-2xl p-4">
              <Award className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Certification</p>
                <p className="font-heading text-sm font-bold text-foreground">Certificate Included</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <Sparkles className="w-8 h-8 text-primary shrink-0" />
              <div>
                <p className="text-xs text-primary uppercase font-medium">Course Fee</p>
                <p className="font-heading text-2xl font-black text-primary">R4,500</p>
              </div>
            </div>
          </div>

          <h2 className="font-heading text-xl font-bold text-foreground mb-6">Course Modules:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {modules.map((m) => (
              <div key={m.title} className="bg-secondary/20 p-4 rounded-2xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA - WhatsApp Inquire Only */}
          <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/30 rounded-2xl p-6 sm:p-8 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-4">
              Ready to start your beauty career? Secure your spot directly via WhatsApp!
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