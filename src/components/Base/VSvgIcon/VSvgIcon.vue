<script setup lang="ts">
import { computed, type Component } from 'vue';

const props = withDefaults(defineProps<{
  icon?: Component | string; // Vue component, absolute svg path in assets, or data with frontmatter.menuIcon
  iconColor?: string; // affects mask fallback and inherited color for svg components
  iconSize?: string; // width/height for the icon
}>(), {
  iconSize: '16px',
});

const isStringIcon = computed(() => typeof props.icon === 'string');
const iconMap = import.meta.glob('UiKit/assets/images/**/*.svg', { eager: true, import: 'default' });

const iconKeys = Object.keys(iconMap);

const findByFileName = (fileName: string) => iconKeys.find(k => k.endsWith(`/${fileName}`));

const resolveKey = (p?: string) => {
  if (!p) return '';
  // Supported inputs:
  // 1) 'UiKit/assets/images/arrow-down.svg' (alias) → use as-is
  // 2) '/assets/images/arrow-down.svg' → 'UiKit/assets/images/arrow-down.svg'
  // 3) 'assets/images/arrow-down.svg' → 'UiKit/assets/images/arrow-down.svg'
  // 4) '/images/arrow-down.svg' or 'images/arrow-down.svg' → 'UiKit/assets/images/arrow-down.svg'
  // 5) '/arrow-down.svg' → search by filename
  if (p.startsWith('UiKit/')) return p;
  if (p.startsWith('/assets/images/')) return `../ui-kit/src/${p}`;
  if (p.startsWith('assets/images/')) return `../ui-kit/src/${p}`;
  if (p.startsWith('/images/')) return `../ui-kit/src/assets${p}`;
  if (p.startsWith('images/')) return `../ui-kit/src/assets/${p}`;
  if (!p.includes('/') && p.endsWith('.svg')) return `../ui-kit/src/assets/images/${p}`;
  if (p.includes('/') && p.endsWith('.svg')) return `../ui-kit/src/assets/images${p}`;
  return p;
};

// When icon is an object with frontmatter.menuIcon or a string path, try to map to an imported svg component
const getSvgComponent = (data: unknown) => {
  // case: passed a Vue component already
  if (data && typeof data === 'object' && !('frontmatter' in (data as any))) {
    return null;
  }
  const iconPath = (data as any)?.frontmatter?.menuIcon as string | undefined;
  if (iconPath) {
    const resolved = resolveKey(iconPath);
    if (resolved && iconMap[resolved]) return iconMap[resolved];
    const byName = !iconPath.includes('/') && iconPath.endsWith('.svg') ? findByFileName(iconPath) : undefined;
    if (byName && iconMap[byName]) return iconMap[byName];
  }
  if (typeof data === 'string') {
    const key = resolveKey(data);
    if (key && iconMap[key]) return iconMap[key];
    if (!data.includes('/') && data.endsWith('.svg')) {
      const byName = findByFileName(data);
      if (byName && iconMap[byName]) return iconMap[byName];
    }
  }
  return null;
};

// Fallback style for raw string icons using CSS masks
const stringIconStyle = computed(() => {
  if (!isStringIcon.value || !props.icon) return {} as Record<string, string>;
  const url = `url(${props.icon as string})`;
  return {
    width: props.iconSize,
    height: props.iconSize,
    backgroundColor: props.iconColor || 'currentColor',
    WebkitMaskImage: url,
    maskImage: url,
  } as Record<string, string>;
});
</script>

<template>
  <!-- Case 1: icon is a Vue component passed directly -->
  <component
    :is="icon as Component"
    v-if="!isStringIcon && icon"
    class="VSvgIcon v-svg-icon"
    :style="{ width: props.iconSize, height: props.iconSize, color: props.iconColor }"
    v-bind="$attrs"
  />

  <!-- Case 2: icon is a string path that maps to an imported svg component -->
  <component
    :is="getSvgComponent(icon)"
    v-else-if="getSvgComponent(icon)"
    class="VSvgIcon v-svg-icon"
    :style="{ width: props.iconSize, height: props.iconSize, color: props.iconColor }"
    v-bind="$attrs"
  />

  <!-- Case 3: icon is a raw string url, render via CSS mask -->
  <div
    v-else-if="props.icon && isStringIcon"
    class="VSvgIcon v-svg-icon v-svg-icon__background"
    :style="stringIconStyle"
    v-bind="$attrs"
  />
</template>

<style lang="scss">
.v-svg-icon {
  display: inline-block;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__background {
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>

