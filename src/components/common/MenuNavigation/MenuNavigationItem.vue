
<script setup lang="ts">
import BaseButton from 'UiKit/components/BaseButton/BaseButton.vue';
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vitepress';
  
const props = defineProps({
    item: Object,
    id: Number,
    closeDropdown: Boolean,
});

const emit = defineEmits(['open', 'closed']);

const iconMap = import.meta.glob('@/assets/images/menu/**/*.svg', { eager: true, import: 'default' });

const route = useRoute();

const getActive = (name: string) => {
  if (route.path.includes(name)) {
    return 'is--active'
  }
  return ''
}

const getSvgComponent = (childItem) => {
  const iconPath = childItem?.frontmatter?.menuIcon;
  if (iconPath && iconMap[`../src/assets${iconPath}`]) {
    return iconMap[`../src/assets${iconPath}`];
  }
  return null;
};

const backgroundImageLocal = computed(() =>
  props.item?.card?.background ? `url(${props.item?.card?.background})` : undefined
);

// Track active dropdown
const activeDropdown = ref(false);

const openDropdown = () => {
    emit('open', props.id);
    activeDropdown.value = true;
    // nextTick(() => {
    //     activeDropdown.value = true;
    // })
};
const closeDropdown = () => {
  activeDropdown.value = false
};

watch(() => props.closeDropdown, () => {
    if (props.closeDropdown) {
        closeDropdown();
        emit('closed',props.id);
    }
}, { immediate: true });

// Watch route changes to close dropdown
watch(() => route.path, () => {
    closeDropdown();
});
</script>

<template>
    <li
        class="MenuNavigationItem menu-navigation-item"
        @mouseenter="openDropdown"
    >
        <a
          v-if="item.link"
          :href="item.link"
          class="menu-navigation-item__item is--h6__title is--link"
          :class="[getActive(item.link)]"
        >
          {{ item.text }}
        </a>
        <span
          v-else
          class="menu-navigation-item__item is--h6__title"
        >
          {{ item.text }}
        </span>
        <div
            v-if="item.children && item.children.length > 0"
            class="menu-navigation-item__dropdown"
            :class="{ 'is--visible': activeDropdown }"
        >
            <div class="menu-navigation-item__dropdown-left">
                <ul
                    v-for="(childGroup, childGroupIndex) in item.children"
                    :key="childGroupIndex"
                >
                    <li
                        v-for="(childItem, childIndex) in childGroup"
                        :key="childIndex"
                    >
                        <a
                            v-if="childItem.link"
                            :href="childItem.link"
                            class="menu-navigation-item__dropdown-item is--h6__title is--link"
                            :class="[getActive(childItem.link)]"
                        >
                            <div
                                v-if="childItem?.frontmatter?.menuIcon"
                                class="menu-navigation-item__dropdown-icon-wrap"
                            >
                                <component
                                    v-if="getSvgComponent(childItem)"
                                    :is="getSvgComponent(childItem)"
                                    class="menu-navigation-item__dropdown-icon"
                                />
                            </div>
                            {{ childItem.text }}
                        </a>
                        <span
                            v-else
                            class="menu-navigation-item__dropdown-item is--small-2 is--color-gray-60 is--uppercase"
                        >
                            {{ childItem.text }}
                        </span>
                    </li>
                </ul>
            </div>
            <div 
                v-if="item?.card"
                class="menu-navigation-item__dropdown-right"
                :style="{ 'background-image': backgroundImageLocal }"
            >
                <span
                    v-if="item?.card?.title"
                    class="menu-navigation-item__dropdown-right-subtitle is--small-2"
                >
                    {{ item?.card?.title }}
                </span>
                <p
                    v-if="item?.card?.text"
                    class="menu-navigation-item__dropdown-right-text is--small"
                >
                    {{ item?.card?.text }}
                </p>

                <BaseButton
                    v-if="item?.card?.url"
                    tag="a"
                    :href="item?.card?.url"
                    icon-placement="right"
                    size="small"
                >
                    Learn More
                    <BaseSvgIcon
                        name="arrow-right"
                    />
                    <span class="is--link-text-hidden">
                        {{ item.title }}
                    </span>
                </BaseButton>
            </div>
        </div>
      </li>
</template>
  
<style scoped lang="sass">
@import 'index.sass'

.menu-navigation-item
    $root: &

    position: relative
    display: flex
    align-items: center
    @include media-lte(desktop-md)
        height: auto
        flex-direction: column
        & + & 
            border-top: 1px solid $gray-40

    &__item
        white-space: nowrap
        cursor: pointer
        text-decoration: none
        align-items: center
        height: 100%
        display: flex
        user-select: none

        @include media-lte(desktop-md)
            height: auto
            width: 100%
            padding: 20px 0 0 20px

        &.is--link:hover
            color: $primary

        &.is--active
            color: $primary

    &__dropdown
        cursor: pointer
        overflow: auto
        transition: 0.1s all ease
        max-width: 100vw
        display: inline-flex
        align-items: flex-start
        gap: 24px
        &.is--visible
            visibility: visible
            opacity: 1
        @include media-gt(desktop-md)
            transform: translateX(-50%)
            left: 50%
            top: calc(100% + 18px)
            position: absolute
            visibility: hidden
            opacity: 0
            border-radius: 2px
            border: 1px solid $gray-10
            background: $white
            box-shadow: $box-shadow-medium
            transition: 0.2s all ease
        @include media-lte(desktop-md)
            width: 100%
            display: block

        ul
            list-style: none
            padding: 0

        li
            margin-top: 0

    &__dropdown-left
        display: flex
        padding: 20px 16px
        align-items: flex-start
        gap: 24px
        @include media-lte(desktop-lg)
            display: grid
            grid-template-columns: repeat(2, 1fr)
            gap: 20px 24px
        @include media-lte(desktop-md)
            grid-template-columns: repeat(1, 1fr)
            padding: 19px
            gap: 9px

    &__dropdown-item
        white-space: nowrap
        cursor: pointer
        text-decoration: none
        height: 100%
        display: flex
        padding: 8px 12px
        align-items: center
        gap: 8px

        @include media-lte(desktop-md)
            padding: 7px 12px

        &.is--link:hover
            color: $primary

        &.is--active
            color: $primary

    &__dropdown-icon-wrap
        color: inherit
        display: flex
        flex-shrink: 0
        padding: 4px
        justify-content: center
        align-items: center
        gap: 10px
        border-radius: 2px
        border: 1px solid $gray-20

    &__dropdown-icon
        color: inherit
        width: 16px
        height: auto
        flex-shrink: 0

    &__dropdown-right
        display: flex
        width: 210px
        padding: 28px
        flex-direction: column
        align-items: flex-start
        gap: 8px
        flex-shrink: 0
        align-self: stretch
        background-color: $black
        background-size: auto 75%
        background-position: bottom 9px right 0
        background-repeat: no-repeat
        @include media-lte(desktop-md)
            display: none

    &__dropdown-right-subtitle
        color: $primary
        text-transform: uppercase

    &__dropdown-right-text
        flex: 1 0 0
        align-self: stretch
        color: $white
        opacity: 0.9
</style>
  