import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Groomer } from '../backend';
import { sampleGroomers } from '../lib/sampleGroomers';
import { getGroomerPhoto } from '../lib/groomerPhotoCatalog';
import { getGroomerDescription } from '../lib/groomerDescriptionCatalog';

export interface EnrichedGroomer extends Groomer {
  photoPath?: string;
  photoAlt?: string;
  description: string;
}

export interface UseGroomersResult {
  data: EnrichedGroomer[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  isSampleFallback: boolean;
  fallbackReason?: 'backend-error' | 'empty-backend';
}

export function useGroomers(): UseGroomersResult {
  const { actor, isFetching } = useActor();

  const query = useQuery<EnrichedGroomer[], Error, EnrichedGroomer[], [string]>({
    queryKey: ['groomers'],
    queryFn: async () => {
      if (!actor) return [];
      
      try {
        const backendGroomers = await actor.getAllGroomers();
        
        // If backend returns empty list, use sample groomers
        const groomersToEnrich = backendGroomers.length === 0 ? sampleGroomers : backendGroomers;
        
        // Enrich groomers with photo paths and descriptions
        return groomersToEnrich.map((groomer) => {
          const photo = getGroomerPhoto(Number(groomer.id));
          const description = getGroomerDescription(Number(groomer.id), groomer.name);
          return {
            ...groomer,
            photoPath: photo?.path,
            photoAlt: photo?.alt,
            description,
          };
        });
      } catch (error) {
        // Log the error for debugging
        console.error('Backend groomer fetch failed, falling back to sample data:', error);
        
        // Return enriched sample groomers instead of throwing
        return sampleGroomers.map((groomer) => {
          const photo = getGroomerPhoto(Number(groomer.id));
          const description = getGroomerDescription(Number(groomer.id), groomer.name);
          return {
            ...groomer,
            photoPath: photo?.path,
            photoAlt: photo?.alt,
            description,
          };
        });
      }
    },
    enabled: !!actor && !isFetching,
  });

  // Determine if we're using sample fallback and why
  const isSampleFallback = query.data !== undefined && query.data.length > 0 && 
    query.data.every(g => sampleGroomers.some(sg => sg.id === g.id));
  
  // Check if fallback is due to error (query was attempted but failed)
  const fallbackReason: 'backend-error' | 'empty-backend' | undefined = 
    isSampleFallback && query.dataUpdatedAt > 0 ? 'backend-error' : undefined;

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: null, // Never expose error since we handle it with fallback
    refetch: query.refetch,
    isSampleFallback,
    fallbackReason,
  };
}
