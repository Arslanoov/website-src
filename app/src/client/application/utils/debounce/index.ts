import { DEFAULT_DEBOUNCE_TIMEOUT } from '@/app/config/timeout';

export function debounce(func, timeout = DEFAULT_DEBOUNCE_TIMEOUT) {
  let timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, timeout, event);
  };
}
