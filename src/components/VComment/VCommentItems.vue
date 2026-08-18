<script setup lang="ts">
import { PropType } from 'vue';
import TheCommentThread, { IOfferComment } from 'UiKit/components/VComment/VCommentThread.vue';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';

defineProps({
  comments: {
    type: Array as PropType<IOfferComment[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="VCommentItems v-comment-items">
    <div class="v-comment-items__title is--h2__title">
      <slot>Questions</slot>
    </div>
    <VSkeleton
      v-if="loading"
      height="22px"
      width="100%"
      class="v-comment-items__skeleton"
    />
    <template v-else>
      <TheCommentThread
        v-for="item in comments"
        :key="item.created_at"
        :comment="item"
        class="v-comment-items__thread"
      />
    </template>
  </div>
</template>

<style lang="scss">
.v-comment-items {
  margin-top: 60px;

  &__title {
    margin-bottom: 24px;
  }

  &__thread {
    margin-bottom: 32px;
  }
}
</style>
