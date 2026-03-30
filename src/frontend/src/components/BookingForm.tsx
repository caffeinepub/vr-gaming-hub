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
import { useActor } from "@/hooks/useActor";
import {
  CheckCircle,
  Download,
  Loader2,
  MessageSquare,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SHOP_PHONE = "918985866377";

const packageOptions = [
  { label: "VR Zombie Shooter", price: null },
  { label: "VR Cricket", price: null },
  { label: "Racing Simulator", price: null },
  { label: "Multiplayer VR Battles", price: null },
  { label: "PS5 Gaming", price: null },
  { label: "Party Games", price: null },
  { label: "Single Game Session (\u20b9199)", price: 199, isGroup: false },
  { label: "30 Minute VR Pass (\u20b9349)", price: 349, isGroup: false },
  { label: "1 Hour Unlimited (\u20b9599)", price: 599, isGroup: false },
  { label: "Group Package \u2013 \u20b9449/person", price: 449, isGroup: true },
  { label: "Birthday Party Package (\u20b92999)", price: 2999, isGroup: false },
];

function calcTotal(packageLabel: string, groupSize: number): number | null {
  const pkg = packageOptions.find((p) => p.label === packageLabel);
  if (!pkg || pkg.price === null) return null;
  if (pkg.isGroup) return pkg.price * Math.max(1, groupSize);
  return pkg.price;
}

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

function generateBookingId(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `VR-${digits}`;
}

export function BookingForm() {
  const { actor } = useActor();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [bookedName, setBookedName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = calcTotal(form.gamePackage, Number(form.groupSize) || 1);

  const getUpiLink = () => {
    if (totalAmount === null) return "#";
    return `upi://pay?pa=azhar.tabrez2021-3@okhdfcbank&pn=VR_HUB_HYD&am=${totalAmount}&cu=INR`;
  };

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
    setIsSubmitting(true);

    if (!actor) {
      toast.error("Connection not ready, please try again in a moment");
      setIsSubmitting(false);
      return;
    }

    const id = generateBookingId();

    try {
      await actor.addBooking(
        id,
        form.name.trim(),
        form.phone.trim(),
        form.date,
        form.gamePackage,
        BigInt(form.groupSize),
        form.message.trim() || null,
      );
    } catch (_err) {
      toast.error("Failed to save booking, please try again");
      setIsSubmitting(false);
      return;
    }

    setBookingId(id);
    setBookedName(form.name.trim());
    setSuccess(true);
    setForm(initialForm);
    setIsSubmitting(false);
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const getSmsLink = () => {
    const body = encodeURIComponent(
      `Hi VR Hub, I just booked a session. My Booking ID is ${bookingId} and my name is ${bookedName}.`,
    );
    return `sms:+91${SHOP_PHONE.replace(/^91/, "")}?body=${body}`;
  };

  const getQrValue = () => {
    const base = window.location.origin;
    return `${base}/verified-ticket?name=${encodeURIComponent(bookedName)}&id=${encodeURIComponent(bookingId)}`;
  };

  const getQrImageUrl = () => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(getQrValue())}&bgcolor=ffffff&color=0a0a1a&margin=10`;
  };

  const handleDownload = async () => {
    const link = document.createElement("a");
    link.download = `VRHub-Ticket-${bookingId}.png`;
    link.href = getQrImageUrl();
    link.target = "_blank";
    link.click();
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
          whileHover={{ scale: 1.01 }}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden"
        >
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
                <p className="text-muted-foreground mb-8">
                  We'll call you shortly to confirm your gaming slot.
                </p>

                {/* QR Code block with scanning glow */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex flex-col items-center mb-6"
                >
                  <div className="relative inline-block">
                    {/* Scanning glow ring */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px 0px rgba(0,200,255,0)",
                          "0 0 24px 8px rgba(0,200,255,0.45)",
                          "0 0 40px 16px rgba(0,200,255,0.2)",
                          "0 0 24px 8px rgba(0,200,255,0.45)",
                          "0 0 0px 0px rgba(0,200,255,0)",
                        ],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="rounded-2xl"
                    >
                      <div className="bg-background border-2 border-neon-blue/40 rounded-2xl p-4 inline-block">
                        <div className="bg-white rounded-lg p-3">
                          <img
                            src={getQrImageUrl()}
                            alt={`QR Code for booking ${bookingId}`}
                            width={200}
                            height={200}
                            className="rounded"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Corner scan lines */}
                    <span className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-neon-blue rounded-tl-sm" />
                    <span className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-neon-blue rounded-tr-sm" />
                    <span className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-neon-blue rounded-bl-sm" />
                    <span className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-neon-blue rounded-br-sm" />
                  </div>

                  <p className="text-xs text-muted-foreground mt-4 max-w-xs leading-relaxed">
                    🎟️ Save this ticket and show the QR code at the shop counter
                    to play.
                  </p>

                  {/* Download button */}
                  <Button
                    onClick={handleDownload}
                    size="sm"
                    className="mt-3 bg-neon-green/20 text-neon-green border border-neon-green/50 hover:bg-neon-green/30 font-semibold"
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-1.5" />
                    Download Ticket
                  </Button>
                </motion.div>

                {/* SMS Button */}
                <div className="mb-6">
                  <a href={getSmsLink()}>
                    <Button
                      size="lg"
                      className="bg-neon-purple text-white hover:bg-neon-purple/90 font-bold shadow-lg w-full sm:w-auto"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Send My Booking Code to the Shop
                    </Button>
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">
                    Opens your messaging app with the booking code pre-filled.
                  </p>
                </div>

                <div className="text-xs text-muted-foreground mb-6 space-y-1">
                  <p>
                    📍 2nd Floor, Al Quraishi Plex, Maruthi Nagar, Santosh
                    Nagar, Hyderabad
                  </p>
                  <p>
                    📞 089858 66377 &nbsp;|&nbsp; ⏰ 11:00 AM – 11:00 PM (All
                    Days)
                  </p>
                </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        <SelectItem key={opt.label} value={opt.label}>
                          {opt.label}
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

                {/* Total amount display */}
                {totalAmount !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between rounded-xl border border-neon-blue/30 bg-neon-blue/5 px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground font-medium">
                      Total Amount
                      {packageOptions.find((p) => p.label === form.gamePackage)
                        ?.isGroup
                        ? ` (${form.groupSize} × ₹449)`
                        : ""}
                    </span>
                    <span className="text-xl font-black text-neon-blue glow-blue">
                      ₹{totalAmount}
                    </span>
                  </motion.div>
                )}

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

                {/* UPI Pay button — shown only when a priced package is selected */}
                {totalAmount !== null && (
                  <a href={getUpiLink()} className="block">
                    <Button
                      type="button"
                      size="lg"
                      className="w-full bg-neon-green text-background font-bold text-lg py-6 hover:bg-neon-green/90 shadow-lg"
                    >
                      💳 Pay ₹{totalAmount} now
                    </Button>
                  </a>
                )}

                <Button
                  data-ocid="booking.submit.button"
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full bg-neon-blue text-background font-bold text-lg py-6 hover:bg-neon-blue/90 animate-pulse-glow shadow-neon-blue"
                >
                  {isSubmitting ? (
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
                      Book Now
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
