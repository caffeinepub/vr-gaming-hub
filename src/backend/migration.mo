import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import List "mo:core/List";

module {
  type OldBooking = {
    name : Text;
    phone : Text;
    date : Time.Time;
    gamePackage : Text;
    groupSize : Nat;
    message : ?Text;
  };

  type OldActor = {
    bookings : Map.Map<Text, OldBooking>;
    scores : List.List<OldScore>;
  };

  type OldScore = {
    playerName : Text;
    game : Text;
    score : Nat;
    date : Time.Time;
  };

  type NewBooking = {
    bookingId : Text;
    name : Text;
    phone : Text;
    date : Text;
    gamePackage : Text;
    groupSize : Nat;
    message : ?Text;
  };

  type NewScore = {
    playerName : Text;
    game : Text;
    score : Nat;
    date : Time.Time;
  };

  type NewActor = {
    bookings : Map.Map<Text, NewBooking>;
    scores : List.List<NewScore>;
  };

  public func run(old : OldActor) : NewActor {
    {
      bookings = old.bookings.map<Text, OldBooking, NewBooking>(
        func(id, oldBooking) {
          {
            bookingId = id;
            name = oldBooking.name;
            phone = oldBooking.phone;
            date = "unknown";
            gamePackage = oldBooking.gamePackage;
            groupSize = oldBooking.groupSize;
            message = oldBooking.message;
          };
        }
      );
      scores = old.scores.map<OldScore, NewScore>(
        func(oldScore) {
          {
            playerName = oldScore.playerName;
            game = oldScore.game;
            score = oldScore.score;
            date = oldScore.date;
          };
        }
      );
    };
  };
};
