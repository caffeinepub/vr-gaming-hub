import type { Booking } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "vrhub2024";

export function AdminDashboard() {
  const { actor, isFetching } = useActor();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const fetchBookings = useCallback(async () => {
    if (!actor) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await actor.getBookings();
      setBookings(data);
    } catch (_err) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (authenticated && actor && !isFetching) {
      fetchBookings();
    }
  }, [authenticated, actor, isFetching, fetchBookings]);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please try again.");
      setPasswordInput("");
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!actor) return;
    setDeletingId(bookingId);
    try {
      await actor.deleteBooking(bookingId);
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
      toast.success("Booking deleted");
    } catch (_err) {
      toast.error("Failed to delete booking");
    } finally {
      setDeletingId(null);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          <div className="border border-border rounded-2xl bg-card/80 backdrop-blur-sm p-8 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-full bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7 text-neon-blue" />
              </div>
              <h1 className="font-display font-black text-2xl text-foreground">
                Admin Access
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                VRHub Owner Dashboard
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="pr-10 bg-background border-border focus:border-neon-blue"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {authError && (
                <p className="text-sm text-destructive text-center">
                  {authError}
                </p>
              )}

              <Button
                onClick={handleLogin}
                disabled={!passwordInput}
                className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-bold"
              >
                Unlock Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-neon-blue" />
            <div>
              <h1 className="font-display font-black text-xl text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">VRHub Bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-ocid="admin.refresh.button"
              variant="outline"
              size="sm"
              onClick={fetchBookings}
              disabled={loading || isFetching}
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:text-neon-blue"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAuthenticated(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Lock className="w-4 h-4 mr-1" />
              Lock
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total bookings:</span>
          <span className="font-bold text-neon-blue text-sm">
            {bookings.length}
          </span>
        </div>

        {(loading || isFetching) && (
          <div
            data-ocid="admin.loading_state"
            className="flex items-center justify-center py-24"
          >
            <Loader2 className="w-8 h-8 text-neon-blue animate-spin mr-3" />
            <span className="text-muted-foreground">Loading bookings...</span>
          </div>
        )}

        {!loading && !isFetching && bookings.length === 0 && (
          <div
            data-ocid="admin.empty_state"
            className="text-center py-24 border border-dashed border-border rounded-2xl"
          >
            <ShieldCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg font-semibold">
              No bookings yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Bookings will appear here once customers submit the form.
            </p>
          </div>
        )}

        {!loading && !isFetching && bookings.length > 0 && (
          <div
            data-ocid="admin.table"
            className="rounded-xl border border-border overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow className="bg-card hover:bg-card border-border">
                  <TableHead className="text-neon-blue font-semibold">
                    Customer Name
                  </TableHead>
                  <TableHead className="text-neon-blue font-semibold">
                    Phone Number
                  </TableHead>
                  <TableHead className="text-neon-blue font-semibold">
                    Booking Date
                  </TableHead>
                  <TableHead className="text-neon-blue font-semibold">
                    Booking ID
                  </TableHead>
                  <TableHead className="text-neon-blue font-semibold">
                    Screenshot
                  </TableHead>
                  <TableHead className="text-neon-blue font-semibold text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow
                    key={booking.bookingId}
                    data-ocid={`admin.item.${index + 1}`}
                    className="border-border hover:bg-card/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {booking.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {booking.phone}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {booking.date}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-neon-blue font-semibold text-sm bg-neon-blue/10 px-2 py-1 rounded">
                        {booking.bookingId}
                      </span>
                    </TableCell>
                    <TableCell>
                      {booking.screenshot ? (
                        <a
                          href={booking.screenshot.getDirectURL()}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={booking.screenshot.getDirectURL()}
                            alt="Payment screenshot"
                            className="w-14 h-14 object-cover rounded-lg border border-border hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        data-ocid={`admin.delete_button.${index + 1}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(booking.bookingId)}
                        disabled={deletingId === booking.bookingId}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        {deletingId === booking.bookingId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        <span className="ml-1.5">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
