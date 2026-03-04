<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  // Avoid injecting invalid JSON-LD (e.g. `null`) which can break
  // consumers that expect an object and access r['@context'].
  if (!props.data || typeof props.data !== 'object') {
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(props.data);
  document.body.appendChild(script);
});
</script>
