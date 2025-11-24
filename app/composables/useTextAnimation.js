import { useIntersectionObserver } from '@vueuse/core'

export function useTextAnimation(threshold = 0) {
  const containerRef = ref(null);
  const isVisible = ref(false);

  onMounted(() => {
    useIntersectionObserver(
      containerRef,
      ([{ isIntersecting }]) => {
        isVisible.value = isIntersecting;
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold,
      }
    );
  });

  return {
    containerRef,
    isVisible,
  };
}
