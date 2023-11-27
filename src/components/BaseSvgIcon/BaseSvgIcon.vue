<script setup lang="ts">
import { defineAsyncComponent, Component } from 'vue'
const props = defineProps<{
	name: string,
}>();

const { loader } = createIconMap().get(props.name) ?? {}
const IconComponent = loader ? defineAsyncComponent(loader) : null

function getIconNameFromPath(path: string) {
	const pathSplit = path.split('/')
	const filename = pathSplit[pathSplit.length - 1] || ''
	const iconName = filename.replace('.svg', '')
	
	return iconName
}

function createIconMap() {
	const importGlob = import.meta.glob('@/assets/**/*.svg')
	const iconMap = new Map<string, { loader: () => Promise<Component> }>([])
	
	for (const path in importGlob) {
		const iconName = getIconNameFromPath(path)
		iconMap.set(iconName, { loader: importGlob[path] })
	}
	
	return iconMap
}

</script>

<template>
	<IconComponent />
</template>
