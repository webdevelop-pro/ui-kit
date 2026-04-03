# Vue UI Kit Architecture

A maintainable, updatable UI kit built on **shadcn-vue** with a clean separation between generated primitives and your custom component layer.

---

## Core Concept

Three layers with one rule: **app code only imports from `src/base/`**, never from `src/base/primitives/`.

```
App code
    ↓
src/base/          ← you own this (wrappers, logic, design)
    ↓
src/base/primitives/   ← shadcn owns this (re-runnable, safe to overwrite)
    ↓
src/styles/tokens/ ← design system (colors, spacing, typography, themes)
    ↓
tailwind.config    ← maps tokens → Tailwind utilities
```

When shadcn releases an update, re-run the `add` command. Only `primitives/` changes. Your `base/` layer and all your tokens are untouched.

---

## Folder Structure

```
src/
├── styles/
│   ├── tokens/
│   │   ├── _tokens.scss          # raw SCSS variables (colors, spacing, type)
│   │   ├── theme-default.scss    # maps tokens → CSS vars
│   │   ├── theme-brand-a.scss    # alternate theme (overrides only)
│   │   └── theme-brand-b.scss
│   ├── main.scss                 # entry: @use tokens + global resets
│   └── tailwind.css              # @import "tailwindcss" + @theme bridge
│
├── base/
│   ├── primitives/               # ← shadcn writes here (do not edit)
│   │   ├── button/
│   │   │   └── Button.vue
│   │   ├── accordion/
│   │   │   └── Accordion.vue
│   │   └── ...
│   │
│   ├── button/                   # ← you write here
│   │   ├── Button.vue            # wraps Button primitive
│   │   ├── Button.stories.ts
│   │   └── index.ts
│   ├── accordion/
│   │   ├── Accordion.vue
│   │   └── index.ts
│   └── index.ts                  # barrel export: export * from './button' …
│
└── lib/
    └── utils.ts                  # cn() helper (clsx + tailwind-merge)
```

---

## Step 1 — Configure shadcn to write into `primitives/`

In `components.json`, redirect the output path:

```json
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "default",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/tailwind.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "src/base/primitives",
    "utils": "src/lib/utils"
  }
}
```

Now every `pnpm dlx shadcn-vue@latest add <component>` drops into `src/base/primitives/` automatically.

---

## Step 2 — Token System

### `src/styles/tokens/_tokens.scss`
Raw values only — no CSS vars yet.

```scss
// Colors
$color-primary-50:  #f5f3ff;
$color-primary-400: #a78bfa;
$color-primary-500: #7c3aed;
$color-primary-900: #2e1065;

// Neutral
$color-neutral-50:  #fafafa;
$color-neutral-900: #0a0a0a;

// Spacing
$spacing-base: 4px;

// Radius
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-xl: 16px;

// Typography
$font-sans: 'Inter Variable', system-ui, sans-serif;
$font-mono: 'JetBrains Mono', monospace;

$text-sm:   0.875rem;
$text-base: 1rem;
$text-lg:   1.125rem;
```

### `src/styles/tokens/theme-default.scss`
Maps tokens to CSS custom properties.

```scss
@use 'tokens' as t;

:root {
  // Colors
  --color-primary:       #{t.$color-primary-500};
  --color-primary-soft:  #{t.$color-primary-50};

  // Radius
  --radius-sm:  #{t.$radius-sm};
  --radius-md:  #{t.$radius-md};
  --radius-lg:  #{t.$radius-lg};

  // Typography
  --font-sans:  #{t.$font-sans};
  --font-mono:  #{t.$font-mono};
}

// Dark mode
[data-theme="dark"],
.dark {
  --color-primary: #{t.$color-primary-400};
}
```

### `src/styles/tokens/theme-brand-a.scss`
Only override what differs — everything else inherits from default.

```scss
[data-theme="brand-a"] {
  --color-primary:      #e11d48;   // rose
  --color-primary-soft: #fff1f2;
}
```

### `src/styles/tailwind.css`
Bridge CSS vars into Tailwind v4 utilities.

```css
@import "tailwindcss";

@theme {
  --color-primary:      var(--color-primary);
  --color-primary-soft: var(--color-primary-soft);
  --radius-sm:          var(--radius-sm);
  --radius-md:          var(--radius-md);
  --radius-lg:          var(--radius-lg);
  --font-sans:          var(--font-sans);
  --font-mono:          var(--font-mono);
}
```

Now `class="bg-primary rounded-md font-sans"` all pull from your token layer. One source of truth.

---

## Step 3 — Wrapper Component Pattern

Your `base/` component wraps the primitive. You control the API, the extra props, and the custom styles. The primitive is a black box you update freely.

```vue
<!-- src/base/button/Button.vue -->
<script setup lang="ts">
import ButtonPrimitive from '@/base/primitives/button/Button.vue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'outline' | 'ghost' | 'brand'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}>(), {
  variant: 'default',
  size: 'md',
})

// Map your API → shadcn's API
const primitiveVariant = computed(() =>
  props.variant === 'brand' ? 'default' : props.variant
)
</script>

<template>
  <ButtonPrimitive
    v-bind="$attrs"
    :variant="primitiveVariant"
    :class="[
      variant === 'brand' && 'btn-brand',
      loading && 'opacity-60 pointer-events-none',
    ]"
  >
    <span v-if="loading" class="btn-loader" aria-hidden="true" />
    <slot />
  </ButtonPrimitive>
</template>
```

Your custom `btn-brand` class lives in your SCSS, never in the primitive. Updating the primitive cannot break your styles.

---

## Step 4 — Theme Switching at Runtime

```ts
// src/composables/useTheme.ts
import { ref } from 'vue'

export type ThemeName = 'default' | 'dark' | 'brand-a' | 'brand-b'

const current = ref<ThemeName>('default')

export function useTheme() {
  function setTheme(name: ThemeName) {
    document.documentElement.setAttribute('data-theme', name)
    current.value = name
  }

  return { current, setTheme }
}
```

Each `theme-*.scss` file scopes its overrides to `[data-theme="brand-a"]`. No JS bundle per theme, no CSS duplication — just an attribute swap.

---

## Step 5 — Enforce the Boundary with ESLint

Prevent accidental imports from `primitives/` in app code:

```js
// eslint.config.js
export default [
  {
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['*/base/primitives/*', '@/base/primitives/*'],
            message: 'Import from @/base instead, never from primitives directly.',
          }
        ]
      }]
    }
  }
]
```

---

## Update Workflow

When shadcn releases a new version of a component:

```bash
pnpm dlx shadcn-vue@latest add accordion
```

1. `src/base/primitives/accordion/` is overwritten — this is expected and safe
2. `src/base/accordion/Accordion.vue` is untouched
3. `src/styles/tokens/` is untouched
4. Check `git diff src/base/primitives/` to review what changed
5. Adjust your wrapper only if the primitive's public API changed

---

## Migrating to npm Package

Because `src/base/` is already a clean barrel, extracting it to a package requires minimal work:

```
packages/
└── ui/
    ├── src/
    │   ├── base/         # moved from app's src/base/
    │   └── styles/       # moved from app's src/styles/
    ├── index.ts
    └── package.json
```

```json
{
  "name": "@yourco/ui",
  "main": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./styles": "./src/styles/main.scss"
  }
}
```

Apps then import from `@yourco/ui` instead of `@/base`. No component internals change.

---

## Summary

| Layer | Path | Who edits | On shadcn update |
|---|---|---|---|
| Primitives | `src/base/primitives/` | shadcn CLI | overwritten — expected |
| Base components | `src/base/` | you | untouched |
| Design tokens | `src/styles/tokens/` | you | untouched |
| Tailwind bridge | `src/styles/tailwind.css` | you | untouched |

**The one rule**: app code imports from `@/base`, never from `@/base/primitives`.