<template>
	<section
		class="min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
		<header class="bg-white shadow-sm">
			<div
				class="max-w-[var(--container-main)] mx-auto px-[var(--spacing-main)] py-4 flex items-center justify-between">
				<h1 class="text-xl sm:text-2xl font-bold text-gray-900">
					<RouterLink to="/" class="bg-transparent text-secondary">
						🎫 Ticketly
					</RouterLink>
				</h1>

				<!-- Desktop Navigation -->
				<nav class="hidden md:flex items-center gap-6">
					<Link to="/dashboard/tickets"> Manage Tickets </Link>
					<Button @click="logout">Logout</Button>
				</nav>

				<!-- Mobile Menu Button -->
				<button
					@click="toggleMobileMenu"
					class="md:hidden p-2 focus:outline-none"
					aria-label="Toggle menu">
					<svg
						v-if="!isMobileMenuOpen"
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16" />
					</svg>
					<svg
						v-else
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Mobile Menu -->
			<Transition name="slide-fade">
				<div
					v-if="isMobileMenuOpen"
					class="md:hidden border-t border-gray-200 bg-white">
					<nav class="px-[var(--spacing-main)] py-4 flex flex-col gap-3">
						<Link
							to="/dashboard/tickets"
							@click="closeMobileMenu"
							class="text-center">
							Manage Tickets
						</Link>
						<Button @click="handleLogout" class="w-full">Logout</Button>
					</nav>
				</div>
			</Transition>
		</header>

		<main
			class="flex-1 max-w-[var(--container-main)] mx-auto px-[var(--spacing-main)] py-6 sm:py-8 md:py-10">
			<h2
				class="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
				Welcome Back 👋
			</h2>

			<div
				v-if="isPending"
				class="text-xl sm:text-2xl h-dvh grid place-items-center">
				Loading...
			</div>

			<div
				v-else
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<div class="bg-white shadow-lg rounded-2xl p-5 sm:p-6 text-center">
					<h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">
						Total Tickets
					</h3>
					<p class="text-3xl sm:text-4xl font-bold text-accent">
						{{ totalTickets }}
					</p>
				</div>

				<div class="bg-white shadow-lg rounded-2xl p-5 sm:p-6 text-center">
					<h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">
						Open Tickets
					</h3>
					<p class="text-3xl sm:text-4xl font-bold text-yellow-500">
						{{ openTickets.length }}
					</p>
				</div>

				<div class="bg-white shadow-lg rounded-2xl p-5 sm:p-6 text-center">
					<h3 class="text-base sm:text-lg font-semibold text-gray-700 mb-2">
						Resolved Tickets
					</h3>
					<p class="text-3xl sm:text-4xl font-bold text-green-500">
						{{ resolvedTickets.length }}
					</p>
				</div>
			</div>

			<div class="mt-8 sm:mt-12 text-center">
				<Link to="/dashboard/tickets" class="inline-block w-full sm:w-auto">
					Go to Ticket Management
				</Link>
			</div>
		</main>
	</section>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { RouterLink } from "vue-router";
	import { useFetchTickets } from "../composables/useFetchTickets";
	import Link from "../ui/Link.vue";
	import Button from "../ui/Button.vue";
	import { useAuth } from "../composables/useAuth";

	const { tickets, isPending } = useFetchTickets();

	const totalTickets = computed(() => tickets.value?.length || 0);
	const openTickets = computed(
		() => tickets.value?.filter((t) => t.status === "open") || []
	);
	const resolvedTickets = computed(
		() => tickets.value?.filter((t) => t.status === "resolved") || []
	);

	const { logout } = useAuth();

	const isMobileMenuOpen = ref(false);

	const toggleMobileMenu = () => {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;
	};

	const closeMobileMenu = () => {
		isMobileMenuOpen.value = false;
	};

	const handleLogout = () => {
		closeMobileMenu();
		logout();
	};
</script>

<style scoped>
	.slide-fade-enter-active {
		transition: all 0.3s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.2s ease-in;
	}

	.slide-fade-enter-from {
		transform: translateY(-10px);
		opacity: 0;
	}

	.slide-fade-leave-to {
		transform: translateY(-10px);
		opacity: 0;
	}
</style>
