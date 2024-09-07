/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const copyToClipboard = (str: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(str);
    return;
  }
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  let selection = document.getSelection();
  const selected = selection ? (selection.rangeCount > 0 ? selection.getRangeAt(0) : false) : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected && selection) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
};

export function createCenterWindowOpt({ width = 800, height = 500, ...rest }) {
  const { width: screenWidth, height: screenHeight, availWidth, availHeight } = window.screen;

  const viewportWidth = availWidth || screenWidth;
  const viewportHeight = availHeight || screenHeight;

  const left = (viewportWidth - width) / 2;
  const top = (viewportHeight - height) / 2;

  const options = {
    left: left > 0 ? left : 0,
    top: top > 0 ? top : 0,
    width,
    height,
    ...rest,
  };

  return Object.entries(options).reduce(
    (windowOpts, [key, value]) => `${windowOpts},${key}=${value}`,
    '',
  );
}
