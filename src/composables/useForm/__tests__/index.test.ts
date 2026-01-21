import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useForm } from '../index';

describe('useForm', () => {
  it('tracks dirty state and reset', () => {
    const initial = ref({ name: 'A' });
    const current = ref({ name: 'A' });
    const { isDirty, reset } = useForm({ initialValues: initial, currentValues: current });
    expect(isDirty.value).toBe(false);
    current.value.name = 'B';
    expect(isDirty.value).toBe(true);
    reset();
    expect(isDirty.value).toBe(false);
  });

  it('allows updating initial snapshot', () => {
    const initial = ref({ name: 'A' });
    const current = ref({ name: 'A' });
    const { isDirty, updateInitial } = useForm({ initialValues: initial, currentValues: current });
    current.value.name = 'B';
    expect(isDirty.value).toBe(true);
    updateInitial({ name: 'B' });
    expect(isDirty.value).toBe(false);
  });
});
