const categoryColors = {
  Sports: "var(--color-category-sports)",
  Culture: "var(--color-category-culture)",
  Food: "var(--color-category-food)",
  Outdoor: "var(--color-category-outdoor)",
};

export default function categoryColor(category) {
  return categoryColors[category] ?? "var(--color-category-default)";
}
