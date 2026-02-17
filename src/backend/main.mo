import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Order "mo:core/Order";

actor {
  type Service = {
    title : Text;
    description : Text;
    priceRange : (Nat, Nat);
  };

  module Service {
    public func compareByTitle(service1 : Service, service2 : Service) : Order.Order {
      Text.compare(service1.title, service2.title);
    };
  };

  type Groomer = {
    id : Nat;
    name : Text;
    rating : Nat;
    services : [Service];
  };

  module Groomer {
    public func compareByRating(groomer1 : Groomer, groomer2 : Groomer) : Order.Order {
      Nat.compare(groomer1.rating, groomer2.rating);
    };
  };

  func createGroomer(name : Text) : Groomer {
    let id = name.size(); // Use only size(), remove .toNat()
    let services : [Service] = [];
    {
      id;
      name;
      rating = 0;
      services;
    };
  };

  let groomers = Map.empty<Nat, Groomer>();

  public shared ({ caller }) func addGroomer(name : Text) : async () {
    let groomer = createGroomer(name);
    if (groomers.containsKey(groomer.id)) {
      Runtime.trap("Groomer with ID " # groomer.id.toText() # " already exists");
    };
    groomers.add(groomer.id, groomer);
  };

  public shared ({ caller }) func addServiceToGroomer(groomerId : Nat, title : Text, description : Text, priceRange : (Nat, Nat)) : async () {
    switch (groomers.get(groomerId)) {
      case (null) {
        Runtime.trap("Groomer with ID " # groomerId.toText() # " does not exist");
      };
      case (?groomer) {
        let service = {
          title;
          description;
          priceRange;
        };
        let updatedServices = groomer.services.concat([service]);
        let updatedGroomer = {
          id = groomer.id;
          name = groomer.name;
          rating = groomer.rating;
          services = updatedServices;
        };
        groomers.add(groomer.id, updatedGroomer);
      };
    };
  };

  public query ({ caller }) func getGroomer(groomerId : Nat) : async Groomer {
    switch (groomers.get(groomerId)) {
      case (null) {
        Runtime.trap("Groomer with ID " # groomerId.toText() # " does not exist");
      };
      case (?groomer) { groomer };
    };
  };

  public query ({ caller }) func getAllGroomers() : async [Groomer] {
    groomers.values().toArray().sort(Groomer.compareByRating); // Sorted by rating
  };

  public query ({ caller }) func getServicesForGroomer(groomerId : Nat) : async [Service] {
    switch (groomers.get(groomerId)) {
      case (null) {
        Runtime.trap("Groomer with ID " # groomerId.toText() # " does not exist");
      };
      case (?groomer) {
        groomer.services.sort(Service.compareByTitle); // Sorted by title
      };
    };
  };
};
