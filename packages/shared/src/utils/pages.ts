export function closePage() {
  window.opener = null;
  window.open('', '_self', '');
  window.close();
}
