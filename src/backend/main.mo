import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Migration "migration";
import Runtime "mo:core/Runtime";

(with migration = Migration.run)
actor {
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

  var nextGroomerId = 0;

  let groomers = Map.empty<Nat, Groomer>();

  public shared ({ caller }) func registerGroomer(name : Text, services : [Service]) : async Nat {
    let groomerId = nextGroomerId;
    let groomer = {
      id = groomerId;
      name;
      rating = 0;
      services = services;
    };
    groomers.add(groomerId, groomer);
    nextGroomerId += 1;
    groomerId;
  };

  public shared ({ caller }) func updateGroomerServices(groomerId : Nat, services : [Service]) : async () {
    switch (groomers.get(groomerId)) {
      case (null) {
        Runtime.trap("Groomer not found");
      };
      case (?groomer) {
        let updatedGroomer = {
          id = groomer.id;
          name = groomer.name;
          rating = groomer.rating;
          services;
        };
        groomers.add(groomerId, updatedGroomer);
      };
    };
  };

  public query ({ caller }) func getGroomer(groomerId : Nat) : async ?Groomer {
    groomers.get(groomerId);
  };

  public query ({ caller }) func getAllGroomers() : async [Groomer] {
    groomers.values().toArray();
  };
};
