export function capitalizeString(str: string, lower = false) {
  return (lower ? str.toLowerCase() : str).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase(),
  );
}
export function getLastRoutePart(route: string) {
  route = route.replace(/^\/|\/$/g, "");
  const parts = route.split("/");
  return parts[parts.length - 1].replace(/-/g, " ");
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function capitalizeAndRemoveHyphen(input: string) {
  return input
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(" "); // Join the words back into a single string
}
