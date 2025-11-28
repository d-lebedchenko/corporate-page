export function usePageSeo(meta) {
  if (!meta) return

  const config = useRuntimeConfig()
  const baseUrl = config.public.baseUrl

  const imageUrl = meta.image?.url
    ? `${baseUrl}/payload${meta.image.url}`
    : undefined

  useSeoMeta({
    title: meta.title,
    description: meta.description,

    ogTitle: meta.title,
    ogDescription: meta.description,

    ogImage: imageUrl,
    ogImageAlt: meta.image?.alt || meta.title,

    twitterCard: 'summary_large_image',
    twitterTitle: meta.title,
    twitterDescription: meta.description,
    twitterImage: imageUrl,
  })
}
