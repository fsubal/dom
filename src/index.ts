class Dom<E extends HTMLElement> {
  constructor(readonly elements: ReadonlyArray<E>) {}

  /**
   * addEventListener() to all elements that matches the selector
   *
   * ```ts
   * // all .some has now event listeners
   * dom('.some').on('click', e => { ... })
   * ```
   *
   * `.on()` returns a function that removes event listeners
   *
   * ```ts
   * const off = dom('.some').on('click', e => { ... })
   *
   * // now all event listeners for click is removed
   * off()
   * ```
   */
  on<K extends keyof HTMLElementEventMap>(
    eventType: K,
    handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.elements.forEach((element) => {
      element.addEventListener(eventType, handler, options);
    });

    const removeEventListeners = () => {
      this.elements.forEach((element) => {
        element.removeEventListener(eventType, handler, options);
      });
    };

    return removeEventListeners;
  }

  find<E extends HTMLElement>(selector: string) {
    const elements = this.elements.flatMap((element) =>
      Array.from(element.querySelectorAll<E>(selector))
    );

    return new Dom<E>(elements);
  }
}

/**
 * Returns dom collection that only provides `.on()` and `.find()`
 *
 * ```ts
 * dom('.some').find<HTMLInputElement>('.fuga').on('click', e => { ... })
 * ```
 */
export default function dom<E extends HTMLElement>(selector: string) {
  const elements = Array.from(document.querySelectorAll<E>(selector));

  return new Dom<E>(elements);
}
