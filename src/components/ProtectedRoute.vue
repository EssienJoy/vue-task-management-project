<script setup>
	import { watch } from "vue";
	import { useRouter } from "vue-router";
	import { useAuth } from "../composables/useAuth";

	const { isAuthenticated } = useAuth();
	const router = useRouter();

	watch(
		isAuthenticated,
		(newValue) => {
			if (!newValue) router.push("/login");
		},
		{ immediate: true }
	);
</script>

<template>
	<div v-if="isAuthenticated">
		<RouterView />
	</div>
</template>
