/*
 * Activity categories – single source of truth.
 * `value` is stored in the database, `label` is shown in the UI,
 * `color` points to a token in styles.js.
 */
export const CATEGORIES = [
  { value: "Sports", label: "Sports", color: "var(--color-category-sports)" },
  { value: "Outdoor", label: "Outdoor", color: "var(--color-category-outdoor)" },
  { value: "Food", label: "Food & Drinks", color: "var(--color-category-food)" },
  { value: "Culture", label: "Culture", color: "var(--color-category-culture)" },
  { value: "Party", label: "Party", color: "var(--color-category-party)" },
  { value: "Cozy", label: "Cozy", color: "var(--color-category-cozy)" },
  { value: "Others", label: "Other", color: "var(--color-category-default)" },
];

export function categoryColor(value) {
  return (
    CATEGORIES.find((category) => category.value === value)?.color ??
    "var(--color-category-default)"
  );
}

export function categoryLabel(value) {
  return CATEGORIES.find((category) => category.value === value)?.label ?? value;
}
