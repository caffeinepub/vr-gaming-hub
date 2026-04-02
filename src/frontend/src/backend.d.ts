import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface BookingInput {
    gamePackage: string;
    date: string;
    name: string;
    message?: string;
    phone: string;
    screenshot?: ExternalBlob;
    groupSize: bigint;
}
export interface Score {
    date: Time;
    game: string;
    score: bigint;
    playerName: string;
}
export interface Booking {
    bookingId: string;
    gamePackage: string;
    date: string;
    name: string;
    message?: string;
    phone: string;
    screenshot?: ExternalBlob;
    groupSize: bigint;
}
export interface backendInterface {
    addBooking(input: BookingInput): Promise<string>;
    deleteBooking(bookingId: string): Promise<void>;
    getBookings(): Promise<Array<Booking>>;
    getGlobalLeaderboard(): Promise<Array<Score>>;
    getLeaderboard(game: string): Promise<Array<Score>>;
    submitScore(playerName: string, game: string, score: bigint): Promise<void>;
}
