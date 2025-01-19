<script lang="ts" setup>
import { ref } from 'vue';
import { VPopover, VPopoverContent, VPopoverTrigger } from '../VPopover';
import {
  VCommand, VCommandEmpty, VCommandGroup, VCommandList, VCommandItem,
  VCommandInput,
} from '../VCommand';


const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

const open = ref(false);
const value = ref('');

</script>

<template>
  <VPopover v-model:open="open">
    <VPopoverTrigger as-child>
      <div>
        {{ value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...' }}
      </div>
    </VPopoverTrigger>
    <VPopoverContent>
      <VCommand>
        <VCommandInput>
          {{ value ? frameworks.find((framework) => framework.value === value)?.label : 'Select framework...' }}
        </VCommandInput>
        <VCommandEmpty>No data found</VCommandEmpty>
        <VCommandList>
          <VCommandGroup>
            <VCommandItem
              v-for="framework in frameworks"
              :key="framework.value"
              :value="framework.value"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string') {
                  value = ev.detail.value
                }
                open = false
              }"
            >
              {{ framework.label }}
            </VCommandItem>
          </VCommandGroup>
        </VCommandList>
      </VCommand>
    </VPopoverContent>
  </VPopover>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
@use 'UiKit/styles/_mixins.scss' as *;
.v-select{
  width: 100%;
  position: relative;
  font-size: 16px;
  font-family: 'Avenir';
  font-weight: 400;
  background: colors.$gray-10;
  &.is--select-large{
    .vs__dropdown-toggle{
      height: 48px;
    }
  }
  &.is--select-medium{
    .vs__dropdown-toggle{
      height: 40px;
    }
    .v-select__append{
      height: 40px;
    }
  }
  &.is--focused{
    .vs__dropdown-toggle{
      border-color: colors.$primary;
    }
  }
  &.is--error{
    .vs__dropdown-toggle{
      border-color: colors.$red;
      &:before{
        display: none;
      }
    }
  }
  &.is--disabled{
    opacity: 0.3;
    pointer-events: none;
  }
  &.is--readonly{
    pointer-events: none;
    .vs__dropdown-toggle{
      background-color: transparent;
      border-radius: 0;
      border: none;
      pointer-events: none;
      .vs__actions{
        display: none;
      }
    }
  }
  &.is--append{
    .vs__dropdown-toggle{
      padding-left: 43px;
    }
  }
  &.is--dropdown-absolute{
    position: relative;
    .vs__dropdown-menu{
      position: absolute;
      top: 100%;
      width: 100%;
      z-index: 10;
    }
  }
  &.vs--unsearchable{
    .vs__dropdown-toggle,
    .vs__search{
      cursor: pointer !important;
    }
  }
  &__append{
    position: absolute;
    left: 15px;
    top: 0;
    z-index: 2;
    width: 20px;
    height: 48px;
    display: flex;
    align-items: center;
  }
  .vs__dropdown-toggle{
    border: solid 1px colors.$gray-40;
    border-radius: 2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12.5px 12px;
    height: 40px;
    .vs__selected-options{
      display: flex;
      flex-basis: 100%;
      flex-grow: 1;
      flex-wrap: wrap;
      position: relative;
      align-items: center;
    }
    .vs__actions{
      display: flex;
      margin-left: 8px;
    }
    .vs__search{
      border: solid 1px transparent;
      outline: none;
      background: none;
      box-shadow: none;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      line-height: inherit;
      width: 0;
      max-width: 100%;
      flex-grow: 1;
      z-index: 1;
      appearance: none;
      padding: 0;
      &::placeholder {
        color: colors.$gray-60;
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
        line-height: inherit;
        opacity: 1;
      }
    }
    .vs__open-indicator{
      background-image: url(./arrow.svg);
      width: 16px;
      height: 16px;
      transform: rotate(90deg);
      @include mt(.3s);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .vs__dropdown-menu {
    padding-left: 0;
    list-style-type: none;
    background-color: colors.$gray-10;
    border: solid 1px colors.$gray-20;
    box-shadow: variables.$box-shadow-medium;
    border-radius: 0;
    max-height: 222px;
    overflow: scroll;
  }

  .vs__dropdown-option{
    font-family: 'Avenir';
    color: colors.$black;
    padding: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 26px;

    &.vs__dropdown-option--highlight {
      background-color: colors.$gray-20;
    }

    &.vs__dropdown-option--selected {
      color: colors.$primary;
      font-size: 16px;
      font-weight: 600;
    }
  }

  &.vs--open{
    &.is--error{
      .vs__dropdown-toggle{
        border-color: colors.$red;
      }
    }
    .vs__dropdown-toggle {
      &:before{
        display: none;
      }
    }
    .vs__open-indicator{
      transform: rotate(270deg);
    }
    &.vs--searchable{
      .vs__selected{
        position: absolute;
        opacity: 0;
      }
      .vs__search{
        width: 100%;
      }
    }
  }

  &__no-options {
    padding: 15px;
  }
}
</style>
