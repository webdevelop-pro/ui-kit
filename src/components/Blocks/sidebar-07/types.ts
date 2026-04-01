import type { Component } from 'vue';
import type { SidebarCollapsible, SidebarSide } from 'UiKit/components/Base/VSidebar';

export interface SidebarNavItem {
  id?: string;
  title: string;
  href?: string;
  to?: string | Record<string, unknown>;
  icon?: Component;
  badge?: string | number;
  active?: boolean;
  disabled?: boolean;
  items?: SidebarNavItem[];
}

export interface SidebarUser {
  name: string;
  email?: string;
  role?: string;
  avatarSrc?: string;
  avatarText?: string;
}

export interface SidebarTeam {
  id: string | number;
  title: string;
  subtitle?: string;
  avatarSrc?: string;
  avatarText?: string;
  active?: boolean;
}

export interface Sidebar07Props {
  title?: string;
  subtitle?: string;
  mainNav?: SidebarNavItem[];
  projects?: SidebarNavItem[];
  teams?: SidebarTeam[];
  teamDropdownComponent?: Component;
  teamDropdownProps?: Record<string, unknown>;
  user?: SidebarUser | null;
  collapsible?: SidebarCollapsible;
  side?: SidebarSide;
  defaultOpen?: boolean;
  showHeaderOnMobile?: boolean;
}
