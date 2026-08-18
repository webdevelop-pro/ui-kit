import { computed, Ref, unref, watch, ref } from 'vue';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

/**
 * Normalizes values for comparison (handles undefined, null, empty strings)
 */
function normalizeValue(value: any): any {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    const normalized: any = {};
    for (const key in value) {
      const normalizedVal = normalizeValue(value[key]);
      if (normalizedVal !== undefined) {
        normalized[key] = normalizedVal;
      }
    }
    return Object.keys(normalized).length > 0 ? normalized : undefined;
  }
  return value;
}

export interface UseFormOptions<T = any> {
  /**
   * Initial form values from backend (can be a ref, computed, or plain object)
   */
  initialValues: T | Ref<T> | (() => T);
  
  /**
   * Current form model (reactive object)
   */
  currentValues: T | Ref<T>;
  
  /**
   * Optional: Custom comparison function
   */
  compareFn?: (initial: T, current: T) => boolean;
  
  /**
   * Whether to normalize values before comparison (treats undefined, null, empty string as equal)
   */
  normalize?: boolean;
}

/**
 * Composable to detect if a form has been changed from its initial backend values.
 * 
 * @example
 * ```ts
 * const initialData = computed(() => props.data?.number_of_shares);
 * const { isDirty, reset } = useForm({
 *   initialValues: initialData,
 *   currentValues: model
 * });
 * ```
 */
export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
) {
  const {
    initialValues,
    currentValues,
    compareFn,
    normalize = true,
  } = options;

  const initialSnapshot = ref<T | undefined>(undefined);
  
  // Helper to unwrap value (handles refs, functions, and plain values)
  const getValue = (val: T | Ref<T> | (() => T)): T => {
    const value = typeof val === 'function' ? val() : unref(val);
    return value ?? ({} as T);
  };
  
  // Helper to create snapshot from value
  const createSnapshot = (value: T): T => {
    const cloned = cloneDeep(value);
    return normalize ? normalizeValue(cloned) as T : cloned;
  };
  
  // Update snapshot when initial values change
  watch(
    () => getValue(initialValues),
    (newInitial) => {
      initialSnapshot.value = createSnapshot(newInitial);
    },
    { immediate: true, deep: true }
  );
  
  // Computed dirty state
  const isDirty = computed(() => {
    if (initialSnapshot.value === undefined) return false;
    
    const current = getValue(currentValues);
    
    if (compareFn) {
      return !compareFn(initialSnapshot.value, current);
    }
    
    const initialNormalized = normalize ? normalizeValue(initialSnapshot.value) : initialSnapshot.value;
    const currentNormalized = normalize ? normalizeValue(current) : current;
    
    return !isEqual(initialNormalized, currentNormalized);
  });
  
  /**
   * Reset the initial snapshot to current values (useful after saving)
   */
  const reset = () => {
    initialSnapshot.value = createSnapshot(getValue(currentValues));
  };
  
  /**
   * Update initial snapshot manually
   */
  const updateInitial = (newInitial: T) => {
    initialSnapshot.value = createSnapshot(newInitial);
  };
  
  return {
    /**
     * Whether the form has been changed from initial values
     */
    isDirty,
    
    /**
     * Reset the initial snapshot to current values
     */
    reset,
    
    /**
     * Update initial snapshot manually
     */
    updateInitial,
  };
}
