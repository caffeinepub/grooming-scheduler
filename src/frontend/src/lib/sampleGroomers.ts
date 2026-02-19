import type { Groomer } from '../backend';

// Sample groomers with services for initial app state
export const sampleGroomers: Groomer[] = [
  {
    id: 1n,
    name: 'Happy Paws',
    rating: 5n,
    services: [
      {
        title: 'Bath & Blow Dry',
        description: 'A gentle bath followed by a professional blow dry for your pet.',
        priceRange: [30n, 50n],
      },
      {
        title: 'Nail Clipping',
        description: 'Safe and painless nail clipping service with filing.',
        priceRange: [10n, 20n],
      },
      {
        title: 'Full Grooming Package',
        description: 'Complete grooming including bath, haircut, nail trim, and ear cleaning.',
        priceRange: [60n, 100n],
      },
      {
        title: 'Teeth Brushing',
        description: 'Professional dental care to keep your pet\'s teeth clean and healthy.',
        priceRange: [15n, 25n],
      },
      {
        title: 'Flea & Tick Treatment',
        description: 'Effective flea and tick removal with preventative treatment.',
        priceRange: [20n, 35n],
      },
      {
        title: 'De-Shedding Treatment',
        description: 'Specialized treatment to reduce shedding and keep coat healthy.',
        priceRange: [35n, 55n],
      },
    ],
  },
  {
    id: 2n,
    name: 'Furry Friends Spa',
    rating: 4n,
    services: [
      {
        title: 'Full Grooming Package',
        description: 'Includes bath, haircut, nail clipping, and ear cleaning.',
        priceRange: [60n, 100n],
      },
      {
        title: 'Spa Treatment',
        description: 'Luxurious spa experience with aromatherapy and massage.',
        priceRange: [50n, 80n],
      },
      {
        title: 'Puppy\'s First Groom',
        description: 'Gentle introduction to grooming for puppies under 6 months.',
        priceRange: [25n, 40n],
      },
      {
        title: 'Breed-Specific Styling',
        description: 'Expert styling tailored to your pet\'s breed standards.',
        priceRange: [70n, 120n],
      },
      {
        title: 'Paw Pad Treatment',
        description: 'Moisturizing treatment for dry or cracked paw pads.',
        priceRange: [15n, 25n],
      },
      {
        title: 'Ear Cleaning',
        description: 'Thorough ear cleaning to prevent infections and discomfort.',
        priceRange: [12n, 20n],
      },
      {
        title: 'Sanitary Trim',
        description: 'Hygienic trimming for sensitive areas.',
        priceRange: [18n, 30n],
      },
    ],
  },
  {
    id: 3n,
    name: 'Pampered Pets',
    rating: 3n,
    services: [
      {
        title: 'Spa Treatment',
        description: 'Special spa treatment for your furry friends.',
        priceRange: [40n, 70n],
      },
      {
        title: 'Express Groom',
        description: 'Quick grooming service for pets on the go.',
        priceRange: [35n, 55n],
      },
      {
        title: 'Senior Pet Care',
        description: 'Gentle grooming designed for older pets with special needs.',
        priceRange: [45n, 75n],
      },
      {
        title: 'Coat Conditioning',
        description: 'Deep conditioning treatment for a soft, shiny coat.',
        priceRange: [25n, 40n],
      },
      {
        title: 'Face & Feet Trim',
        description: 'Precision trimming for face and paw areas.',
        priceRange: [20n, 35n],
      },
      {
        title: 'Medicated Bath',
        description: 'Therapeutic bath for pets with skin conditions.',
        priceRange: [40n, 65n],
      },
    ],
  },
];
