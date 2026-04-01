<script setup lang="ts">
import {
  BadgeCheck,
  ChevronsUpDown,
  KeyRound,
  LogOut,
} from 'lucide-vue-next';
import {
  VDropdownMenu,
  VDropdownMenuContent,
  VDropdownMenuItem,
  VDropdownMenuTrigger,
} from 'UiKit/components/Base/VDropdownMenu';
import {
  VSidebarMenu,
  VSidebarMenuButton,
  VSidebarMenuItem,
  useSidebar,
} from 'UiKit/components/Base/VSidebar';
import VAvatar from 'UiKit/components/VAvatar.vue';
import { computed } from 'vue';
import type { SidebarUser } from '../types';

const props = defineProps<{
  user?: SidebarUser | null;
}>();

const emit = defineEmits<{
  action: [action: 'settings' | 'password' | 'logout'];
}>();

const sidebar = useSidebar();
const dropdownSide = computed(() => {
  if (sidebar.isMobile.value) {
    return 'bottom';
  }

  return sidebar.isCollapsed.value ? 'right' : 'top';
});
const dropdownAlign = computed(() => (
  'start'
));
const dropdownSideOffset = computed(() => {
  if (sidebar.isMobile.value) {
    return 8;
  }

  return sidebar.isCollapsed.value ? 16 : 6;
});
const dropdownAlignOffset = computed(() => (
  sidebar.isCollapsed.value ? -8 : 0
));

function handleAction(action: 'settings' | 'password' | 'logout') {
  if (sidebar.isMobile.value) {
    sidebar.setMobileOpen(false);
  }

  emit('action', action);
}

const initials = computed(() => {
  const avatarText = props.user?.avatarText?.trim();

  if (avatarText) {
    return avatarText.slice(0, 2).toUpperCase();
  }

  return props.user?.name
    .split(' ')
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'U';
});
</script>

<template>
  <VSidebarMenu
    v-if="user"
    class="nav-user"
  >
    <VSidebarMenuItem>
      <VDropdownMenu>
        <VDropdownMenuTrigger
          as-child
          :with-chevron="false"
        >
          <VSidebarMenuButton
            as="button"
            class="nav-user__trigger"
            type="button"
          >
            <VAvatar
              size="small"
              :src="user.avatarSrc"
              class="nav-user__avatar"
            >
              <span>
                {{ initials }}
              </span>
            </VAvatar>

            <template v-if="!sidebar.isCollapsed.value">
              <span class="nav-user__copy">
                <span class="nav-user__name">{{ user.name }}</span>
                <span
                  v-if="user.email"
                  class="nav-user__email"
                >
                  {{ user.email }}
                </span>
              </span>

              <ChevronsUpDown class="nav-user__chevron" />
            </template>
          </VSidebarMenuButton>
        </VDropdownMenuTrigger>

        <VDropdownMenuContent
          :align="dropdownAlign"
          :align-offset="dropdownAlignOffset"
          class="nav-user__content"
          :side="dropdownSide"
          :side-offset="dropdownSideOffset"
        >
          <div class="nav-user__head">
            <VAvatar
              size="small"
              :src="user.avatarSrc"
              class="nav-user__avatar"
            >
              <span>
                {{ initials }}
              </span>
            </VAvatar>

            <span class="nav-user__copy">
              <span class="nav-user__name">{{ user.name }}</span>
              <span
                v-if="user.email"
                class="nav-user__email"
              >
                {{ user.email }}
              </span>
            </span>
          </div>

          <div class="nav-user__separator" />

          <VDropdownMenuItem
            class="nav-user__item v-dropdown__item"
            @select="handleAction('settings')"
          >
            <BadgeCheck class="h-4 w-4" />
            <span>User settings</span>
          </VDropdownMenuItem>
          <VDropdownMenuItem
            class="nav-user__item v-dropdown__item"
            @select="handleAction('password')"
          >
            <KeyRound class="h-4 w-4" />
            <span>Password</span>
          </VDropdownMenuItem>

          <div class="nav-user__separator" />

          <VDropdownMenuItem
            class="nav-user__item v-dropdown__item is--logout"
            @select="handleAction('logout')"
          >
            <LogOut class="h-4 w-4" />
            <span>Log out</span>
          </VDropdownMenuItem>
        </VDropdownMenuContent>
      </VDropdownMenu>
    </VSidebarMenuItem>
  </VSidebarMenu>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.nav-user {
  &__avatar {
    border: none;
    border-radius: 2px;
    background: colors.$gray-20;
    color: colors.$gray-70 !important;
    box-shadow: none;
  }

  &__trigger {
    width: 100%;
    min-height: 52px;
    padding: 10px 12px;
    border-radius: 2px;

    &[data-state='open'] {
      background: colors.$gray-10;
      color: colors.$black;
    }
  }

  [data-state='collapsed'] &__trigger {
    min-height: 44px;
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 2px;
  }

  &__content {
    min-width: 264px;
    padding: 8px 0;
    z-index: 1120;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px 12px;
  }

  &__copy {
    min-width: 0;
    flex: 1;
    text-align: left;
  }

  &__name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: colors.$black;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.35;
  }

  &__email {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: colors.$gray-60;
    font-size: 12px;
    line-height: 1.35;
  }

  &__chevron {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    color: colors.$gray-60;
  }

  &__separator {
    height: 1px;
    margin: 4px 0;
    background: colors.$gray-20;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    color: colors.$black;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
      background: colors.$gray-10;
    }

    &.is--logout {
      color: colors.$red;

      &:hover {
        background: colors.$red-light;
      }
    }
  }
}
</style>
