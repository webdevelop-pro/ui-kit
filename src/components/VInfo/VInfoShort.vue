<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  subtitle2: String,
  linkHref: String,
  linkText: String,
});
</script>

<template>
  <div class="VInfoShort v-info-short with-default-distance">
    <div class="is--short-block">
      <slot>
        <h2
          v-if="title"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          v-dompurify-html="subtitle"
          class="is--subheading-1 is--color-black"
        />
        <p
          v-if="subtitle2"
          v-dompurify-html="subtitle2"
          class="is--subheading-2 is--color-black"
        />
        <a
          v-if="linkText && linkHref"
          class="is--link-1"
          :href="encodeURI(linkHref)"
        >
          {{ linkText }}
        </a>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.v-info-short {
  width: 100%;

  & + & {
    margin-top: 60px;
  }

  .is--subheading-1 + .is--link-1 {
    margin-top: 30px;
  }
}
</style>
