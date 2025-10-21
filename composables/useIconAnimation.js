//./composables/useIconAnimation.js

import { ref, onMounted } from 'vue';

export function useIconAnimation() { 
  const containerRef = ref(null);
  const isObserverActive = ref(false);
  const isVisible = ref(false);
  const isHovered = ref(false);

  onMounted(async () => {
    const { useIntersectionObserver } = await import('@vueuse/core');

    useIntersectionObserver(
      containerRef,
      ([{ isIntersecting }]) => {
        isObserverActive.value = isIntersecting;
        if (isIntersecting) {
          isVisible.value = true;
        }
        if (!isIntersecting) {
          isVisible.value = false;
          isHovered.value = false;
        }
      },
      { threshold: 0 }
    );
  });


  function handleMouseEnter() {
    isVisible.value = false;
    setTimeout(() => {
      isHovered.value = true;
    }, 50);
  }

  function handleMouseLeave() {
    isHovered.value = false;
    if (isObserverActive.value) {
      isVisible.value = true;
    }
  }

  return {
    containerRef,
    isVisible,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
  };
}