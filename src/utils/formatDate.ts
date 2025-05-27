import tinytime from 'tinytime';

export function formatDate(date: string | Date, format = '{MMMM} {DD}, {YYYY}') {
  return tinytime(format, {})
    .render(typeof date === 'string' ? new Date(date) : date)
    .replace('Febuary', 'February');
}
