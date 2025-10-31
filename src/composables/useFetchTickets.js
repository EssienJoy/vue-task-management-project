import { useQuery } from '@tanstack/vue-query';
import { getTickets } from "../servers/actions.js";

export function useFetchTickets() {
    const { isPending, data: tickets } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
    });

    return { tickets, isPending };
}
