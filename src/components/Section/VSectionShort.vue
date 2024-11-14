<script setup lang="ts">
</script>

<template>
  <section class="VSectionShort v-section-short">
    <div class="is--short-block">
      <slot />
    </div>
  </section>
</template>


<style lang="scss">
.v-section-short {
  width: 100%;

  & + & {
    margin-top: 60px;
  }
}
</style>
