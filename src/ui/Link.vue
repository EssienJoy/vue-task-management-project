<script setup>
	import { RouterLink } from "vue-router";

	const props = defineProps({
		to: {
			type: String,
			required: true,
		},
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
</script>

<template>
	<RouterLink
		:to="to"
		:class="`px-6 py-3 rounded-lg font-bold ${textColor} ${bgColor} ${props.class}`">
		<slot></slot>
	</RouterLink>
</template>
