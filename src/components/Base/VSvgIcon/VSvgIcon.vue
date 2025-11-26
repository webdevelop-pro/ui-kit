<script setup lang="ts">
import { computed, markRaw, ref, watch, type Component } from 'vue';

const props = withDefaults(defineProps<{
  icon?: Component | string; // Vue component, absolute svg path in assets, or data with frontmatter.menuIcon
  iconColor?: string; // affects mask fallback and inherited color for svg components
  iconSize?: string; // width/height for the icon
}>(), {
  iconSize: '16px',
});

const isStringIcon = computed(() => typeof props.icon === 'string');
// Lazy load icons - not part of initial payload
const iconMap = import.meta.glob('UiKit/assets/images/**/*.svg', { eager: false, import: 'default' });

// Cache for loaded icons to avoid re-loading
const loadedIcons = ref<Record<string, Component>>({});
const currentIcon = ref<Component | null>(null);

// Load icon keys lazily when needed
let iconKeys: string[] | null = null;
const getIconKeys = async () => {
  if (!iconKeys) {
    iconKeys = Object.keys(iconMap);
  }
  return iconKeys;
};

const findByFileName = async (fileName: string) => {
  const keys = await getIconKeys();
  return keys.find(k => k.endsWith(`/${fileName}`));
};

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

// Load icon asynchronously without blocking main thread
const loadIcon = async (key: string): Promise<Component | null> => {
  if (loadedIcons.value[key]) {
    return loadedIcons.value[key];
  }
  
  if (iconMap[key]) {
    // Use requestIdleCallback to avoid blocking main thread, fallback to setTimeout
    const load = async () => {
      const result = await iconMap[key]();
      return result as Component;
    };
    
    let icon: Component;
    if (typeof requestIdleCallback !== 'undefined') {
      icon = await new Promise<Component>((resolve) => {
        requestIdleCallback(
          () => {
            load().then(resolve);
          },
          { timeout: 2000 }
        );
      });
    } else {
      // Fallback: use setTimeout to defer to next tick
      icon = await new Promise<Component>((resolve) => {
        setTimeout(() => {
          load().then(resolve);
        }, 0);
      });
    }
    
    // Mark component as non-reactive to avoid performance overhead
    loadedIcons.value[key] = markRaw(icon);
    return icon;
  }
  return null;
};

// When icon is an object with frontmatter.menuIcon or a string path, try to map to an imported svg component
const getSvgComponent = async (data: unknown): Promise<Component | null> => {
  // case: passed a Vue component already
  if (data && typeof data === 'object' && !('frontmatter' in (data as Record<string, unknown>))) {
    return null;
  }
  
  // Check for frontmatter.menuIcon
  const dataWithFrontmatter = data as { frontmatter?: { menuIcon?: string } } | null;
  const iconPath = dataWithFrontmatter?.frontmatter?.menuIcon;
  if (iconPath) {
    const resolved = resolveKey(iconPath);
    if (resolved) {
      const icon = await loadIcon(resolved);
      if (icon) return icon;
    }
    const byName = !iconPath.includes('/') && iconPath.endsWith('.svg') ? await findByFileName(iconPath) : undefined;
    if (byName) {
      const icon = await loadIcon(byName);
      if (icon) return icon;
    }
  }
  if (typeof data === 'string') {
    const key = resolveKey(data);
    if (key) {
      const icon = await loadIcon(key);
      if (icon) return icon;
    }
    if (!data.includes('/') && data.endsWith('.svg')) {
      const byName = await findByFileName(data);
      if (byName) {
        const icon = await loadIcon(byName);
        if (icon) return icon;
      }
    }
  }
  return null;
};

// Watch for icon changes and load asynchronously
watch(() => props.icon, async (newIcon) => {
  if (!newIcon) {
    currentIcon.value = null;
    return;
  }
  
  // If it's already a Vue component (not a string), use it directly
  if (typeof newIcon !== 'string' && typeof newIcon === 'object' && !('frontmatter' in (newIcon as Record<string, unknown>))) {
    currentIcon.value = null; // Let template handle direct component
    return;
  }
  
  // Try to load icon asynchronously (for string paths or objects with frontmatter)
  const component = await getSvgComponent(newIcon);
  // Mark component as non-reactive to avoid performance overhead
  currentIcon.value = component ? markRaw(component) : null;
}, { immediate: true });

// Fallback style for raw string icons using CSS masks
const stringIconStyle = computed(() => {
  if (!isStringIcon.value || !props.icon) return {} as Record<string, string>;
  const url = `url(${props.icon as string})`;
  return {
    width: props.iconSize,
    height: props.iconSize,
    backgroundColor: props.iconColor || 'currentColor',
    maskImage: url,
  } as Record<string, string>;
});
</script>

<template>
  <!-- Case 1: icon is a Vue component passed directly -->
  <component
    :is="icon as Component"
    v-if="!isStringIcon && icon && typeof icon !== 'string'"
    class="VSvgIcon v-svg-icon"
    :style="{ width: props.iconSize, height: props.iconSize, color: props.iconColor }"
    v-bind="$attrs"
  />

  <!-- Case 2: icon is a string path that maps to an imported svg component (loaded asynchronously) -->
  <component
    :is="currentIcon"
    v-else-if="currentIcon"
    class="VSvgIcon v-svg-icon"
    :style="{ width: props.iconSize, height: props.iconSize, color: props.iconColor }"
    v-bind="$attrs"
  />

  <!-- Case 3: icon is a raw string url, render via CSS mask -->
  <span
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
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-position: center;
    mask-position: center;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-size: contain;
    mask-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
</style>

