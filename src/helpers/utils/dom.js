function closestPolyfill(element, parentSelector) {
  let el = element;
  if (!document.documentElement.contains(el)) return null;
  do {
    if (el.matches(parentSelector)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);
  return null;
}

export function getClosestElement(el, parentSelector) {
  return el.closest ? el.closest(parentSelector) : closestPolyfill(el, parentSelector);
}

export function isElementHasParent(el, parentSelector) {
  return Boolean(getClosestElement(el, parentSelector));
}

export function getElementWidthSpace(element) {
  if (!element) return 0;
  const {
    marginLeft,
    marginRight,
    borderLeftWidth,
    borderRightWidth } = element.currentStyle || window.getComputedStyle(element);
  return element.offsetWidth + parseFloat(marginLeft) + parseFloat(marginRight)
    + parseFloat(borderLeftWidth) + parseFloat(borderRightWidth);
}

export function copyTextFromElement(element) {
  if (!(element instanceof HTMLElement)) throw new Error('first argument should be HTMLElement');
  let range;
  if (document.selection) {
    // IE
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
  document.execCommand('copy');
}

// new copy to clipboard text function

/**
 * Requests Navigator API permission to clipboard.
 */
async function requestClipboardPermission() {
  return navigator.permissions.query({
    name: 'clipboard-write',
  });
}
/**
 * Writes to clipboard using Navigator API.
 */
async function writeClipboard(value) {
  const permissions = await requestClipboardPermission();
  if (permissions.state === 'granted') {
    await navigator.clipboard.writeText(value);
    return true;
  }
  return false;
}

function createTextarea(value) {
  const cssText = 'position:fixed; pointer-events:none; z-index:-9999; opacity:0;';
  const textarea = document.createElement('textarea');
  textarea.addEventListener('focusin', (event) => {
    event.stopPropagation();
  });
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = cssText;
  return textarea;
}
/**
 * Writes to clipboard using old-school execCommand('copy').
 */
function writeClipboardExecCommand(value) {
  const textarea = createTextarea(value);
  document.body.appendChild(textarea);
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    textarea.contentEditable = 'true';
    textarea.readOnly = true;
    const range = document.createRange();
    range.selectNodeContents(textarea);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      textarea.setSelectionRange(0, 999999);
    }
  } else textarea.select();
  const result = document.execCommand('copy');
  document.body.removeChild(textarea);
  return result;
}

/**
 * Maes an attempt to copy data to the clipboard.
 */
// eslint-disable-next-line consistent-return
export async function copyText(text) {
  const copied = writeClipboardExecCommand(text);
  if (copied) return true;
  await writeClipboard(text);
}
