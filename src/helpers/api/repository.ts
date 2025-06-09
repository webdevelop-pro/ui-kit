import { ref } from 'vue';
import { ActionState } from './types';

// Utility function to create action states
export const createActionState = <T>() => ref<ActionState<T>>({
  data: undefined,
  loading: false,
  error: null,
});
