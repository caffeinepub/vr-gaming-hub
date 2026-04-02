import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";



actor {
  include MixinStorage();

  type Booking = {
    bookingId : Text;
    name : Text;
    phone : Text;
    date : Text;
    gamePackage : Text;
    groupSize : Nat;
    message : ?Text;
    screenshot : ?Storage.ExternalBlob;
  };

  let bookings = Map.empty<Text, Booking>();
  var nextBookingId = 0;

  type BookingInput = {
    name : Text;
    phone : Text;
    date : Text;
    gamePackage : Text;
    groupSize : Nat;
    message : ?Text;
    screenshot : ?Storage.ExternalBlob;
  };

  public shared ({ caller }) func addBooking(input : BookingInput) : async Text {
    let id = nextBookingId.toText();
    nextBookingId += 1;

    let booking : Booking = {
      input with
      bookingId = id;
    };
    bookings.add(id, booking);
    id;
  };

  public query ({ caller }) func getBookings() : async [Booking] {
    bookings.values().toArray();
  };

  public shared ({ caller }) func deleteBooking(bookingId : Text) : async () {
    if (not bookings.containsKey(bookingId)) {
      Runtime.trap("Booking not found");
    };
    bookings.remove(bookingId);
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

