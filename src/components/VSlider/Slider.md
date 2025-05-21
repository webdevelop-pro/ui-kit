when we have in url hash to header in slides, and hash supposed to lead to slide, other than current, all slider jumps out of screen

- need to add overflow for background not to jump
- need to reinit slider on hash change

This often happens because:
- The flex container expects each item to be exactly 100% width and positioned in a row.
- Changing the hash may trigger focus or styling changes that interfere with the transform and opacity transitions or the flex item order.
- The library's JavaScript that controls `transform: translateX(...)`, `opacity`, and `pointer-events` might conflict with browser default behavior on hash navigation, causing layout or visibility issues.
- - The core problem is that when the URL hash changes, the browser automatically scrolls the element with the matching ID into view. This default scroll behavior conflicts with flexbox layouts and transform-based slide positioning, causing layout breaks.


TODO
- [] add code to remove id
```
onBeforeMount(() => {
  document?.querySelectorAll('.v-slider h1[id]').forEach(element => {
    element.removeAttribute('id');
  });
  // Remove <a> tags while keeping their text
    document?.querySelectorAll('.v-slider h1 a.header-anchor').forEach(anchor => {
    const text = anchor.textContent;
    anchor.replaceWith(text); // Replace link with its text
  });
  // api.value?.reInit();
});
```
- [ ] add code to change id to aria-id then remove id, then change slide by aria-id