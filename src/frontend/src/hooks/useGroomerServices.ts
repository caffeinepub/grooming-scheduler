import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Service } from '../backend';
import { sampleGroomers } from '../lib/sampleGroomers';

export function useGroomerServices(groomerId: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['groomer-services', groomerId?.toString()],
    queryFn: async () => {
      if (!actor || groomerId === undefined) return [];
      
      // Check if this is a sample groomer (ID 1-3)
      const groomerIdNum = Number(groomerId);
      const sampleGroomer = sampleGroomers.find(g => Number(g.id) === groomerIdNum);
      
      if (sampleGroomer) {
        // Return sample services for sample groomers
        return sampleGroomer.services;
      }
      
      // Otherwise fetch from backend using getGroomer and extract services
      const groomer = await actor.getGroomer(groomerId);
      return groomer?.services || [];
    },
    enabled: !!actor && !isFetching && groomerId !== undefined,
  });
}
