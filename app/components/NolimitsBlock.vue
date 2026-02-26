<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  }
})

const {
  containerRef: textRef,
  isVisible: isTextVisible
} = useTextAnimation();

const subtitleWords = computed(() => props.subtitle.split(/\s+/));
const staticWordsCount = computed(() => subtitleWords.value.length > 3 ? subtitleWords.value.length - 3 : 0);

const staticText = computed(() => {
  return subtitleWords.value.slice(0, staticWordsCount.value).join(' ') + (staticWordsCount.value > 0 ? ' ' : '');
});

const dynamicPhrases = computed(() => {
  const lastThree = subtitleWords.value.slice(staticWordsCount.value);
  return [lastThree.join(' ')];
});

const dynamicWord = ref('');
const charIndex = ref(0);
let phraseIndex = 0;
let isDeleting = false;
let typingInterval;

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1500;
const RESTART_PAUSE_DURATION = 1500;

const remainingText = computed(() => {
  const currentPhrase = dynamicPhrases.value[phraseIndex] || '';
  return currentPhrase.substring(charIndex.value);
});

function typeWriter() {
  const currentPhrase = dynamicPhrases.value[phraseIndex];
  if (!currentPhrase) return;

  if (isDeleting) {
    charIndex.value--;
  } else {
    charIndex.value++;
  }

  dynamicWord.value = currentPhrase.substring(0, charIndex.value);

  if (!isDeleting && charIndex.value === currentPhrase.length) {
    isDeleting = true;
    clearInterval(typingInterval);
    typingInterval = setTimeout(typeWriter, PAUSE_DURATION);
  } else if (isDeleting && charIndex.value === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % dynamicPhrases.value.length;
    clearInterval(typingInterval);
    typingInterval = setTimeout(typeWriter, RESTART_PAUSE_DURATION);
  } else {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    clearInterval(typingInterval);
    typingInterval = setTimeout(typeWriter, speed);
  }
}

watch(isTextVisible, (isVisible) => {
  if (isVisible && !typingInterval) {
    typeWriter();
  } else if (!isVisible && typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
    dynamicWord.value = '';
    charIndex.value = 0;
    phraseIndex = 0;
    isDeleting = false;
  }
});

onBeforeUnmount(() => {
  if (typingInterval) clearInterval(typingInterval);
});
</script>

<template>
  <section class="nolimits">
    <div class="container">
      <div class="nolimits__wr">
        <NuxtPicture v-if="image?.url" class="nolimits__image d-f jc-e" :src="`/payload${image.url}`"
          :alt="image.alt || ''" :width="image.width" :height="image.height" sizes="xs:100vw sm:100vw md:50vw lg:524px"
          loading="lazy" />

        <h2 class="nolimits__title f-a1 hide-tablet">
          <span class="first-word">{{ title.split(' ')[0] }}</span>
          {{ title.split(' ').slice(1).join(' ') }}
        </h2>
        <h2 class="nolimits__title f-a1 hide-desctop">
          <span class="first-word">{{ title.split(' ')[0] }}</span>
          {{ title.split(' ').slice(1).join(' ') }}
        </h2>
        <div class="nolimits__content d-f fd-c jc-e" ref="textRef" :class="{ 'is-visible': isTextVisible }">
          <p class="nolimits__text f-p2 hide-tablet">
            {{ staticText }}
            
            <span class="typing-area">
              <span class="visible-part">{{ dynamicWord }}</span>
              <span class="cursor">|</span>
              <span class="placeholder-part">{{ remainingText }}</span>
            </span>
          </p>
          <p class="nolimits__text f-p1 hide-desctop">
            {{ staticText }}
            <span class="typing-area">
              <span class="visible-part">{{ dynamicWord }}</span>
              <span class="cursor">|</span>
              <span class="placeholder-part">{{ remainingText }}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.nolimits {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__wr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    @include respond("tab-sm") {
      display: flex;
      flex-direction: column;
    }
  }

  &__image {
    padding-left: 170px;

    @include respond("laptop") {
      padding-left: 0;
    }
    @include respond("tab-sm") {
      justify-content: flex-start;
    }


    &:deep(img) {
      display: block;
      width: 100%;
      max-width: 516px;
      height: auto;
    }
  }

  &__content {
    padding: 0 39px;
    
    @include respond("laptop") {
      padding-right: 0;
      padding-left: 48px;
    }
    @include respond("tab-lg") {
      padding-left: 40px;
    }

    @include respond("tab-sm") {
      padding: 0;
      display: flex;
      flex-direction: column;
      transform: translateY(-56px);
      margin-bottom: -56px;
    }
  }

  &__text {
    margin-bottom: 152px;
    color: $c-grey-2;
    font-size: 20px;
    

    @include respond("tab") {
      margin-bottom: 77px;
    }
    @include respond("tab-lg") {
      margin-bottom: 112px;
    }
    @include respond("mob") {
      font-size: 16px;
    }

    @include respond("tab-sm") {
      margin-bottom: 0;
    }

    .typing-area {
      display: inline;
      white-space: normal;
    }

    .visible-part {
      display: inline;
    }

    .placeholder-part {
      display: inline;
      opacity: 0;
      user-select: none;
      pointer-events: none;
    }

    .cursor {
      display: inline-block;
      width: 0;
      white-space: nowrap;
      font-weight: 300;
      animation: blink 0.7s infinite;
      vertical-align: baseline;
    }

    @keyframes blink {

      0%,
      100% {
        opacity: 1;
      }

      50% {
        opacity: 0;
      }
    }
  }

  &__title {
    position: absolute;
    right: 0;
    bottom: -24px;
    text-transform: uppercase;

    @include respond("laptop") {
      font-size: 108px;
      bottom: -0;
    }
    @include respond("tab-lg") {
      font-size: 80px;
      line-height: 96%;
      bottom: 8px;
    }
    @include respond("tab-sm") {
      font-size: 64px;
      line-height: 125%;
    }
    @include respond("tab") {
      bottom: -7px;
    }

    @include respond("tab-sm") {
      position: relative;
      transform: translateY(-100%);
      bottom: 0;
    }
    @include respond("mob") {
      transform: translateY(-50%);
    }
    @include respond("mob-md") {
      font-size: 48px;
    }


    .first-word {
      display: inline-block;
      transform: translateY(-66%);

      @include respond("laptop") {
        transform: translateY(0);
      }
    }
  }
}
</style>