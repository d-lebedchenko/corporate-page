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
      <!--
        4 arc segments on r=20 circle centered at 24,24.
        Each arc spans 60° at a diagonal position (NW/NE/SE/SW).
        Point at θ°: x = 24 + 20·cos(θ°), y = 24 + 20·sin(θ°)
        NW 195°→255°, NE 285°→345°, SE 15°→75°, SW 105°→165°
      -->
      <svg class="cursor-hover" width="48" height="48" viewBox="0 0 48 48" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M 4.7 18.8 A 20 20 0 0 1 18.8 4.7"   stroke="#00F3BC" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 29.2 4.7 A 20 20 0 0 1 43.3 18.8"  stroke="#00F3BC" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 43.3 29.2 A 20 20 0 0 1 29.2 43.3" stroke="#00F3BC" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 18.8 43.3 A 20 20 0 0 1 4.7 29.2"  stroke="#00F3BC" stroke-width="2.5" stroke-linecap="round"/>
      </svg>

    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;

@keyframes cursor-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

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
    position: absolute;
    inset: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out;

    path {
      stroke-dasharray: 22;
      stroke-dashoffset: 22;
      transition: stroke-dashoffset 0.4s ease;

      &:nth-child(1) { transition-delay: 0s; }
      &:nth-child(2) { transition-delay: 0.07s; }
      &:nth-child(3) { transition-delay: 0.14s; }
      &:nth-child(4) { transition-delay: 0.21s; }
    }
  }

  &.is-hovering {
    background-color: transparent;

    .cursor-hover {
      opacity: 1;
      width: 48px;
      height: 48px;
      animation: cursor-spin 3s linear infinite;

      path {
        stroke-dashoffset: 0;
      }
    }
  }

  @include respond("tab-sm") {
    display: none;
  }
}
</style>
