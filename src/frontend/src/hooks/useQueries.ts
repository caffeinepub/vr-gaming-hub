import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookingInput, Score } from "../backend";
import { useActor } from "./useActor";

export function useGlobalLeaderboard() {
  const { actor, isFetching } = useActor();
  return useQuery<Score[]>({
    queryKey: ["leaderboard", "global"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGlobalLeaderboard();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLeaderboard(game: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Score[]>({
    queryKey: ["leaderboard", game],
    queryFn: async () => {
      if (!actor) return [];
      if (game === "global") return actor.getGlobalLeaderboard();
      return actor.getLeaderboard(game);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      playerName,
      game,
      score,
    }: {
      playerName: string;
      game: string;
      score: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitScore(playerName, game, score);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
}

export function useAddBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (input: BookingInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBooking(input);
    },
  });
}
