<script setup>
	import logo from "../assets/logo.jpg";
	import { RouterLink } from "vue-router";
	import Link from "../ui/Link.vue";
	import { ref } from "vue";

	const isMobileMenuOpen = ref(false);

	const toggleMobileMenu = () => {
		isMobileMenuOpen.value = !isMobileMenuOpen.value;
	};

	const closeMobileMenu = () => {
		isMobileMenuOpen.value = false;
	};
</script>

<template>
	<header class="py-6">
		<div
			class="flex items-center justify-between max-w-[var(--container-main)] mx-auto px-[var(--spacing-main)]">
			<div class="flex items-center gap-3 font-bold">
				<img
					class="w-7 h-7 object-cover rounded-3xl"
					v-bind:src="logo"
					alt="logo" />
				<h1>Ticketly</h1>
			</div>

			<!-- Desktop Navigation -->
			<nav class="hidden md:block">
				<ul class="text-md font-bold flex items-center gap-7">
					<li>
						<RouterLink to="/">Home</RouterLink>
					</li>
					<li>
						<RouterLink to="/dashboard">Dashboard</RouterLink>
					</li>
				</ul>
			</nav>

			<!-- Desktop Auth Buttons -->
			<div class="hidden md:flex items-center gap-3">
				<Link
					to="/login"
					bgColor="bg-transparent"
					textColor="text-accent"
					class="border-2 border-solid border-accent">
					Login
				</Link>
				<Link to="/signup">Get Started</Link>
			</div>

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
				class="md:hidden mt-4 px-[var(--spacing-main)] pb-4">
				<nav class="mb-4">
					<ul class="flex flex-col gap-4 font-bold">
						<li>
							<RouterLink to="/" @click="closeMobileMenu"> Home </RouterLink>
						</li>
						<li>
							<RouterLink to="/dashboard" @click="closeMobileMenu">
								Dashboard
							</RouterLink>
						</li>
					</ul>
				</nav>

				<div class="flex flex-col gap-3">
					<Link
						to="/login"
						bgColor="bg-transparent"
						textColor="text-accent"
						class="border-2 border-solid border-accent text-center"
						@click="closeMobileMenu">
						Login
					</Link>
					<Link to="/signup" class="text-center" @click="closeMobileMenu">
						Get Started
					</Link>
				</div>
			</div>
		</Transition>
	</header>
</template>

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
