<script setup lang="ts">
const props = defineProps({
  link: {
    type: Object,
    default: () => ({}),
    required: true,
  },
})

defineEmits(['click'])

const getHref = computed(() => {
  const { type, reference, url } = props.link
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    const href = convertCollectionPath(reference?.relationTo, reference.value.slug)
    return href
  }
  if (type === 'custom' && url) return url
  return ''
})

const isInternal = computed(() => 
  getHref.value.startsWith('/') && !getHref.value.startsWith('//')
)
</script>

<template>
  <NuxtLinkLocale
    v-if="isInternal"
    :to="getHref"
    :target="link.newTab ? '_blank' : undefined"
    :rel="link.newTab ? 'noopener noreferrer' : undefined"
    @click="$emit('click', $event)"
  >
    <slot />
  </NuxtLinkLocale>

  <a
    v-else
    :href="getHref"
    :target="link.newTab ? '_blank' : undefined"
    :rel="link.newTab ? 'noopener noreferrer' : undefined"
    @click="$emit('click', $event)"
  >
    <slot />
  </a>
</template>
