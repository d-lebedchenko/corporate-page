<script setup>
const cursorSize = ref(12);
const cursorPosition = ref({ x: 0, y: 0 });

const isHovering = ref(false);
let timeoutId = null;

const isClickable = (el) => {
  const MAX_DEPTH = 3;
  let currentEl = el;
  let depth = 0;

  while (currentEl && depth < MAX_DEPTH) {
    if (currentEl.tagName === 'A' || currentEl.tagName === 'BUTTON') {
      return true;
    }

    if (currentEl.classList && currentEl.classList.contains('clickable')) {
      return true;
    }

    currentEl = currentEl.parentElement;
    depth++;
  }

  return false;
};

const handleMouseMove = (e) => {
  cursorPosition.value.x = e.clientX;
  cursorPosition.value.y = e.clientY;

  const target = e.target;

  isHovering.value = isClickable(target);

  if (isHovering.value) {
    cursorSize.value = 48;
    clearTimeout(timeoutId);
  } else {
    cursorSize.value = 48;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      cursorSize.value = 12;
    }, 200);
  }
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  clearTimeout(timeoutId);
});
</script>

<template>
  <ClientOnly>
    <div class="custom-cursor" :class="{ 'is-hovering': isHovering }" :style="{
      top: '0',
      left: '0',

      transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,

      width: `${cursorSize}px`,
      height: `${cursorSize}px`,
    }">
      <svg class="cursor-hover" width="48" height="48" viewBox="0 0 48 48" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0V24H23.9962L0 0ZM23.9962 24L48 0H23.9962V24ZM23.9962 24L48 48V24H23.9962ZM23.9962 24L0 48H23.9962V24Z"
          fill="#00F3BC" />
      </svg>

    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
.custom-cursor {
  position: fixed;

  opacity: 1 !important;
  background-color: #00F3BC;
  z-index: 99;
  display: block;

  border-radius: 50%;
  pointer-events: none;

  transition: width 0.5s ease, height 0.5s ease, background-color 0.5s ease;

  .cursor-hover {
    width: 12px;
    height: 12px;
    opacity: 0;
    transition: 0.3s all ease-in-out;
  }


  &.is-hovering {
    background-color: transparent;

    .cursor-hover {
      opacity: 1;
      transform: rotate(270deg);
      width: 48px;
      height: 48px;
    }
  }

  
  @include respond("tab-sm") {
    display: none;
  }
}
</style>
