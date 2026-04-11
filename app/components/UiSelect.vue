<script setup>
import { onClickOutside } from '@vueuse/core'
import ChevronIcon from '~/assets/icons/chevron-down.svg'
import CheckIcon from '~/assets/icons/check.svg'

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  alignArrowRight: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const selectRef = ref(null)

const selectedOption = computed(() =>
  props.options.find((o) => o.value === props.modelValue) || null,
)

const selectedLabel = computed(
  () => selectedOption.value?.label || props.placeholder,
)

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function onSelect(option) {
  if (option.value !== props.modelValue) {
    emit('update:modelValue', option.value)
    emit('change', option.value)
  }
  close()
}

onClickOutside(selectRef, () => {
  if (isOpen.value) close()
})
</script>

<template>
  <div
    ref="selectRef"
    :class="[
      'ui-select',
      {
        'ui-select--open': isOpen && !disabled,
        'ui-select--disabled': disabled,
        'ui-select--arr-right': alignArrowRight,
      }
    ]"
  >
    <button
      type="button"
      class="ui-select__control f-b-p2"
      :disabled="disabled"
      @click="toggle"
    >
      <span
        :class="[
          'ui-select__value',
          {
            'ui-select__value--placeholder': !selectedOption,
          }
        ]"
      >
        {{ selectedLabel }}
      </span>
      <ChevronIcon
        class="ui-select__arrow icon-32 shrink-0 green"
        aria-hidden="true"
      />
    </button>

    <Transition name="fade">
      <div
        v-if="isOpen && !disabled"
        class="ui-select__menu custom-scrollbar"
      >
        <button
          v-for="option in options"
          :key="option.value"
          :class="[
            'ui-select__option f-p2',
            {
              'ui-select__option--active': option.value === modelValue,
            }
          ]"
          type="button"
          @click="onSelect(option)"
        >
          {{ option.label }}
          <CheckIcon
            v-if="option.value === modelValue"
            class="ui-select__option-icon icon-24 green shrink-0"
            aria-hidden="true"
          />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

.ui-select {
  position: relative;
  min-width: 0;

  &__control {
    color: $c-white;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px 0;
    border-bottom: 1px solid $c-steel-grey;
    font-family: $font-primary;
    font-weight: 600;
    text-align: left;
    text-transform: uppercase;
    transition: border-color 0.3s ease;
    @include respond("tab") {
      gap: 12px;
      padding: 16px 0;
    }
    @include respond("mob") {
      gap: 10px;
      justify-content: space-between;
    }

    &:hover {
      border-color: $c-green;
    }
  }

  &__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    transition: transform 0.3s ease;
    @include respond("tab") {
      width: 20px;
      height: 20px;
    }
  }

  &__menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $c-black;
    border: 1px solid $c-steel-grey;
    margin-top: 8px;
    z-index: 10;
    max-height: 473px;
    overflow: auto;
    @include respond("tab") {
      max-height: 432px;
    }
  }

  &__option {
    color: $c-white;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 16px 24px;
    font-family: $font-primary;
    text-align: left;
    transition: background-color 0.3s ease;
    @include respond("tab") {
      padding: 16px 12px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid $c-steel-grey;
    }

    &-icon {
      @include respond("tab") {
        width: 20px;
        height: 20px;
      }
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &--active {
      color: $c-green;
    }
  }

  &--open {
    .ui-select__control {
      border-color: $c-green;
    }

    .ui-select__arrow {
      transform: rotate(180deg);
    }
  }

  &--disabled .ui-select__control {
    opacity: 0.6;
  }

  &--arr-right .ui-select__control {
    justify-content: space-between;
  }
}
</style>
