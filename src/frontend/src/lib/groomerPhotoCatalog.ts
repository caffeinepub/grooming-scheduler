// Photo catalog mapping groomer IDs to local pet photo assets
export interface GroomerPhoto {
  path: string;
  alt: string;
}

export const groomerPhotoCatalog: Record<number, GroomerPhoto> = {
  1: {
    path: '/assets/generated/groomer-pet-1.dim_640x360.jpg',
    alt: 'Happy golden retriever after grooming session',
  },
  2: {
    path: '/assets/generated/groomer-pet-2.dim_640x360.jpg',
    alt: 'Fluffy cat enjoying spa treatment',
  },
  3: {
    path: '/assets/generated/groomer-pet-3.dim_640x360.jpg',
    alt: 'Pampered poodle with fresh haircut',
  },
  4: {
    path: '/assets/generated/groomer-pet-4.dim_640x360.jpg',
    alt: 'Adorable puppy after bath time',
  },
};

export function getGroomerPhoto(groomerId: number): GroomerPhoto | null {
  return groomerPhotoCatalog[groomerId] || null;
}
