<script setup>
	import { reactive, ref, computed, watch } from "vue";
	import { useMutation, useQueryClient } from "@tanstack/vue-query";

	import { useToast } from "vue-toastification";
	import Label from "../ui/Label.vue";
	import Input from "../ui/Input.vue";
	import { createTicketApi } from "../servers/actions";

	const toast = useToast();
	const queryClient = useQueryClient();

	const form = reactive({
		title: "",
		description: "",
		password: "",
	});

	const titleError = ref("");
	const descError = ref("");

	watch(
		() => [form.title, form.description],
		() => {
			titleError.value =
				form.title.length > 70 ? "Title must not exceed 70 characters." : "";
			descError.value =
				form.description.length > 200
					? "Description must not exceed 200 characters."
					: "";
		}
	);

	const { mutate: createTicket, isPending: isCreating } = useMutation({
		mutationFn: createTicketApi,
		onSuccess: () => {
			toast.success("Ticket Successfully Created ✅");
			queryClient.invalidateQueries({ queryKey: ["tickets"], exact: true });
			form.title = "";
			form.description = "";
			titleError.value = "";
			descError.value = "";
		},
		onError: () => {
			toast.error("Error Creating Ticket ❌");
		},
	});

	function onSubmit() {
		if (form.title.length > 70 || form.description.length > 200) return;

		if (form.title.length < 4 || form.description.length < 4) {
			toast.error("Title and Description must not be less than 4 letters");
			return;
		}
		const newTicket = {
			id: Math.floor(1000 + Math.random() * 9000),
			title: form.title,
			description: form.description,
			status: "open",
			userId: localStorage.getItem("userId"),
			date: new Date().toISOString(),
		};

		createTicket(newTicket);
	}
</script>

<template>
	<form
		@submit.prevent="onSubmit"
		class="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 max-w-2xl">
		<h2 class="text-xl font-semibold text-gray-800">Create a New Ticket</h2>

		<div>
			<Label class="block text-sm font-medium text-gray-700 mb-1">
				Title <span class="text-red-500">*</span>
			</Label>

			<Input
				v-model="form.title"
				type="text"
				placeholder="Enter ticket title"
				:class="[
					'w-full border rounded-lg p-2 focus:outline-none focus:ring-2',
					titleError
						? 'border-red-400 focus:ring-red-300'
						: 'border-gray-300 focus:ring-blue-400',
				]" />

			<p class="text-sm text-gray-500 mt-1">
				{{ form.title.length }}/70 characters
			</p>
			<p v-if="titleError" class="text-sm text-red-500 mt-1">
				{{ titleError }}
			</p>
		</div>

		<div>
			<Label>Description</Label>
			<textarea
				v-model="form.description"
				placeholder="Describe the issue..."
				:class="[
					'w-full border rounded-lg p-2 h-24 focus:outline-none focus:ring-2',
					descError
						? 'border-red-400 focus:ring-red-300'
						: 'border-gray-300 focus:ring-blue-400',
				]"></textarea>

			<p class="text-sm text-gray-500 mt-1">
				{{ form.description.length }}/200 characters
			</p>
			<p v-if="descError" class="text-sm text-red-500 mt-1">
				{{ descError }}
			</p>
		</div>

		<button
			type="submit"
			class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
			:disabled="isCreating">
			{{ isCreating ? "Creating..." : "Create Ticket" }}
		</button>
	</form>
</template>

<style scoped></style>
