/*
 * Activity categories – single source of truth.
 * `value` is stored in the database, `label` is shown in the UI,
 * `color` points to a token in styles.js.
 */
export const CATEGORIES = [
  { value: "Sports", label: "Sport", color: "var(--color-category-sports)" },
  { value: "Outdoor", label: "Draußen", color: "var(--color-category-outdoor)" },
  { value: "Food", label: "Essen & Trinken", color: "var(--color-category-food)" },
  { value: "Culture", label: "Kultur", color: "var(--color-category-culture)" },
  { value: "Party", label: "Party", color: "var(--color-category-party)" },
  { value: "Cozy", label: "Gemütlich", color: "var(--color-category-cozy)" },
  { value: "Others", label: "Sonstiges", color: "var(--color-category-default)" },
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
