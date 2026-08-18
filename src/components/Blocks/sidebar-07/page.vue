<script setup lang="ts">
import {
  BarChart3,
  CreditCard,
  FolderKanban,
  HelpCircle,
  Home,
  LifeBuoy,
  Wallet,
} from 'lucide-vue-next';
import AppSidebar from './components/AppSidebar.vue';
import type { SidebarNavItem, SidebarUser } from './types';

defineOptions({
  name: 'SidebarBlock07Page',
});

const mainNav: SidebarNavItem[] = [
  {
    title: 'Overview',
    icon: Home,
    href: '#overview',
    active: true,
  },
  {
    title: 'Portfolio',
    icon: Wallet,
    href: '#portfolio',
    items: [
      { title: 'Positions', href: '#positions' },
      { title: 'Performance', href: '#performance', badge: 'New' },
    ],
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    href: '#analytics',
  },
  {
    title: 'Billing',
    icon: CreditCard,
    href: '#billing',
    badge: 3,
  },
];

const projects: SidebarNavItem[] = [
  { title: 'Growth Fund', icon: FolderKanban, href: '#growth' },
  { title: 'Treasury', icon: FolderKanban, href: '#treasury', badge: '7' },
  { title: 'Support', icon: LifeBuoy, href: '#support' },
  { title: 'Docs', icon: HelpCircle, href: '#docs' },
];

const user: SidebarUser = {
  name: 'Avery Stone',
  email: 'avery@acme.test',
  role: 'Operations',
};
</script>

<template>
  <AppSidebar
    :main-nav="mainNav"
    :projects="projects"
    :user="user"
    subtitle="Generic sidebar shell"
    title="Acme Finance"
  >
    <div class="flex min-h-screen flex-col gap-6 p-6 md:p-10">
      <div class="max-w-3xl space-y-3">
        <p class="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
          Sidebar 07
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
          A reusable sidebar block that stays generic by default.
        </h1>
        <p class="text-base text-slate-600 md:text-lg">
          Feed it typed data for the common navigation shapes, then override any
          section with slots when a project needs a custom header, menu, footer,
          or account card.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">
            Data-first API
          </p>
          <h2 class="mt-3 text-xl font-semibold text-slate-950">
            Typed nav inputs
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Pass navigation arrays and user metadata for the common case without rebuilding the shell.
          </p>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">
            Project overrides
          </p>
          <h2 class="mt-3 text-xl font-semibold text-slate-950">
            Section slots
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Replace any region independently instead of forking the whole sidebar component.
          </p>
        </article>

        <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p class="text-sm text-slate-500">
            Reusable primitives
          </p>
          <h2 class="mt-3 text-xl font-semibold text-slate-950">
            `VSidebar*` base layer
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            The block sits on top of reusable sidebar primitives so other layouts can compose their own shells too.
          </p>
        </article>
      </div>
    </div>
  </AppSidebar>
</template>
