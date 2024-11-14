<script setup lang="ts">
import { PropType, computed } from 'vue';
import { env } from '@/config/env';
import VTag from 'UiKit/components/VTag/VTag.vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';
import { useData, useRouter } from 'vitepress';
import { navigateWithQueryParams } from 'UiKit/helpers/general';
import { IFrontmatter } from 'UiKit/types/types';

const router = useRouter();
const { theme } = useData();

defineProps({
  data: {
    type: Object as PropType<IFrontmatter>,
    requred: true,
  },
});

const link = computed(() => (env.FRONTEND_URL + router.route.path));

const onTagClick = (tag: string) => {
  navigateWithQueryParams('/resource-center', { tag });
};

const SOCIAL_LIST = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  theme.value?.socials?.facebook, theme.value?.socials?.twitter,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  theme.value?.socials?.linkedin,
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
          tag="a"
          :href="button.shareHref + link"
          variant="outlined"
          icon-only
          class="is--no-margin"
        >
          <VSvgIcon
            :name="button.iconName"
            class="v-blog-share__share-icon"
          />
        </VButton>
      </div>
    </div>
    <div class="is--tags-inline">
      <VTag
        v-for="(tag, i) in data?.tags"
        :key="i"
        round
        background="#D9FFEE"
        @click="onTagClick(tag)"
      >
        {{ tag }}
      </VTag>
    </div>
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
