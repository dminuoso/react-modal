let defaultElement;

function fallbackElement () {
  return typeof document !== 'undefined' ? document.body : null;
}

function getElement (overrideElement = null) {
  const ret = overrideElement || defaultElement || fallbackElement();
  if (!ret) {
    throw new Error('react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible');
  }
  return ret;
}

export function setElement (element) {
  let newElement = element;
  if (typeof newElement === 'string') {
    const el = document.querySelectorAll(element);
    newElement = 'length' in el ? el[0] : el;
  }
  defaultElement = newElement || fallbackElement();
  return defaultElement;
}

export function hide (overrideElement = null) {
  const target = getElement(overrideElement);
  target.setAttribute('aria-hidden', 'true');
}

export function show (overrideElement = null) {
  const target = getElement(overrideElement);
  target.removeAttribute('aria-hidden');
}

export function toggle (shouldHide, overrideElement = null) {
  const target = getElement(overrideElement);
  if (shouldHide) {
    hide(target);
  } else {
    show(target);
  }
}

export function resetForTesting () {
  defaultElement = document.body;
}
