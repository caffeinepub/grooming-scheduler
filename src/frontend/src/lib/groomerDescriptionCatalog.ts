/**
 * Groomer description catalog providing 1-2 sentence English descriptions
 * for groomers with safe fallbacks.
 */

interface GroomerDescriptionEntry {
  id: number;
  description: string;
}

const groomerDescriptions: GroomerDescriptionEntry[] = [
  {
    id: 1,
    description: 'Specializing in gentle care and stress-free grooming experiences for pets of all sizes. Known for patience with anxious animals and attention to detail.',
  },
  {
    id: 2,
    description: 'Luxury spa treatments and breed-specific styling with aromatherapy options. Expert in show-quality grooming and pampering services.',
  },
  {
    id: 3,
    description: 'Fast, efficient grooming services perfect for busy pet parents. Offers express appointments and mobile grooming options.',
  },
  {
    id: 4,
    description: 'Certified in handling senior pets and special needs animals with extra care. Focuses on comfort and gentle techniques.',
  },
];

const defaultDescriptions = [
  'Professional grooming services with experienced handlers who care about your pet\'s comfort and well-being.',
  'Offering a full range of grooming services tailored to your pet\'s individual needs and personality.',
  'Dedicated to providing quality grooming with a focus on safety, cleanliness, and customer satisfaction.',
  'Expert grooming services designed to keep your pet looking and feeling their best.',
];

/**
 * Get a description for a groomer by ID or name.
 * Always returns a safe fallback if no specific match is found.
 */
export function getGroomerDescription(groomerId: number, groomerName?: string): string {
  // Try to find specific description by ID
  const entry = groomerDescriptions.find((d) => d.id === groomerId);
  if (entry) {
    return entry.description;
  }

  // Return a deterministic fallback based on groomer ID
  const fallbackIndex = groomerId % defaultDescriptions.length;
  return defaultDescriptions[fallbackIndex];
}
