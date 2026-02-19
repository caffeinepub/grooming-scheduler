import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Service } from '../backend';

interface RegisterGroomerParams {
  name: string;
  services: Service[];
}

export function useRegisterGroomer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, services }: RegisterGroomerParams) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return actor.registerGroomer(name, services);
    },
    onSuccess: () => {
      // Invalidate groomers query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['groomers'] });
    },
  });
}
