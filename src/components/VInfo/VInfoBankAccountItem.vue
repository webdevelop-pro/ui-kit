<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';
import InfoSlot from 'UiKit/components/VInfo/VInfoSlot.vue';

defineProps<{
  bankName?: string;
  name?: string;
  last4?: string | number;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'delete'): void;
}>();
</script>

<template>
  <InfoSlot>
    <div class="VInfoBankAccountItem v-info-bank-account-item">
      <div class="v-info-bank-account-item__text">
        <template v-if="loading">
          <VSkeleton
            height="21px"
            width="40%"
          />
          <VSkeleton
            height="26px"
            width="30%"
          />
        </template>
        <template v-else>
          <span
            v-if="bankName || name"
            class="is--h6__title is--color-gray-70"
          >
            {{ bankName }}: {{ name }}
          </span>
          <span
            v-if="last4"
            class="is--body is--color-gray-80"
          >
            **** {{ last4 }}
          </span>
        </template>
      </div>

      <VButton
        :loading="loading"
        size="small"
        variant="link"
        color="red"
        class="v-info-bank-account-item__button"
        @click="emit('delete')"
      >
        Delete
      </VButton>
    </div>
  </InfoSlot>
</template>

<style lang="scss">
.v-info-bank-account-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;

  &__text {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1 0 0;
  }
}
</style>

