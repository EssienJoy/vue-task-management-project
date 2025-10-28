<template>
	<form className="flex flex-col gap-4">
		<div>
			<Label>User Name</Label>
			<Input type="text" placeholder="Enter your name" />
		</div>

		<div>
			<Label className="block text-sm font-medium text-gray-700 mb-1">
				Email
			</Label>
			<Input type="email" placeholder="Enter your email" />
		</div>

		<div>
			<Label>Password</Label>
			<Input
				type="password"
				placeholder="Create a
			password" />
		</div>

		<div>
			<Label>Confirm Password</Label>
			<Input type="password" placeholder="Confirm your password" />
		</div>

		<button
			type="submit"
			className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
			Sign Up
		</button>
	</form>
</template>

<script setup>
	import Input from "../ui/Input.vue";
	import Label from "../ui/Label.vue";
</script>

<style></style>
