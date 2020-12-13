# @fsubal/dom

Simple wrapper of querySelectorAll + addEventListener

```ts
dom('.some').find<HTMLInputElement>('.fuga').on('click', e => { ... })
```

## Usage

### `dom()`

Returns dom collection that only provides `.on()` and `.find()`

### `dom.elements`

All elements that matched the selector

### `dom.on()`

`addEventListener()` to all elements that matches the selector

```ts
// all .some has now event listeners
dom('.some').on('click', e => { ... })
```

`.on()` returns a function that removes event listeners

```ts
const off = dom('.some').on('click', e => { ... })

// now all event listeners for click is removed
off()
```

### `dom.find()`

`querySelectorAll()` to all elements and create new `dom()` instance with the flattend one.


