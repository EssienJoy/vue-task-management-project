<script setup>
	import { reactive } from "vue";
	import Input from "../ui/Input.vue";
	import Label from "../ui/Label.vue";
	import { signUpApi } from "../auth/signUp.js";
	import { useToast } from "vue-toastification";
	import { useMutation } from "@tanstack/vue-query";
	import { useRouter } from "vue-router";

	const toast = useToast();
	const router = useRouter();

	const form = reactive({
		userName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { mutate: signUp, isPending } = useMutation({
		mutationFn: signUpApi,
		onSuccess: () => {
			router.push("/login");
			toast.success("Account Successfully Created ✅");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	function handleSignUp() {
		if (form.password !== form.confirmPassword) {
			toast.error("Password does not match");
			return;
		}

		if (form.password.length < 4) {
			toast.error("Password must be 4 digit numbers or letters");
			return;
		}

		if (form.userName.length < 3) {
			toast.error("Username must not be less than 3 letters");
			return;
		}

		if (form.email.includes("@") && form.email.includes(".com")) {
			signUp({
				userName: form.userName,
				email: form.email,
				password: form.password,
				role: "user",
			});
		} else {
			toast.error("❌ Incorrect, email must include @ and .com");
		}
	}
</script>
<template>
	<form @submit.prevent="handleSignUp" className="flex flex-col gap-4">
		<div>
			<Label>User Name</Label>
			<Input
				v-model="form.userName"
				type="text"
				placeholder="Enter your name" />
		</div>

		<div>
			<Label className="block text-sm font-medium text-gray-700 mb-1">
				Email
			</Label>
			<Input v-model="form.email" type="email" placeholder="Enter your email" />
		</div>

		<div>
			<Label>Password</Label>
			<Input
				type="password"
				v-model="form.password"
				placeholder="Create a password" />
		</div>

		<div>
			<Label>Confirm Password</Label>
			<Input
				type="password"
				placeholder="Confirm your password"
				v-model="form.confirmPassword" />
		</div>

		<button
			type="submit"
			className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
			:disabled="isPending">
			{{ isPending ? "Signing Up" : "Sign Up" }}
		</button>
	</form>
</template>

<style></style>
