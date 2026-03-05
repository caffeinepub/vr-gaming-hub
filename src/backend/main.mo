import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import List "mo:core/List";

actor {
  type Booking = {
    name : Text;
    phone : Text;
    date : Time.Time;
    gamePackage : Text;
    groupSize : Nat;
    message : ?Text;
  };

  // Booking System
  let bookings = Map.empty<Text, Booking>();

  public shared ({ caller }) func addBooking(name : Text, phone : Text, date : Time.Time, gamePackage : Text, groupSize : Nat, message : ?Text) : async () {
    let booking : Booking = {
      name;
      phone;
      date;
      gamePackage;
      groupSize;
      message;
    };
    bookings.add(name, booking);
  };

  public query ({ caller }) func getBookings() : async [Booking] {
    bookings.values().toArray();
  };

  // Leaderboard System
  type Score = {
    playerName : Text;
    game : Text;
    score : Nat;
    date : Time.Time;
  };

  module Score {
    public func compareByScore(score1 : Score, score2 : Score) : Order.Order {
      Nat.compare(score2.score, score1.score); // Descending
    };

    public func compareByDate(score1 : Score, score2 : Score) : Order.Order {
      Int.compare(score1.date, score2.date);
    };
  };

  let scores = List.empty<Score>();

  public shared ({ caller }) func submitScore(playerName : Text, game : Text, score : Nat) : async () {
    if (not (isValidGame(game))) { Runtime.trap("Invalid game name") };
    let newScore : Score = {
      playerName;
      game;
      score;
      date = Time.now();
    };
    scores.add(newScore);
  };

  public query ({ caller }) func getLeaderboard(game : Text) : async [Score] {
    scores.toArray().filter(func(entry) { entry.game == game }).sort(Score.compareByScore);
  };

  public query ({ caller }) func getGlobalLeaderboard() : async [Score] {
    scores.toArray().sort(Score.compareByScore);
  };

  // Helper Functions
  func isValidGame(game : Text) : Bool {
    let validGames = [
      "VR Zombie Shooter",
      "VR Cricket",
      "Racing Simulator",
      "Multiplayer VR Battles",
      "PS5 Gaming",
      "Party Games",
    ];
    validGames.any(func(validGame) { Text.equal(game, validGame) });
  };
};
