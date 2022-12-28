/**
 * stripHtml - Strip HTML tags from a string
 * @param {string} html - The string to strip HTML tags from
 * @returns {string} - The string without HTML tags
 */
export const stripHtml = (html: string): string =>
  html.replace(/(<([^>]+)>)/gi, '')
