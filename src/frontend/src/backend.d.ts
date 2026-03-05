import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    gamePackage: string;
    date: Time;
    name: string;
    message?: string;
    phone: string;
    groupSize: bigint;
}
export type Time = bigint;
export interface Score {
    date: Time;
    game: string;
    score: bigint;
    playerName: string;
}
export interface backendInterface {
    addBooking(name: string, phone: string, date: Time, gamePackage: string, groupSize: bigint, message: string | null): Promise<void>;
    getBookings(): Promise<Array<Booking>>;
    getGlobalLeaderboard(): Promise<Array<Score>>;
    getLeaderboard(game: string): Promise<Array<Score>>;
    submitScore(playerName: string, game: string, score: bigint): Promise<void>;
}
