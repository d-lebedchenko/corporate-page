export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      if (process.client) {
        el.__ClickOutsideHandler__ = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener('click', el.__ClickOutsideHandler__);
      }
    },

    unmounted(el) {
      if (process.client) {
        document.body.removeEventListener('click', el.__ClickOutsideHandler__);
      }
    },

    getSSRProps() {
      return null;
    }
  });
});