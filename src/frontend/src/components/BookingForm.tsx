import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAddBooking } from "@/hooks/useQueries";
import { AlertCircle, CheckCircle, Loader2, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const packageOptions = [
  "VR Zombie Shooter",
  "VR Cricket",
  "Racing Simulator",
  "Multiplayer VR Battles",
  "PS5 Gaming",
  "Party Games",
  "Single Game Session (₹199)",
  "30 Minute VR Pass (₹349)",
  "1 Hour Unlimited Gaming (₹599)",
  "Group Package – ₹449/person",
  "Birthday Party Package (₹2999)",
];

interface FormState {
  name: string;
  phone: string;
  date: string;
  gamePackage: string;
  groupSize: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  date: "",
  gamePackage: "",
  groupSize: "1",
  message: "",
};

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [success, setSuccess] = useState(false);
  const { mutateAsync: addBooking, isPending, isError } = useAddBooking();

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!/^\d{10}$/.test(form.phone.replace(/\s+/g, "")))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!form.date) newErrors.date = "Please select a date";
    if (!form.gamePackage) newErrors.gamePackage = "Please select a package";
    const gs = Number(form.groupSize);
    if (!form.groupSize || Number.isNaN(gs) || gs < 1)
      newErrors.groupSize = "Enter valid group size";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const dateMs = new Date(form.date).getTime();
    const dateNs = BigInt(dateMs) * 1_000_000n;

    try {
      await addBooking({
        name: form.name.trim(),
        phone: form.phone.trim(),
        date: dateNs,
        gamePackage: form.gamePackage,
        groupSize: BigInt(form.groupSize),
        message: form.message.trim() || null,
      });
      setSuccess(true);
      setForm(initialForm);
      toast.success("Booking confirmed! We'll call you to confirm your slot.");
    } catch {
      toast.error("Booking failed. Please try WhatsApp or call us directly.");
    }
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass =
    "bg-card border-border focus:border-neon-blue focus:ring-neon-blue/30 text-foreground placeholder:text-muted-foreground";

  return (
    <section id="booking" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-neon-blue font-semibold uppercase tracking-widest text-sm mb-3">
            Online Booking
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Book Your{" "}
            <span className="text-neon-blue glow-blue">Session Now</span>
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden"
        >
          {/* Decorative corner glow */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-neon-blue/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                data-ocid="booking.success_state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-10"
              >
                <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-4" />
                <h3 className="font-display font-black text-2xl text-foreground mb-2">
                  Booking Confirmed! 🎮
                </h3>
                <p className="text-muted-foreground mb-6">
                  We'll call you shortly to confirm your gaming slot.
                </p>
                <Button
                  onClick={() => setSuccess(false)}
                  className="bg-neon-blue text-background hover:bg-neon-blue/90"
                >
                  Book Another Session
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {isError && (
                  <div
                    data-ocid="booking.error_state"
                    className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/40 text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Connection failed. Try WhatsApp or call us at 089858 66377.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="booking-name"
                      className="text-foreground font-semibold"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="booking-name"
                      data-ocid="booking.name.input"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="booking-phone"
                      className="text-foreground font-semibold"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="booking-phone"
                      data-ocid="booking.phone.input"
                      type="tel"
                      placeholder="10-digit phone"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs">{errors.phone}</p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="booking-date"
                      className="text-foreground font-semibold"
                    >
                      Date *
                    </Label>
                    <Input
                      id="booking-date"
                      data-ocid="booking.date.input"
                      type="date"
                      value={form.date}
                      onChange={(e) => setField("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                    {errors.date && (
                      <p className="text-destructive text-xs">{errors.date}</p>
                    )}
                  </div>

                  {/* Group Size */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="booking-group"
                      className="text-foreground font-semibold"
                    >
                      Group Size *
                    </Label>
                    <Input
                      id="booking-group"
                      data-ocid="booking.group_size.input"
                      type="number"
                      min="1"
                      max="50"
                      placeholder="Number of people"
                      value={form.groupSize}
                      onChange={(e) => setField("groupSize", e.target.value)}
                      className={inputClass}
                    />
                    {errors.groupSize && (
                      <p className="text-destructive text-xs">
                        {errors.groupSize}
                      </p>
                    )}
                  </div>
                </div>

                {/* Package */}
                <div className="space-y-1.5">
                  <Label className="text-foreground font-semibold">
                    Game / Package *
                  </Label>
                  <Select
                    value={form.gamePackage}
                    onValueChange={(v) => setField("gamePackage", v)}
                  >
                    <SelectTrigger
                      data-ocid="booking.package.select"
                      className={inputClass}
                    >
                      <SelectValue placeholder="Select a game or package" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {packageOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.gamePackage && (
                    <p className="text-destructive text-xs">
                      {errors.gamePackage}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-message"
                    className="text-foreground font-semibold"
                  >
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="booking-message"
                    data-ocid="booking.message.textarea"
                    placeholder="Any special requests or questions?"
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    rows={3}
                    className={inputClass}
                  />
                </div>

                <Button
                  data-ocid="booking.submit.button"
                  type="submit"
                  disabled={isPending}
                  size="lg"
                  className="w-full bg-neon-blue text-background font-bold text-lg py-6 hover:bg-neon-blue/90 animate-pulse-glow shadow-neon-blue"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        data-ocid="booking.loading_state"
                        className="w-5 h-5 animate-spin"
                      />
                      Confirming Booking...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
