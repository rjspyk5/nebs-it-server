const nameToSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
};
const slugToName = (slug) => {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim()
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each
    .join(" "); // Join back into a string
};

module.exports = {
  nameToSlug,
  slugToName,
};
