<script setup lang="ts">
import InfoSlot, { IInfoSlot } from 'UiKit/components/VInfo/VInfoSlot.vue';
import { PropType } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import pen from 'UiKit/assets/images/pen.svg?component';

export interface IReadOnlyForm {
  title: string;
  data?: IInfoSlot[];
}

defineProps({
  data: Object as PropType<IReadOnlyForm>,
  review: Boolean,
  loading: Boolean,
  readonly: Boolean,
});

const emit = defineEmits(['edit']);

const onEditClick = () => {
  emit('edit');
};
</script>

<template>
  <div class="VInfoFormReadOnly v-info-form-read-only">
    <div class="v-info-form-read-only__header">
      <span class="v-info-form-read-only__title is--h3__title">
        {{ data?.title }}
      </span>
      <VButton
        v-if="review"
        size="small"
        variant="link"
        class="v-info-form-read-only__edit"
        @click="onEditClick"
      >
        Review
      </VButton>
      <VButton
        v-else-if="!readonly"
        size="small"
        variant="link"
        icon-placement="left"
        class="v-info-form-read-only__edit"
        @click="onEditClick"
      >
        <pen
          class="wd-modal-layout__edit-icon"
          alt="edit icon"
        />
        Edit
      </VButton>
    </div>
    <div class="v-info-form-read-only__content">
      <InfoSlot
        v-for="(item, index) in data?.data"
        :key="index"
        :title="item.title"
        :text="item.text"
        :loading="loading"
      />
    </div>
  </div>
</template>

<style lang="scss">
.v-info-form-read-only {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;

  &__header {
    display: flex;
    gap: 12px;
    align-self: stretch;
  }

  &__title {
    flex: 1 0 0;
  }

  &__content {
    width: 100%;
  }

  &__edit {
    margin-top: 2px;
  }
}
</style>
