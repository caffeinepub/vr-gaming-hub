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
    bookingId: string;
    gamePackage: string;
    date: string;
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
    addBooking(bookingId: string, name: string, phone: string, date: string, gamePackage: string, groupSize: bigint, message: string | null): Promise<void>;
    deleteBooking(bookingId: string): Promise<void>;
    getBookings(): Promise<Array<Booking>>;
    getGlobalLeaderboard(): Promise<Array<Score>>;
    getLeaderboard(game: string): Promise<Array<Score>>;
    submitScore(playerName: string, game: string, score: bigint): Promise<void>;
}
