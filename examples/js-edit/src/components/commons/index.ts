export function createSpanEl(value: string | HTMLAnchorElement, className?: string) {
  const span = document.createElement('span');
  className && span.classList.add(className);
  (typeof value === 'string') ? (span.textContent = value) : span.appendChild(value);

  return span;
}