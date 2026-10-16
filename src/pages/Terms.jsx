import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <p className="text-primary text-sm font-medium uppercase tracking-widest mb-3">Policies</p>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">Client Booking Policy</h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          To ensure a smooth, professional and fair experience for all clients, please read and understand the following booking policies before securing your appointment.
        </p>
      </motion.div>
      
      <div className="space-y-10 text-muted-foreground leading-relaxed bg-card p-6 sm:p-10 md:p-12 rounded-3xl border border-border/50 shadow-sm">
        
        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">1. Bookings & Deposits</h2>
          <p className="text-sm">
            All appointments must be booked through the official booking platform. A non-refundable R100 booking deposit is required immediately upon booking to secure your appointment. The deposit must be paid within 15 minutes of placing your booking. Failure to make payment within this period will result in automatic cancellation of the booking, and the appointment slot may be released to another client. A booking is only secured once the required deposit has been received. Please ensure that you enter the correct contact details when booking and use the correct payment reference where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">2. Booking Confirmations</h2>
          <p className="text-sm">
            Once your deposit has been paid successfully, there is no need to call or send repeated messages requesting confirmation. Please retain your proof of payment. Due to a high volume of messages and bookings, confirmations may take time; however, all bookings will be confirmed no later than the day before the scheduled appointment. We kindly ask for your patience while we process bookings. If you have paid but have not received confirmation by the day before your appointment, please contact us with your booking details and proof of payment. A payment receipt alone does not replace a valid booking record, so please ensure your booking was successfully submitted on the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">3. Lateness Policy</h2>
          <p className="text-sm">
            A strict 15-minute grace period applies to all appointments. Arriving more than 15 minutes after your scheduled appointment time will result in cancellation, regardless of the reason for the delay. Late arrivals disrupt the schedule and inconvenience clients booked after you. If you anticipate being late, please notify us as soon as possible; however, notification does not guarantee that your appointment can be accommodated or that the cancellation policy will be waived. The booking deposit will be forfeited in the event of cancellation due to lateness.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">4. Cancellations & Rescheduling</h2>
          <p className="text-sm mb-4">
            The R100 booking deposit is non-refundable. Cancellations or requests to reschedule must be communicated at least 24 hours before the scheduled appointment. Requests made less than 24 hours before the appointment will be treated as late cancellations, and the deposit will be forfeited. Failure to arrive for an appointment without prior notice will be treated as a no-show, and the deposit will be forfeited. A new appointment will require a new booking and deposit. Any rescheduling request is subject to availability and is not considered approved until confirmed by The Nail Engineer.
          </p>
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5">
            <h3 className="font-bold text-rose-900 mb-2 text-sm uppercase tracking-widest">Refund Policy</h3>
            <p className="text-sm text-rose-800">
              The only exception is when The Nail Engineer cancels the appointment, in which case the R100 deposit will be refunded in full. If an appointment needs to be rescheduled by The Nail Engineer, you will be offered the option to accept the new appointment time or receive a full refund of your deposit.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">5. Changes to Bookings</h2>
          <p className="text-sm">
            Please select your service carefully when booking. Any changes to your selected service, length, design or appointment requirements must be communicated in advance and are subject to time availability and the applicable service prices. Additional services cannot be guaranteed on the day of your appointment, as appointment times are allocated according to the services booked. If a requested change requires more time than your original booking allows, the service may need to be adjusted or rescheduled.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">6. No-Shows & Missed Appointments</h2>
          <p className="text-sm">
            Failure to arrive for your appointment, arriving after the permitted grace period, or being unavailable at the agreed appointment time will be treated as a missed appointment. The booking deposit will be forfeited, and a new deposit will be required for any future booking. Repeated missed appointments may result in restrictions on future bookings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">7. Client Responsibility</h2>
          <p className="text-sm">
            Clients are responsible for checking their appointment date, time, selected service and contact details before completing a booking. Please arrive on time and ensure that your deposit has been paid within the required period. It is the client’s responsibility to communicate any booking concerns in advance and retain proof of payment until the appointment has been completed.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading font-bold text-foreground mb-3">8. Acceptance of Policy</h2>
          <p className="text-sm">
            By booking an appointment with The Nail Engineer, you acknowledge that you have read, understood and agreed to the booking policy. These policies apply equally to all clients to ensure fairness, consistency and respect for everyone’s time.
          </p>
        </section>

        <div className="pt-8 border-t border-border/60 text-center">
          <p className="text-sm font-medium text-foreground italic">
            Thank you for choosing The Nail Engineer. We appreciate your cooperation, patience and continued support as we strive to provide a professional, luxury nail experience.
          </p>
        </div>

      </div>
    </div>
  );
}