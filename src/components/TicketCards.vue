<script setup>
	import { ref } from "vue";
	import { useMutation, useQueryClient } from "@tanstack/vue-query";
	import UpdateTicket from "./UpdateTicket.vue";

	import { useToast } from "vue-toastification";
	import Button from "../ui/Button.vue";
	import { deleteTicketApi } from "../servers/actions";

	const toast = useToast();
	const props = defineProps({
		tickets: {
			type: Array,
			required: true,
		},
	});

	const selectedId = ref(null);

	const queryClient = useQueryClient();

	const { mutate: deleteTicket, isPending: isDeleting } = useMutation({
		mutationFn: deleteTicketApi,
		onSuccess: () => {
			toast.success("Ticket Successfully Deleted ✅");
			queryClient.invalidateQueries({ queryKey: ["tickets"] });
		},
		onError: () => {
			toast.error("Error Deleting Ticket ❌");
		},
	});
</script>

<template>
	<section
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5 items-start">
		<div v-for="ticket in tickets" :key="ticket.id" class="grid gap-3">
			<div
				class="bg-primary shadow-md rounded-xl p-6 flex flex-col gap-3 border-t-4"
				:class="{
					'border-green-500': ticket.status === 'open',
					'border-amber-400': ticket.status === 'in progress',
					'border-gray-400':
						ticket.status !== 'open' && ticket.status !== 'in progress',
				}">
				<h3 class="text-lg font-semibold text-gray-800">{{ ticket.title }}</h3>
				<p class="text-gray-600 text-sm">{{ ticket.description }}</p>

				<span
					class="inline-block w-max px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
					{{ ticket.status }}
				</span>

				<div class="flex justify-end gap-3 mt-4">
					<Button
						bgColor="bg-green-400"
						@click="
							selectedId =
								Number(selectedId) === Number(ticket.id) ? null : ticket.id
						">
						Edit
					</Button>

					<Button
						bgColor="bg-red-400"
						:disabled="isDeleting"
						@click="deleteTicket(ticket.id)">
						{{ isDeleting ? "Deleting..." : "Delete" }}
					</Button>
				</div>
			</div>

			<UpdateTicket
				v-if="selectedId === ticket.id"
				:titleValue="ticket.title"
				:descriptionValue="ticket.description"
				:selectedId="selectedId"
				@cancel="selectedId = null" />
		</div>
	</section>
</template>

<style scoped></style>
