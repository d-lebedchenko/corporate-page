export const formatLocationLabels = (locations = []) => {
  const labels = locations.map((l) => l.label)
  return labels.join(' / ')
}
