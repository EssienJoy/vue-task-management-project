<script setup>
	import { computed } from "vue";

	const props = defineProps({
		textColor: {
			type: String,
			default: "text-primary",
		},
		bgColor: {
			type: String,
			default: "bg-accent",
		},
		class: {
			type: String,
			default: "",
		},
	});

	const emit = defineEmits(["click"]);

	const buttonClasses = computed(() => {
		return `px-6 py-2 rounded-lg ${props.textColor} ${props.bgColor} font-bold ${props.class}`;
	});

	function handleClick(event) {
		emit("click", event);
	}
</script>

<template>
	<button :class="buttonClasses" @click="handleClick" v-bind="$attrs">
		<slot></slot>
	</button>
</template>
