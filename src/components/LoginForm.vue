<script setup>
	import { reactive } from "vue";
	import { useAuth } from "../composables/useAuth";
	import Input from "../ui/Input.vue";
	import Label from "../ui/Label.vue";

	const { login, loading } = useAuth();

	const form = reactive({
		email: "",
		password: "",
	});

	function handleFormSubmit() {
		login({ email: form.email, password: form.password });
	}
</script>

<template>
	<form @submit.prevent="handleFormSubmit" class="flex flex-col gap-4">
		<div>
			<Label>Email</Label>
			<Input v-model="form.email" type="email" placeholder="Enter your email" />
		</div>

		<div>
			<Label>Password</Label>
			<Input
				v-model="form.password"
				type="password"
				placeholder="Enter your password" />
		</div>

		<button
			type="submit"
			class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
			{{ loading ? "Logging..." : "Login" }}
		</button>
	</form>
</template>
