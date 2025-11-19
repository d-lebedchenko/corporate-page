<script setup>
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL

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

  return [
    lastThree.join(' ')
  ];
});


const dynamicWord = ref('');
let phraseIndex = 0;
let charIndex = 0; 
let isDeleting = false;
let typingInterval;

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1500;
const RESTART_PAUSE_DURATION = 1500

function typeWriter() {
  const currentPhrase = dynamicPhrases.value[phraseIndex];
  if (!currentPhrase) return;

  if (isDeleting) {
    dynamicWord.value = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    dynamicWord.value = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    clearInterval(typingInterval);
    typingInterval = setTimeout(typeWriter, PAUSE_DURATION);

  } else if (isDeleting && charIndex === 0) {
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
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
  }
});

onBeforeUnmount(() => {
  if (typingInterval) {
    clearInterval(typingInterval);
  }
});
</script>

<template>
  <section class="nolimits">
    <div class="container">
      <div class="nolimits__wr">
        <div class="nolimits__image d-f jc-e">
          <img :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>

        <h2 class="nolimits__title f-a2 hide-tablet">
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
            <span class="typing-word">
              {{ dynamicWord }}
              <span class="cursor">|</span>
            </span>
          </p>
          <p class="nolimits__text f-p1 hide-desctop">
            {{ staticText }}
            <span class="typing-word">
              {{ dynamicWord }}
              <span class="cursor">|</span>
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

  &__wr {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include respond("mob") {
      display: flex;
      flex-direction: column;
    }
  }

  &__image {
    padding-left: 170px;

    @include respond("tab") {
      padding-left: 0;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  &__content {
    padding: 0 39px;

    @include respond("tab") {
      padding: 0 8px;
    }

    @include respond("mob") {
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }

  &__text {
    margin-bottom: 152px;

    @include respond("tab") {
      margin-bottom: 77px;
    }

    @include respond("mob") {
      transform: translateY(-70px);
      margin-bottom: -70px;
    }

    .typing-word {
      white-space: nowrap;
    }

    .cursor {
      opacity: 1;
      font-weight: 300;
      animation: blink 0.7s infinite;
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
    letter-spacing: 0;

    @include respond("tab") {
      bottom: -7px;
    }

    @include respond("mob") {
      position: static;
      transform: translateY(-50%);
    }

    .first-word {
      display: inline-block;
      transform: translateY(-66%);

      @include respond("tab") {
        transform: translateY(0);
      }
    }
  }
}
</style>
