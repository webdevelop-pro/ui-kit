<script setup lang="ts">
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from 'lucide-vue-next';
import {
  VDropdownMenu,
  VDropdownMenuContent,
  VDropdownMenuItem,
  VDropdownMenuTrigger,
} from 'UiKit/components/Base/VDropdownMenu';
import {
  VSidebarGroup,
  VSidebarGroupContent,
  VSidebarGroupLabel,
  VSidebarMenu,
  VSidebarMenuButton,
  VSidebarMenuItem,
  useSidebar,
} from 'UiKit/components/Base/VSidebar';
import type { SidebarNavItem } from '../types';

const props = withDefaults(defineProps<{
  items?: SidebarNavItem[];
  label?: string;
  showActions?: boolean;
}>(), {
  items: () => [],
  label: undefined,
  showActions: true,
});

const emit = defineEmits<{
  select: [item: SidebarNavItem];
  action: [payload: { action: 'view' | 'share' | 'delete'; item: SidebarNavItem }];
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
    v-if="props.items.length"
    class="NavProjects nav-projects"
  >
    <VSidebarGroupLabel>{{ props.label ?? 'Projects' }}</VSidebarGroupLabel>

    <VSidebarGroupContent>
      <VSidebarMenu>
        <VSidebarMenuItem
          v-for="item in props.items"
          :key="item.id ?? item.title"
          class="group/item"
        >
          <div class="flex items-center gap-2">
            <VSidebarMenuButton
              :as="resolveLinkTag(item)"
              :class="props.showActions && !sidebar.isCollapsed.value ? 'pr-2' : ''"
              :is-active="Boolean(item.active)"
              :title="sidebar.isCollapsed.value ? item.title : undefined"
              v-bind="resolveLinkProps(item)"
              @click="handleSelect(item)"
            >
              <component
                :is="item.icon ?? Folder"
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

            <VDropdownMenu v-if="props.showActions && !sidebar.isCollapsed.value">
              <VDropdownMenuTrigger
                as-child
                :with-chevron="false"
              >
                <button
                  aria-label="Open project actions"
                  class="
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-sm
                    text-slate-400 opacity-0 transition hover:bg-slate-100
                    hover:text-slate-700 group-hover/item:opacity-100
                    data-[state=open]:bg-slate-100 data-[state=open]:text-slate-700
                  "
                  type="button"
                >
                  <MoreHorizontal class="h-4 w-4" />
                </button>
              </VDropdownMenuTrigger>

              <VDropdownMenuContent
                align="start"
                class="min-w-40 p-1"
                side="right"
                :side-offset="6"
              >
                <VDropdownMenuItem
                  class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-slate-700"
                  @select="emit('action', { action: 'view', item })"
                >
                  <Folder class="h-4 w-4" />
                  <span>View Project</span>
                </VDropdownMenuItem>
                <VDropdownMenuItem
                  class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-slate-700"
                  @select="emit('action', { action: 'share', item })"
                >
                  <Forward class="h-4 w-4" />
                  <span>Share Project</span>
                </VDropdownMenuItem>
                <VDropdownMenuItem
                  class="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-rose-600"
                  @select="emit('action', { action: 'delete', item })"
                >
                  <Trash2 class="h-4 w-4" />
                  <span>Delete Project</span>
                </VDropdownMenuItem>
              </VDropdownMenuContent>
            </VDropdownMenu>
          </div>
        </VSidebarMenuItem>
      </VSidebarMenu>
    </VSidebarGroupContent>
  </VSidebarGroup>
</template>
