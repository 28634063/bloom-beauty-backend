import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const BookingPolicyContext = createContext(null);

export function BookingPolicyProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [targetPath, setTargetPath] = useState("/book");
  const navigate = useNavigate();

  const openBookingModal = (path = "/book") => {
    setTargetPath(path);
    setAgreed(false);
    setIsOpen(true);
  };

  const handleProceed = () => {
    if (agreed) {
      setIsOpen(false);
      navigate(targetPath);
    }
  };

  return (
    <BookingPolicyContext.Provider value={{ openBookingModal }}>
      {children}

      <AnimatePresence>
        {isOpen && (
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
                
                {/* New Read More Link */}
                <div className="pt-3 mt-1 border-t border-rose-200/60 text-center">
                  <button 
                    onClick={() => { setIsOpen(false); navigate('/terms'); }} 
                    className="text-primary font-semibold hover:underline text-xs uppercase tracking-widest"
                  >
                    Read full Terms & Conditions
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer select-none mb-6 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">
                  I have read, understood, and agree to the policy
                </span>
              </label>

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-full py-5"
                >
                  Cancel
                </Button>
                <Button
                  disabled={!agreed}
                  onClick={handleProceed}
                  className="flex-1 rounded-full py-5 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
                >
                  Proceed to Book 💅
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BookingPolicyContext.Provider>
  );
}

export const useBookingPolicy = () => useContext(BookingPolicyContext);