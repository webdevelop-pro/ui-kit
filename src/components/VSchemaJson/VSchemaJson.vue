<script lang="ts" setup>
import { onMounted } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(props.data);
  document.body.appendChild(script);
});
</script>
