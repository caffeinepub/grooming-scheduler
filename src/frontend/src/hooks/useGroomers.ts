import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Groomer } from '../backend';

export function useGroomers() {
  const { actor, isFetching } = useActor();

  return useQuery<Groomer[]>({
    queryKey: ['groomers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGroomers();
    },
    enabled: !!actor && !isFetching,
  });
}
