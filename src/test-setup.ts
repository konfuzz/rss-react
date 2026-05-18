import '@testing-library/jest-dom/vitest'

if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = HTMLFormElement.prototype.submit;
}
