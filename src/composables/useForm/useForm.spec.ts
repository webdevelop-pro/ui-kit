import { describe, it, expect } from 'vitest';
import { nextTick, ref } from 'vue';
import { useForm } from './index';


describe('useForm', () => {
  it('treats empty string and undefined as equal when normalize=true', async () => {
    const initial = ref({ name: '', age: 1 });
    const model = ref<{ name?: string; age?: number }>({ name: undefined, age: 1 });

    const { isDirty } = useForm({
      initialValues: initial,
      currentValues: model,
    });

    await nextTick();
    expect(isDirty.value).toBe(false);

    model.value.name = 'Alice';
    await nextTick();
    expect(isDirty.value).toBe(true);
  });

  it('supports reset to mark current values as clean', async () => {
    const initial = ref({ count: 1 });
    const model = ref({ count: 1 });

    const { isDirty, reset } = useForm({
      initialValues: initial,
      currentValues: model,
      normalize: false,
    });

    await nextTick();
    expect(isDirty.value).toBe(false);

    model.value.count = 2;
    await nextTick();
    expect(isDirty.value).toBe(true);

    reset();
    await nextTick();
    expect(isDirty.value).toBe(false);
  });

  it('supports custom compareFn', async () => {
    const initial = ref({ value: 10 });
    const model = ref({ value: 11 });

    const { isDirty } = useForm({
      initialValues: initial,
      currentValues: model,
      compareFn: (init, current) => Math.abs(current.value - init.value) < 2,
    });

    await nextTick();
    expect(isDirty.value).toBe(false);

    model.value.value = 15;
    await nextTick();
    expect(isDirty.value).toBe(true);
  });

  it('updates snapshot when initialValues source changes', async () => {
    const backend = ref({ flag: false });
    const model = ref({ flag: false });

    const { isDirty } = useForm({
      initialValues: () => backend.value,
      currentValues: model,
    });

    await nextTick();
    expect(isDirty.value).toBe(false);

    backend.value = { flag: true };
    await nextTick();
    expect(isDirty.value).toBe(true);

    model.value.flag = true;
    await nextTick();
    expect(isDirty.value).toBe(false);
  });
});
