<script setup lang="ts">
import { PropType, computed } from 'vue';
import { env } from '@/config/env';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useRouter } from 'vitepress';
import { IFrontmatter } from 'UiKit/types/types';
import { socials } from 'UiKit/utils/socials';
import VBadgeClickToBlogInline from 'UiKit/components/VBadge/VBadgeClickToBlogInline.vue';

const router = useRouter();

defineProps({
  data: {
    type: Object as PropType<IFrontmatter>,
    requred: true,
  },
});

const link = computed(() => (env.FRONTEND_URL + router.route.path));

const SOCIAL_LIST = [

  socials?.facebook, socials?.twitter,

  socials?.linkedin,
];
</script>

<template>
  <div class="VBlogShare v-blog-share">
    <div class="v-blog-share__share-wrap">
      <div class="v-blog-share__share-title is--h5__title">
        Share article:
      </div>
      <div class="v-blog-share__share-buttons">
        <VButton
          v-for="button in SOCIAL_LIST"
          :key="button.name"
          as="a"
          :href="encodeURI(button.shareHref + link)"
          variant="outlined"
          icon-only
          class="is--margin-top-0"
        >
          <component
            :is="button.icon"
            class="v-blog-share__share-icon"
          />
        </VButton>
      </div>
    </div>
    <VBadgeClickToBlogInline
      :data="data?.tags"
    />
  </div>
</template>

<style lang="scss">
.v-blog-share {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;

  @include media-lte(tablet) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__share-wrap {
    @include media-lte(tablet) {
      margin-bottom: 40px;
    }
  }

  &__share-buttons {
    display: flex;
    gap: 12px;
  }

  &__share-title {
    margin-bottom: 12px;
    opacity: 0.8;
  }

  &__share-icon {
    width: 20px;
  }
}
</style>
