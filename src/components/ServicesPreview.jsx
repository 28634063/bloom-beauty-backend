import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { aboutImage, Drill, NailArt } from "@/lib/images";
import { useBookingPolicy } from "@/lib/BookingPolicyContext";

const services = [
  {
    title: "Nail Services",
    description: "Acrylic extensions, gel services, pedicures & stunning designs — from classic to bold.",
    icon: "💅",
    priceDisplay: "From R150",
    image: aboutImage,
    link: "/services#nails",
  },
  {
    title: "Beginner Nail Course",
    description: "2-week comprehensive beginner course with certificate, mentorship & training kit included.",
    icon: "🎓",
    priceDisplay: "R4,500",
    image: aboutImage,
    link: "/nail-course",
  },
  {
    title: "Nail Drill / E-File Masterclass",
    description: "Master electric filing techniques, safe cuticle work, prepping, debulking & refined finishing.",
    icon: "⚡",
    priceDisplay: "R1,500",
    image: Drill,
    link: "/nail-drill-masterclass",
  },
  {
    title: "Nail Art Masterclass",
    description: "Elevate your creativity with 3D art, French variations, ombré, marbling, chrome & trending designs.",
    icon: "🎨",
    priceDisplay: "R950",
    image: NailArt,
    link: "/nail-art-masterclass",
  },
];

export default function ServicesPreview() {
  const { openBookingModal } = useBookingPolicy();

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">Our Services & Academy</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card rounded-3xl border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group overflow-hidden flex flex-col justify-between will-change-transform"
            >
              <div>
                <div className="w-full h-48 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">{service.description}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-border/30 flex items-center justify-between mt-auto">
                <span className="font-heading text-sm font-bold text-primary">
                  {service.priceDisplay}
                </span>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-primary transition-colors group/link"
                >
                  Details
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => openBookingModal()}
            className="rounded-full px-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            Book Your Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}