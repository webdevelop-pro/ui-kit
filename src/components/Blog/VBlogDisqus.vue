<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  frontendUrl: String,
});


const getInit = () => {
  // eslint-disable-next-line
  const disqus_config = function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.page.url = `${props.frontendUrl}${window.location.pathname}`; // Replace PAGE_URL with your page's canonical URL variable
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.page.identifier = props.data?.slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };
  (function () { // DON'T EDIT BELOW THIS LINE
    const d = document; const
      s = d.createElement('script');
    s.src = 'https://webdevelop-pro.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }());
};

onMounted(() => {
  getInit();
});
</script>

<template>
  <div
    id="disqus_thread"
    class="VBlogDisqus v-blog-disqus"
  />
</template>
