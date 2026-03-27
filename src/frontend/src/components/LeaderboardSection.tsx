import type { Score } from "@/backend.d";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLeaderboard, useSubmitScore } from "@/hooks/useQueries";
import { Loader2, Send, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const TABS = [
  { id: "global", label: "All Games", ocid: "leaderboard.all.tab" },
  { id: "VR Zombie Shooter", label: "Zombie", ocid: "leaderboard.zombie.tab" },
  { id: "VR Cricket", label: "Cricket", ocid: "leaderboard.cricket.tab" },
  { id: "Racing Simulator", label: "Racing", ocid: "leaderboard.racing.tab" },
  {
    id: "Multiplayer VR Battles",
    label: "Battles",
    ocid: "leaderboard.multiplayer.tab",
  },
  { id: "PS5 Gaming", label: "PS5", ocid: "leaderboard.ps5.tab" },
  { id: "Party Games", label: "Party", ocid: "leaderboard.party.tab" },
];

const rankColors = ["text-yellow-400", "text-slate-300", "text-amber-600"];

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-lg">🥇</span>;
  if (rank === 2) return <span className="text-lg">🥈</span>;
  if (rank === 3) return <span className="text-lg">🥉</span>;
  return (
    <span
      className={`font-display font-bold text-sm ${rankColors[rank - 1] ?? "text-muted-foreground"}`}
    >
      #{rank}
    </span>
  );
}

function LeaderboardTable({ game }: { game: string }) {
  const { data: scores, isLoading } = useLeaderboard(game);

  if (isLoading) {
    return (
      <div data-ocid="leaderboard.loading_state" className="space-y-2">
        {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
          <Skeleton key={k} className="h-12 w-full rounded-lg bg-muted/40" />
        ))}
      </div>
    );
  }

  const topScores = (scores ?? []).slice(0, 10);

  if (topScores.length === 0) {
    return (
      <div data-ocid="leaderboard.empty_state" className="py-12 text-center">
        <Trophy className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-muted-foreground">
          No scores yet. Be the first on the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {topScores.map((entry: Score, i) => (
        <motion.div
          key={`${entry.playerName}-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ x: 4, backgroundColor: "oklch(0.12 0.03 220 / 0.5)" }}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg border ${
            i < 3
              ? "border-yellow-400/30 bg-yellow-400/5"
              : "border-border bg-card/50"
          } transition-all hover:border-neon-blue/40`}
        >
          <div className="w-8 flex justify-center">
            <RankMedal rank={i + 1} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {entry.playerName}
            </p>
            <p className="text-muted-foreground text-xs truncate">
              {entry.game}
            </p>
          </div>
          <div className="font-display font-black text-neon-blue text-lg">
            {Number(entry.score).toLocaleString()}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SubmitScoreForm({ activeGame }: { activeGame: string }) {
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState("");
  const { mutateAsync: submitScore, isPending } = useSubmitScore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || !score.trim()) {
      toast.error("Please enter your name and score");
      return;
    }
    const scoreNum = Number(score);
    if (Number.isNaN(scoreNum) || scoreNum < 0) {
      toast.error("Please enter a valid score");
      return;
    }

    const gameName = activeGame === "global" ? "All Games" : activeGame;

    try {
      await submitScore({
        playerName: playerName.trim(),
        game: gameName,
        score: BigInt(Math.floor(scoreNum)),
      });
      toast.success("Score submitted! Check the leaderboard.");
      setPlayerName("");
      setScore("");
    } catch {
      toast.error("Failed to submit score. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-5 rounded-xl border border-neon-purple/30 bg-neon-purple/5"
    >
      <h4 className="font-display font-bold text-neon-purple mb-4 text-sm uppercase tracking-wider">
        Submit Your Score
      </h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 items-end"
      >
        <div className="flex-1 space-y-1.5">
          <Label className="text-foreground text-xs">Player Name</Label>
          <Input
            data-ocid="leaderboard.player.input"
            placeholder="Your gamer tag"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="bg-card border-border focus:border-neon-purple text-foreground text-sm"
          />
        </div>
        <div className="w-32 space-y-1.5">
          <Label className="text-foreground text-xs">Score</Label>
          <Input
            data-ocid="leaderboard.score.input"
            type="number"
            placeholder="0000"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="bg-card border-border focus:border-neon-purple text-foreground text-sm"
          />
        </div>
        <Button
          data-ocid="leaderboard.submit.button"
          type="submit"
          disabled={isPending}
          className="bg-neon-purple text-background hover:bg-neon-purple/90 font-bold shrink-0"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Submit
        </Button>
      </form>
    </motion.div>
  );
}

export function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <section id="leaderboard" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.78 0.25 220) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-neon-blue font-semibold uppercase tracking-widest text-sm mb-3">
            Leaderboard
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black">
            Hall of Fame —{" "}
            <span className="text-neon-blue glow-blue">Top Players</span>
          </h2>
          <div className="cyber-divider max-w-xs mx-auto mt-6" />
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap gap-1 h-auto bg-card border border-border p-1 rounded-xl mb-6 w-full">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                data-ocid={tab.ocid}
                className="text-xs sm:text-sm font-medium flex-1 data-[state=active]:bg-neon-blue data-[state=active]:text-background data-[state=active]:shadow-neon-blue"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <LeaderboardTable game={tab.id} />
            </TabsContent>
          ))}
        </Tabs>

        <SubmitScoreForm activeGame={activeTab} />
      </div>
    </section>
  );
}
