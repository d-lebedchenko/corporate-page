<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'
import Attachment from '~/assets/icons/paperclip.svg'
const config = useRuntimeConfig()
const payloadUrl = config.public.NUXT_PUBLIC_PAYLOAD_URL
import IconX from '~/assets/icons/x.svg'

const props = defineProps({
  runingTitle: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  file: {
    type: String,
    default: ''
  },
  runingTitle: {
    type: String,
    default: ''
  },
  fileHint: {
    type: String,
    default: ''
  },
  btnText: {
    type: String,
    default: ''
  },
  image: {
    type: Object,
    default: () => ({})
  }
})

const fileInputRef = ref(null)
const selectedFile = ref(null) // Зберігатиме об'єкт File

// 💡 Функція для відкриття вікна вибору файлу (при кліку на стилізований інпут)
const triggerFileInput = () => {
  fileInputRef.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  } else {
    selectedFile.value = null
  }
}

// 💡 Computed property для відображення назви файлу або плейсхолдера
const fileLabel = computed(() => {
  return selectedFile.value ? selectedFile.value.name : props.file
})

// 💡 Функція для очищення вибраного файлу
const clearFile = (event) => {
  event.stopPropagation(); // Зупиняємо, щоб не спрацював клік на інпут
  selectedFile.value = null;
  // Очищаємо значення у прихованому інпуті для можливості повторного вибору
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}
</script>

<template>
  <section class="form">
    <h2 class="form__runing f-a3 hide-tablet">
      <div class="marquee-wrapper">
        <div class="marquee">
          <span>{{ runingTitle }}</span>
          <span>{{ runingTitle }}</span>
        </div>
      </div>
    </h2>
    <h2 class="form__runing f-a1 hide-desctop">
      <div class="marquee-wrapper">
        <div class="marquee">
          <span>{{ runingTitle }}</span>
          <span>{{ runingTitle }}</span>
        </div>
      </div>
    </h2>
    <div class="container">
      <div class="form__wr">
        <div class="form__image d-f jc-c">
          <img v-if="image?.url" :src="`${payloadUrl}${image.url}`" :alt="image.alt">
        </div>
        <div class="form__content d-f fd-c">
          <input class="form__input f-p1 clickable" type="text" :placeholder="name">
          <input class="form__input f-p1 clickable" type="text" :placeholder="email">
          <div class="form__file-attachment">
            <div class="form__input form__input--file f-p1 clickable" @click="triggerFileInput"
              :class="{ 'file-selected': selectedFile }">
              
              <Attachment v-if="selectedFile" class="icon icon-24" />
              {{ fileLabel }}
              <Attachment v-if="!selectedFile" class="icon icon-24" />

              <!-- <button v-if="selectedFile" @click="clearFile" class="form__file-clear">
                &times;
              </button> -->
              
              
              <IconX v-if="selectedFile" class="icon icon-24  icon-clear" @click="clearFile" />
            </div>

            <input type="file" ref="fileInputRef" @change="handleFileChange" style="display: none;"
              accept=".pdf,.doc,.docx">
          </div>
          <div class="form__hint f-p3">
            {{ fileHint }}
          </div>
          <button class="form__btn dots dots-hover f-b-p2 d-f ai-c">
            <span class="psevdo"></span>
            {{ btnText }}
            <Arrow class="icon icon-32" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.form {
  color: $c-white;
  background-color: $c-black;
  padding: 70px 0;

  @include respond("tab") {
    padding: 40px 0;
  }

  &__runing {
    color: $c-steel-grey;
    text-transform: uppercase;
    margin-bottom: 32px;
    overflow: hidden;

    .marquee-wrapper {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .marquee {
      display: flex;
      white-space: nowrap;
      animation: marquee 25s linear infinite;

      span {
        display: inline-block;
        padding-right: 10px;
      }
    }
  }

  &__wr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    @include respond("tab") {
      display: flex;
      flex-direction: column-reverse;
      gap: 32px;
    }
  }

  &__image {
    @include respond("tab") {
      height: 175px;
      overflow: hidden;
      align-items: flex-start;
    }

    img {
      width: auto;
      height: 100%;
      object-fit: cover;
      animation: rolling 10s linear infinite;

      @include respond("tab") {
        // max-width: 345px;
        width: 345px;
        height: auto;
        // animation: rolling 10s linear infinite;
      }
    }
  }

  &__input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid $c-steel-grey;
    padding: 24px;
    margin-bottom: 12px;
    color: $c-white;
    text-transform: uppercase;
    font-family: 'Manrope', sans-serif;
    font-weight: 600;
    transition: 0.3s all ease-in-out;
    outline: none;

    &:hover {
      border-bottom: 1px solid $c-white;
    }
    &:active, &:focus {
      border-bottom: 1px solid $c-green;
    }

    &--file {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 10px;

      &.file-selected {
        color: $c-green;
      }
    }

    @include respond("tab") {
      padding: 16px 0;
    }
  }

  &__file-attachment {
    position: relative;
    width: 100%;

    .icon-clear {
      margin-left: auto;
    }
  }

  &__file-clear {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    background: none;
    border: none;
    color: #ccc;
    font-size: 1.2em;
    cursor: pointer;
    line-height: 1;
    padding: 5px;
    z-index: 2;
    transition: color 0.2s;

  }

  &__hint {
    margin-top: -4px;
    margin-bottom: 32px;
  }

  &__btn {
    text-transform: uppercase;
    padding: 32px;
    width: max-content;
    gap: 24px;
    min-width: 269px;

    @include respond("tab") {
      font-size: 20px;

      &.hide-desctop {
        display: flex;
        width: 100%;
        padding: 16px;
      }

      .icon {
        width: 24px;
        height: 24px;
      }
    }
  }

}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes rolling {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>