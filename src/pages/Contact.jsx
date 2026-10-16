import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useBookingPolicy } from "@/lib/BookingPolicyContext";

const contactItems = [
  {
    icon: MapPin,
    title: "Location",
    detail: "Sangro House, Durban",
    action: "https://maps.google.com/?q=Sangro+House+Durban",
    actionLabel: "Get Directions",
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    detail: "079 806 0310",
    action: "tel:+27798060310",
    actionLabel: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "bloomskillsandbeauty@icloud.com",
    action: "mailto:bloomskillsandbeauty@icloud.com",
    actionLabel: "Send Email",
  },
  {
    icon: Clock,
    title: "Hours",
    detail: "Mon–Sat: 8am – 4pm (Closed Sundays)",
    action: null,
    actionLabel: null,
  },
];

export default function Contact() {
  const { openBookingModal } = useBookingPolicy();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            We'd love to hear from you. Reach out via WhatsApp, phone, email, or visit us at Sangro House.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border/50 p-6"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{item.title}</h3>
              <p
                className={`text-sm mb-4 ${
                  item.action && item.title === "Location"
                    ? "text-primary cursor-pointer hover:underline"
                    : "text-muted-foreground"
                }`}
                onClick={() => item.title === "Location" && window.open(item.action, "_blank")}
              >
                {item.detail}
              </p>
              {item.action && (
                <a href={item.action} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    {item.actionLabel}
                  </Button>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-green-50 border border-green-100 rounded-3xl p-6 sm:p-8 md:p-12 text-center"
        >
          <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
            Chat With Us on WhatsApp
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            The fastest way to reach us. Send a message and we'll respond right away!
          </p>
          <a
            href="https://wa.me/27798060310?text=Hi%20Bloom%20Skills%20%26%20Beauty!%20I'd%20like%20to%20make%20an%20enquiry."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="rounded-full px-8 bg-green-500 hover:bg-green-600 text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </a>
        </motion.div>

        {/* Bottom Booking CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => openBookingModal()}
            className="rounded-full px-10 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Book Your Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}