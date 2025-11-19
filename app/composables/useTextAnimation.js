export function useTextAnimation(threshold = 0) { 
  const containerRef = ref(null);
  const isVisible = ref(false);

  onMounted(async () => {
    const { useIntersectionObserver } = await import('@vueuse/core'); 

    useIntersectionObserver(
      containerRef,
      ([ { isIntersecting } ]) => {
        isVisible.value = isIntersecting; 
        
      },
      { 
        rootMargin: '0px 0px 0px 0px',
        threshold: threshold 
      }
    );
  });

  return {
    containerRef,
    isVisible,
  };
}
