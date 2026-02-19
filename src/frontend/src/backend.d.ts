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
    getAllGroomers(): Promise<Array<Groomer>>;
    getGroomer(groomerId: bigint): Promise<Groomer | null>;
    registerGroomer(name: string, services: Array<Service>): Promise<bigint>;
    updateGroomerServices(groomerId: bigint, services: Array<Service>): Promise<void>;
}
