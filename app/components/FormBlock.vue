<script setup>
import Arrow from '~/assets/icons/arrow-up-right.svg'
import Attachment from '~/assets/icons/paperclip.svg'
import IconX from '~/assets/icons/x.svg'
import ErrorIcon from '~/assets/icons/error.svg'

// Максимальний розмір файлу: 10 МБ (10 * 1024 * 1024 байт)
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

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
const selectedFile = ref(null)
const isDragging = ref(false)

const nameValue = ref('')
const emailValue = ref('')
const isFormSubmitted = ref(false)

const isFileError = ref(false)


const isSending = ref(false)
const isSendSuccess = ref(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isNameValid = computed(() => {
  return nameValue.value.trim().length >= 2
})

const isEmailValid = computed(() => {
  return emailRegex.test(emailValue.value)
})


const isFormValid = computed(() => {
  return isNameValid.value && isEmailValid.value && !isFileError.value
})

const showNameError = computed(() => {
  return isFormSubmitted.value && !isNameValid.value
})

const showEmailError = computed(() => {
  return isFormSubmitted.value && !isEmailValid.value
})


const isButtonDisabled = computed(() => {
  return (isFormSubmitted.value && !isFormValid.value) || isSending.value || isSendSuccess.value
})

const triggerFileInput = () => {
  fileInputRef.value.click()
}

const handleFileChange = (event) => {
  const files = event.target.files || event.dataTransfer?.files;
  const file = files ? files[0] : null;

  isFileError.value = false;

  if (file) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
      console.log('File size (MB):', fileSizeMB);
      // selectedFile.value = null;
      selectedFile.value = file;
      isFileError.value = true;
    } else {
      selectedFile.value = file;
      isFileError.value = false;
    }
  } else {
    selectedFile.value = null;
    isFileError.value = false;
  }
}
const handleDrop = (event) => {
  handleFileChange(event);
  isDragging.value = false;
}

const handleDragEnter = () => {
  isDragging.value = true
}
const handleDragLeave = () => {
  isDragging.value = false
}


const fileLabel = computed(() => {
  return selectedFile.value ? selectedFile.value.name : props.file
})

const clearFile = () => {
  selectedFile.value = null;
  isFileError.value = false;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}
const sendFormData = async () => {
  isSending.value = true

  const formData = new FormData();

  formData.append('name', nameValue.value);
  formData.append('email', emailValue.value);

  if (selectedFile.value && !isFileError.value) {
    formData.append('file', selectedFile.value);
  }

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {

      nameValue.value = '';
      emailValue.value = '';
      clearFile();
      isFormSubmitted.value = false;
      isSendSuccess.value = true;

    } else {
      console.error('Sending error:', result.error);
    }

  } catch (error) {
    console.error('Network error:', error);
  } finally {
    isSending.value = false;
  }
}

const handleSubmit = (event) => {
  event.preventDefault()

  isFormSubmitted.value = true
  if (isFormValid.value) {
    sendFormData()
  } else {
    console.error('Form is invalid!')
  }
}
</script>

<template>
  <section class="form">
    <NuxtMarquee autoFill :speed="80">
      <h2 class="form__runing f-a2 hide-tablet">
        <div class="marquee-wrapper">
          <div class="marquee">
            <span>{{ runingTitle }}</span>&nbsp;
          </div>
        </div>
      </h2>
      <h2 class="form__runing f-a1 hide-desctop">
        <div class="marquee-wrapper">
          <div class="marquee">
            <span>{{ runingTitle }}</span>&nbsp;
          </div>
        </div>
      </h2>
    </NuxtMarquee>
    <div class="container">
      <div class="form__wr">
        <NuxtPicture v-if="image?.url" class="form__image d-f jc-c" :src="`/payload${image.url}`" :alt="image.alt || ''"
          :width="image.width" :height="image.height" sizes="xs:345px lg:430px" loading="lazy" />
        <div class="form__content d-f fd-c">
          <form @submit="handleSubmit">
            <input class="form__input f-p1 clickable" type="text" :placeholder="name" v-model="nameValue"
              :class="{ 'input-error': showNameError }">
            <div v-if="showNameError" class="form__error-message d-f ai-c">
              <ErrorIcon class="icon" />
              <div class="error-text f-p3">{{ $t('form.name_error') }}</div>
            </div>

            <input class="form__input f-p1 clickable" type="email" :placeholder="email" v-model="emailValue"
              :class="{ 'input-error': showEmailError }">
            <div v-if="showEmailError" class="form__error-message d-f ai-c">
              <ErrorIcon class="icon" />
              <div class="error-text f-p3">{{ $t('form.email_error') }}</div>
            </div>

            <div class="form__file-attachment">
              <div class="form__input form__input--file f-p1 clickable" @click="triggerFileInput" :class="{
                'file-selected': selectedFile,
                'file-draged': isDragging,
              }" @dragenter.prevent="handleDragEnter" @dragleave.prevent="handleDragLeave" @dragover.prevent
                @drop.prevent="handleDrop">
                <Attachment v-if="selectedFile" class="icon icon-attach icon-24" />
                <div class="file-label">
                  {{ fileLabel }}
                </div>
                <Attachment v-if="!selectedFile" class="icon icon-attach icon-24" />
                <IconX v-if="selectedFile" class="icon icon-24 icon-clear" @click.stop="clearFile" />
              </div>
              <input type="file" ref="fileInputRef" @change="handleFileChange" style="display: none;"
                accept=".pdf,.doc,.docx">
            </div>
            <div class="form__hint f-p3" :class="{ 'error': isFileError }">
              {{ fileHint }}
            </div>
            <button type="submit" class="form__btn btn-green dots dots-hover f-b-p2 d-f ai-c"
              :disabled="isButtonDisabled" :class="{ 'disabled-btn': isButtonDisabled }">
              <span class="psevdo"></span>
              {{ btnText }}
              <Arrow class="icon icon-32" />
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="popup d-f jc-c ai-c" v-if="isSendSuccess">
      <div class="popup__wr dots">
        <span class="psevdo"></span>
        <div class="popup__top d-f">
          <h3 class="popup__title  dots f-h2">
            <span class="psevdo"></span>
            {{ $t('form.popup_title') }}
          </h3>
          <div class="popup__close dots dots-hover d-f jc-c ai-c" @click="isSendSuccess = false">
            <span class="psevdo"></span>
            <IconX class="icon" />
          </div>
        </div>
        <div class="popup__text f-p3">
          {{ $t('form.popup_text') }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 4;
  padding: 15px;

  &__wr {
    background-color: $c-black;
    max-width: 698px;
    width: 100%;
    
    @include respond("tab") {
      max-width: 485px;
    }
  }

  &__title {
    text-transform: uppercase;
    color: $c-green;
    padding: 24px 32px;
    width: 100%;

    @include respond("tab") {
      padding: 16px;
    }
  }

  &__close {
    width: 120px;

    .icon {
      width: 22px;
      height: 22px;
      color: $c-green;

      @include respond("tab") {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__text {
    padding: 40px 32px;
    color: $c-grey-2;

    @include respond("tab") {
      padding: 24px 16px;
    }
  }
}

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

  }

  &__wr {
    display: flex;

    @include respond("tab") {
      display: flex;
      flex-direction: column-reverse;
      gap: 32px;
    }
  }

  &__image {
    width: 50%;

    @include respond("tab") {
      width: 100%;
      height: 175px;
      overflow: hidden;
      align-items: flex-start;
    }

    &:deep(img) {
      display: block;
      width: auto;
      height: 100%;
      object-fit: cover;
      animation: rolling 10s linear infinite;

      @include respond("tab") {
        width: 345px;
        height: auto;
      }
    }
  }

  &__content {
    width: 50%;

    @include respond("tab") {
      width: 100%;
    }
  }

  &__input {
    background-color: transparent;
    width: 100%;
    padding: 24px;
    margin-bottom: 12px;
    color: $c-white;
    text-transform: uppercase;
    font-family: $font-primary;
    font-weight: 600;
    transition: 0.3s all ease-in-out;
    outline: none;
    border: 1px solid transparent;
    border-bottom: 1px solid $c-steel-grey;
    -webkit-tap-highlight-color: transparent;
    box-shadow: none;

    &:hover {
      border-bottom: 1px solid $c-white;
    }

    &:active,
    &:focus {
      border-bottom: 1px solid $c-green;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      box-shadow: none;
    }

    &::placeholder {
      color: $c-grey-2;
    }

    &--file {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 10px;
      color: $c-grey-2;

      &.file-draged {
        border: 1px dashed $c-green;
        background-color: rgba($c-white, 0.1);
      }

      .icon-attach,
      .file-label {
        pointer-events: none;
      }

      .icon-attach {
        color: inherit;
      }

      &.file-selected {
        color: $c-white;
        .icon {
          flex-shrink: 0;
        }

        .file-label {
          flex-shrink: 1;
          min-width: 0;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    @include respond("tab") {
      padding: 16px 0;
    }
  }

  &__error-message {
    gap: 8px;
    color: $c-red;

    .icon {
      color: $c-red;
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
    color: $c-grey-2;
    margin-top: -4px;
    margin-bottom: 32px;

    &.error {
      color: $c-red;
    }
  }

  &__btn {
    text-transform: uppercase;
    padding: 32px 40px;
    width: max-content;
    gap: 24px;
    min-width: 269px;
    font-family: $font-primary;
    margin-left: auto;

    &.disabled-btn {
      cursor: not-allowed;
      opacity: 0.5;
    }

    @include respond("tab") {
      font-size: 20px;
      width: 100%;
      padding: 16px;
      justify-content: space-between;

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
