<script setup lang="ts">
import {
  VSidebar,
  VSidebarContent,
  VSidebarFooter,
  VSidebarHeader,
  VSidebarInset,
  VSidebarRail,
  useSidebar,
} from 'UiKit/components/Base/VSidebar';
import { computed } from 'vue';
import NavMain from './NavMain.vue';
import NavProjects from './NavProjects.vue';
import NavUser from './NavUser.vue';
import TeamSwitcher from './TeamSwitcher.vue';
import type { Sidebar07Props, SidebarNavItem, SidebarTeam } from '../types';

const props = withDefaults(defineProps<Sidebar07Props>(), {
  title: 'Workspace',
  subtitle: 'Sidebar block',
  mainNav: () => [],
  projects: () => [],
  teams: () => [],
  user: null,
  showHeaderOnMobile: true,
});

const emit = defineEmits<{
  select: [item: SidebarNavItem];
  teamSelect: [team: SidebarTeam];
  teamCreate: [];
  userAction: [action: 'settings' | 'password' | 'logout'];
}>();

const sidebar = useSidebar();
const showSidebarHeader = computed(() => (
  !sidebar.isMobile.value || props.showHeaderOnMobile
));
</script>

<template>
  <VSidebar class="Sidebar07Shell sidebar-07-shell">
    <VSidebarHeader v-if="showSidebarHeader">
      <slot
        name="header"
        :collapsed="sidebar.isCollapsed.value"
      >
        <TeamSwitcher
          :dropdown-component="props.teamDropdownComponent"
          :dropdown-props="props.teamDropdownProps"
          :teams="props.teams"
          :title="props.title"
          :subtitle="props.subtitle"
          @create="emit('teamCreate')"
          @select="emit('teamSelect', $event)"
        />
      </slot>
    </VSidebarHeader>

    <VSidebarContent>
      <slot
        name="main-nav"
        :collapsed="sidebar.isCollapsed.value"
        :items="props.mainNav"
      >
        <NavMain
          :items="props.mainNav"
          @select="$emit('select', $event)"
        />
      </slot>

      <slot
        name="projects"
        :collapsed="sidebar.isCollapsed.value"
        :items="props.projects"
      >
        <NavProjects
          :items="props.projects"
          @select="$emit('select', $event)"
        />
      </slot>
    </VSidebarContent>

    <slot
      name="pre-footer"
      :collapsed="sidebar.isCollapsed.value"
    />

    <VSidebarFooter>
      <slot
        name="footer"
        :collapsed="sidebar.isCollapsed.value"
      />
      <slot
        name="user"
        :collapsed="sidebar.isCollapsed.value"
        :user="props.user"
      >
        <NavUser
          :user="props.user"
          @action="emit('userAction', $event)"
        />
      </slot>
    </VSidebarFooter>
  </VSidebar>

  <VSidebarRail />

  <VSidebarInset class="min-h-screen bg-transparent">
    <slot />
  </VSidebarInset>
</template>
