<template>
	<section
		className="min-h-dvh max-w-[var(--container-main)] mx-auto px-[var(--spacing-main)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
		<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
			<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
				Create Account 🎟️
			</h1>

			<SignupForm />

			<p className="text-sm text-center text-gray-600 mt-4">
				Already have an account?
				<Link to="/login" className="text-blue-600 hover:underline">
					Login
				</Link>
			</p>
		</div>
	</section>
</template>

<script setup>
	import SignupForm from "../components/SignupForm.vue";
	import Link from "../ui/Link.vue";
</script>

<style></style>
