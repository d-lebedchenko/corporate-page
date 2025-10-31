export const convertCollectionPath = (relationTo, slug) => {
  if (!relationTo || !slug) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`convertCollectionPath: both relationTo and slug are required.`)
    }
    return '';
  }

  switch (relationTo) {
    case 'pages':
      return `/${slug === 'home' ? '' : slug}`
    case 'career-pages':
      return `/${slug}`
    default:
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`convertCollectionPath: unresolved relationTo "${relationTo}" with slug "${slug}".`)
      }
      return `/${relationTo}/${slug}`
  }
}
