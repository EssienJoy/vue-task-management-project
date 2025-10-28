<template>
	<section
		class="relative min-h-dvh flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
		<div
			class="max-w-[var(--container-main)] mx-auto w-full px-[var(--spacing-main)] py-6 sm:py-8 md:py-12 flex-1 flex flex-col gap-6 sm:gap-8 md:gap-10">
			<header
				class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
				<div class="flex items-center gap-2 sm:gap-3">
					<Button
						@click="goBack"
						bgColor="bg-transparent"
						textColor="text-secondary"
						class="p-2">
						<i class="pi pi-arrow-left" style="font-size: 1.25rem"></i>
					</Button>

					<h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
						Ticket Management 🎫
					</h1>
				</div>

				<Button
					@click="toggleForm"
					bgColor="bg-green-400"
					class="w-full sm:w-auto">
					{{ showForm ? "Close" : "+ New Ticket" }}
				</Button>
			</header>

			<TicketsForm v-if="showForm" />

			<TicketCards :tickets="tickets" v-if="!isPending" />

			<p v-else class="text-xl sm:text-2xl h-dvh grid place-items-center">
				Loading...
			</p>
		</div>
	</section>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import { useRouter } from "vue-router";
	import { useFetchTickets } from "../composables/useFetchTickets";
	import TicketsForm from "../components/TicketsForm.vue";
	import TicketCards from "../components/TicketCards.vue";
	import Button from "../ui/Button.vue";

	const router = useRouter();
	const showForm = ref(false);

	const { tickets, isPending } = useFetchTickets();

	onMounted(() => {
		document.title = "Ticket Management | TicketApp";
	});

	function toggleForm() {
		showForm.value = !showForm.value;
	}

	function goBack() {
		router.back();
	}
</script>
