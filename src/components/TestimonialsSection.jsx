import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useBookingPolicy } from "@/lib/BookingPolicyContext";

const reviews = [
  { name: "Naledi M.", rating: 5, text: "Absolutely obsessed with my nails! The attention to detail is unmatched. My set lasted over 3 weeks perfectly." },
  { name: "Thandi K.", rating: 5, text: "Best lashes I've ever had. So natural-looking yet stunning. I get compliments everywhere I go!" },
  { name: "Siphokazi D.", rating: 5, text: "Did the nail course and it was life-changing. The mentorship and training kit were so worth it. Highly recommend!" },
  { name: "Ayanda B.", rating: 5, text: "The vibe at Bloom is just so warm and welcoming. Always leave feeling like a queen. Won't go anywhere else!" },
];

export default function TestimonialsSection() {
  const { openBookingModal } = useBookingPolicy();

  return (
    <section className="py-24 px-4 sm:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">What Our Clients Say</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Loved by Every Client
          </h2>
        </motion.div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-3 text-sm">
                  {"★".repeat(review.rating)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                  "{review.text}"
                </p>
              </div>
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Call-to-Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-primary rounded-3xl p-10 sm:p-14 text-center text-primary-foreground"
        >
          <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-4">Ready to Bloom?</h3>
          <p className="opacity-90 mb-2 max-w-md mx-auto">
            Book your appointment today or enrol in our beginner nail course and start your beauty journey.
          </p>
          <p className="opacity-80 mb-8 max-w-md mx-auto text-sm font-medium">
            💳 Nail Course: <strong>R4,500</strong> (50% deposit) · Appointments: <strong>R100 deposit</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => openBookingModal()}
              className="rounded-full px-8 text-primary font-semibold"
            >
              Book Now
            </Button>
            <a href="https://wa.me/27798060310?text=Hi%20Bloom!%20I'd%20like%20to%20enquire." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90 font-semibold">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}