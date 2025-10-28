<template>
	<form
		class="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 max-w-2xl"
		@submit.prevent="onSubmit">
		<h2 class="text-xl font-semibold text-gray-800">Create a New Ticket</h2>

		<div>
			<Label class="block text-sm font-medium text-gray-700 mb-1">
				Title <span class="text-red-500">*</span>
			</Label>
			<Input
				type="text"
				v-model="title"
				placeholder="Enter ticket title"
				:class="[
					'w-full border rounded-lg p-2 focus:outline-none focus:ring-2',
					titleError
						? 'border-red-400 focus:ring-red-300'
						: 'border-gray-300 focus:ring-blue-400',
				]" />
			<p class="text-sm text-gray-500 mt-1">{{ title.length }}/70 characters</p>
			<p v-if="titleError" class="text-sm text-red-500 mt-1">
				{{ titleError }}
			</p>
		</div>

		<div>
			<Label class="block text-sm font-medium text-gray-700 mb-1">
				Description
			</Label>
			<textarea
				v-model="description"
				placeholder="Describe the issue..."
				:class="[
					'w-full border rounded-lg p-2 h-24 focus:outline-none focus:ring-2',
					descError
						? 'border-red-400 focus:ring-red-300'
						: 'border-gray-300 focus:ring-blue-400',
				]"></textarea>
			<p class="text-sm text-gray-500 mt-1">
				{{ description.length }}/200 characters
			</p>
			<p v-if="descError" class="text-sm text-red-500 mt-1">{{ descError }}</p>
		</div>

		<div class="flex justify-end gap-3 items-center">
			<button
				type="submit"
				class="bg-green-500 text-primary font-semibold py-2 rounded-lg px-4">
				{{ isUpdating ? "Updating..." : "Update" }}
			</button>

			<button
				type="button"
				class="bg-red-500 text-primary font-semibold py-2 px-4 rounded-lg"
				@click="close">
				Cancel
			</button>
		</div>
	</form>
</template>

<script setup>
	import { ref, watch } from "vue";
	import { useMutation, useQueryClient } from "@tanstack/vue-query";
	import Label from "../ui/Label.vue";
	import Input from "../ui/Input.vue";
	import { editTicketApi } from "../servers/actions";

	import { useToast } from "vue-toastification";
	const toast = useToast();

	const emit = defineEmits(["cancel"]);

	const props = defineProps({
		titleValue: String,
		descriptionValue: String,
		selectedId: [String, Number],
	});

	const title = ref(props.titleValue || "");
	const description = ref(props.descriptionValue || "");
	const titleError = ref("");
	const descError = ref("");

	const queryClient = useQueryClient();

	const { mutate: updateTicket, isPending: isUpdating } = useMutation({
		mutationFn: ({ ticketData, id }) => editTicketApi(ticketData, id),
		onSuccess: () => {
			toast.success("Ticket Successfully Updated ✅");
			queryClient.invalidateQueries({ queryKey: ["tickets"] });
			title.value = "";
			description.value = "";
			titleError.value = "";
			descError.value = "";
		},
		onError: () => {
			toast.error("Error Updating Ticket");
		},
	});

	watch(title, (newVal) => {
		if (newVal.length > 70) {
			titleError.value = "Title must not exceed 70 characters.";
		} else {
			titleError.value = "";
		}
	});

	watch(description, (newVal) => {
		if (newVal.length > 200) {
			descError.value = "Description must not exceed 200 characters.";
		} else {
			descError.value = "";
		}
	});

	function onSubmit() {
		if (title.value.length > 70 || description.value.length > 200) return;

		if (title.value.length < 4 || description.value.length < 4) {
			toast.error("Title and Description must not be less than 4 letters");
			return;
		}

		updateTicket({
			id: props.selectedId,
			ticketData: {
				title: title.value,
				description: description.value,
				date: new Date().toISOString(),
			},
		});
	}

	function close() {
		emit("cancel");
	}
</script>

<style scoped>
	.text-primary {
		color: #fff;
	}
</style>
