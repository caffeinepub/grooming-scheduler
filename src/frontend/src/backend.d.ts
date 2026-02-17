import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Service {
    title: string;
    description: string;
    priceRange: [bigint, bigint];
}
export interface Groomer {
    id: bigint;
    name: string;
    rating: bigint;
    services: Array<Service>;
}
export interface backendInterface {
    addGroomer(name: string): Promise<void>;
    addServiceToGroomer(groomerId: bigint, title: string, description: string, priceRange: [bigint, bigint]): Promise<void>;
    getAllGroomers(): Promise<Array<Groomer>>;
    getGroomer(groomerId: bigint): Promise<Groomer>;
    getServicesForGroomer(groomerId: bigint): Promise<Array<Service>>;
}
