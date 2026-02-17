import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Service } from '../backend';

export function useGroomerServices(groomerId: bigint | undefined) {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['groomer-services', groomerId?.toString()],
    queryFn: async () => {
      if (!actor || groomerId === undefined) return [];
      return actor.getServicesForGroomer(groomerId);
    },
    enabled: !!actor && !isFetching && groomerId !== undefined,
  });
}
