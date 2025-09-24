<script setup lang="ts">
import ArrowRight from 'UiKit/assets/images/arrow-right.svg';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useSessionStore } from 'InvestCommon/domain/session/store/useSession';
import { useAppStateStore } from 'InvestCommon/domain/pwa/store/useAppStateStore';
import { urlSignin, urlSignup } from 'InvestCommon/domain/config/links';
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore();
const appStore = useAppStateStore();
const { userLoggedIn } = storeToRefs(sessionStore);
const { isPwa, isMobile } = storeToRefs(appStore);

const props = defineProps({
  title: String,
  subTitle: String,
  slider: Array,
  text: String,
  videoSrc: String,
  buttonHref: String,
  buttonText: String,
  contentClass: String,
  fullHeight: Boolean,
  videoCoverImage: String,
});

const emit = defineEmits(['click']);
</script>

<template>
  <VSection
    class="VSectionTopVideo v-section-top-video "
    :class="{ 'is--full-height': fullHeight, 
              'v-section-top-video-unauthenticated' : (!userLoggedIn && isPwa && isMobile) }"
    :style="{ '--video-cover': `url(${videoCoverImage})` }"
  >
    <video
      v-if="props.videoSrc"
      autoplay
      muted
      loop
      playsInline
    >
      <source
        :src="videoSrc"
        type="video/mp4"
      >
    </video>
    <div
      class="v-section-top-video__content"
      :class="[contentClass]"
    >
      <slot>
        <div
          v-if="!userLoggedIn && isPwa && isMobile"
          class=" is--margin-bottom-120 signs-buttons"
        >
          <VButton
            as="a"
            :href="encodeURI(urlSignin)"
            size="large"
            
            @click="emit('click')"
          >
            Sign In
          </VButton>
          <VButton
            as="a"
            :href="encodeURI(urlSignup)"
            size="large"
            @click="emit('click')"
          >
            Sign Up
          </VButton>
        </div>
        <h5>
          {{ text }}
        </h5>
        <h1 class="is--margin-top-15">
          {{ title }}
        </h1>
        <p
          v-if="subTitle"
          class="is--subheading-1 is--margin-top-15 is--color-black"
        >
          {{ subTitle }}
        </p>
        <VButton
          v-if="props.buttonHref"
          as="a"
          :href="encodeURI(props.buttonHref)"
          size="large"
          class="is--margin-top-40"
          @click="emit('click')"
        >
          <slot name="buttonText">
            {{ props.buttonText }}
            <component
              :is="ArrowRight"
            />
          </slot>
        </VButton>
      </slot>
    </div>
  </VSection>
</template>

<style lang="scss">

.v-section-top-video {
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is--full-height {
    padding: 70px 0;
    min-height: 600px;
    height: 100vh;

    @include media-lte(desktop) {
      min-height: 730px;
    }
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.5;
    background-image: var(--video-cover);
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    background-position: center;
  }

  video {
    position: absolute;
    left: 0;
    top: 0;
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
    opacity: 0.3;
    z-index: -2;
    object-fit: cover;
  }

  &__content {
    max-width: 742px;
    margin: 0 auto;
  }

  h5 {
    color: $primary;
    text-transform: uppercase;
  }
}

.v-section-top-video-unauthenticated {
  align-items: flex-start;

  
  padding: 70px 0;
  &.is--full-height {
    padding: 150px 0;
    min-height: 600px;
    height: 100vh;

    @include media-lte(desktop) {
      min-height: 730px;
    }
  }

  .signs-buttons {
    display: flex;
    justify-content: center;
    gap: 30px;
  }

  .is--margin-bottom-120 {
    margin-bottom:120px!important;
  }
}
</style>
