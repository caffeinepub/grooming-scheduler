import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Service = {
    title : Text;
    description : Text;
    priceRange : (Nat, Nat);
  };

  type Groomer = {
    id : Nat;
    name : Text;
    rating : Nat;
    services : [Service];
  };

  type OldActor = {
    groomers : Map.Map<Nat, Groomer>;
  };

  type NewActor = {
    groomers : Map.Map<Nat, Groomer>;
    nextGroomerId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      groomers = old.groomers;
      nextGroomerId = old.groomers.size();
    };
  };
};
