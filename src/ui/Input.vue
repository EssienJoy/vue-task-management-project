<script setup>
	const props = defineProps({
		modelValue: {
			type: [String, Number],
			default: "",
		},
		type: {
			type: String,
			default: "text",
		},
		placeholder: {
			type: String,
			default: "",
		},
	});

	const emit = defineEmits(["update:modelValue"]);
</script>

<template>
	<input
		:type="type"
		:placeholder="placeholder"
		:value="modelValue"
		className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
		@input="emit('update:modelValue', $event.target.value)" />
</template>
