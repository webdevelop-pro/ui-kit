<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import {
  VCollapsible,
  VCollapsibleContent,
  VCollapsibleTrigger,
} from 'UiKit/components/Base/VCollapsible';
import {
  VSidebarGroup,
  VSidebarGroupContent,
  VSidebarGroupLabel,
  VSidebarMenu,
  VSidebarMenuButton,
  VSidebarMenuItem,
  useSidebar,
} from 'UiKit/components/Base/VSidebar';
import { cn } from 'UiKit/lib/utils';
import type { SidebarNavItem } from '../types';

defineProps<{
  items?: SidebarNavItem[];
  label?: string;
}>();

const emit = defineEmits<{
  select: [item: SidebarNavItem];
}>();

const sidebar = useSidebar();

function resolveLinkTag(item: SidebarNavItem) {
  if (item.to) return 'router-link';
  if (item.href) return 'a';
  return 'button';
}

function resolveLinkProps(item: SidebarNavItem) {
  if (item.to) return { to: item.to };
  if (item.href) return { href: item.href };
  return { type: 'button' };
}

function handleSelect(item: SidebarNavItem) {
  if (sidebar.isMobile.value && (item.to || item.href)) {
    sidebar.setMobileOpen(false);
  }

  emit('select', item);
}
</script>

<template>
  <VSidebarGroup
    v-if="items?.length"
    class="NavMain nav-main"
  >
    <VSidebarGroupLabel>{{ label ?? 'Main Navigation' }}</VSidebarGroupLabel>

    <VSidebarGroupContent>
      <VSidebarMenu>
        <VSidebarMenuItem
          v-for="item in items"
          :key="item.id ?? item.title"
        >
          <VCollapsible
            v-if="item.items?.length && !sidebar.isCollapsed.value"
            class="group/collapsible"
            :default-open="item.active"
          >
            <VCollapsibleTrigger class="nav-main__trigger w-full">
              <VSidebarMenuButton
                :is-active="Boolean(item.active)"
                as="button"
                class="nav-main__button justify-between"
                type="button"
                @click="handleSelect(item)"
              >
                <span class="flex min-w-0 items-center gap-3">
                  <component
                    :is="item.icon"
                    v-if="item.icon"
                    class="h-4 w-4 shrink-0"
                  />
                  <span class="truncate">{{ item.title }}</span>
                </span>
                <ChevronRight
                  :class="[
                    'h-4 w-4 shrink-0 text-slate-400 transition duration-200',
                    'group-data-[state=open]/collapsible:rotate-90',
                  ]"
                />
              </VSidebarMenuButton>
            </VCollapsibleTrigger>

            <VCollapsibleContent class="overflow-hidden">
              <ul class="nav-main__submenu">
                <li
                  v-for="child in item.items"
                  :key="child.id ?? `${item.title}-${child.title}`"
                  class="nav-main__submenu-item"
                >
                  <component
                    :is="resolveLinkTag(child)"
                    v-bind="resolveLinkProps(child)"
                    :class="cn(
                      'nav-main__subitem',
                      child.active ? 'is--active' : '',
                      child.disabled ? 'is--disabled' : '',
                    )"
                    @click="handleSelect(child)"
                  >
                    <span class="truncate">{{ child.title }}</span>
                    <span
                      v-if="child.badge !== undefined"
                      class="nav-main__subitem-badge"
                    >
                      {{ child.badge }}
                    </span>
                  </component>
                </li>
              </ul>
            </VCollapsibleContent>
          </VCollapsible>

          <VSidebarMenuButton
            v-else
            :as="resolveLinkTag(item)"
            :class="cn(
              'nav-main__button',
              item.disabled ? 'pointer-events-none opacity-50' : '',
            )"
            :is-active="Boolean(item.active)"
            :title="sidebar.isCollapsed.value ? item.title : undefined"
            v-bind="resolveLinkProps(item)"
            @click="handleSelect(item)"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="h-4 w-4 shrink-0"
            />

            <template v-if="!sidebar.isCollapsed.value">
              <span class="min-w-0 flex-1 truncate text-left">{{ item.title }}</span>
              <span
                v-if="item.badge !== undefined"
                class="rounded-sm bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700"
              >
                {{ item.badge }}
              </span>
            </template>
          </VSidebarMenuButton>
        </VSidebarMenuItem>
      </VSidebarMenu>
    </VSidebarGroupContent>
  </VSidebarGroup>
</template>

<style scoped lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.nav-main {
  &__trigger {
    display: block;
  }

  &__button {
    text-decoration: none !important;
  }

  &__submenu {
    margin: 4px 0 0 28px;
    padding-left: 12px;
    border-left: 1px solid colors.$gray-20;
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
  }

  &__submenu-item {
    list-style: none;
  }

  &__subitem {
    display: flex;
    align-items: center;
    min-height: 32px;
    gap: 8px;
    padding: 0 8px;
    border-radius: 2px;
    color: colors.$gray-70;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
    text-decoration: none !important;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background: colors.$gray-10;
      color: colors.$black;
    }

    &.is--active {
      background: colors.$primary-light;
      color: colors.$primary;
    }

    &.is--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  &__subitem-badge {
    margin-left: auto;
    border-radius: 2px;
    background: colors.$gray-20;
    padding: 2px 8px;
    color: colors.$gray-70;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.2;
  }
}
</style>
