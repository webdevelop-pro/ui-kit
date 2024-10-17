function getEventPageX(e) {
  if (e.pageX !== undefined) {
    return e.pageX;
  }
  try {
    return e.changedTouches[0].pageX;
  } catch (error) {
    return null;
  }
}

export default {
  bind(el) {
    let startPageX = null;
    let startTime = null;
    let dragDiff = 0;

    function dispatchEvent(eventName, value) {
      const event = new Event(eventName);
      if (value !== undefined) event.value = value;
      el.dispatchEvent(event);
    }

    function dragging(event) {
      if (!dragDiff) {
        const currentDragDiff = Math.abs(startPageX - getEventPageX(event));
        if (currentDragDiff > 10) {
          dispatchEvent('dragstart');
          dragDiff = currentDragDiff;
        } else return;
      }
      const dragDistance = startPageX - getEventPageX(event) - dragDiff;
      dispatchEvent('dragmove', dragDistance);
    }

    function sliding(event) {
      const currentDragDiff = startPageX - getEventPageX(event);
      const currentTimeDiff = Date.now() - startTime;
      if (Math.abs(currentDragDiff) > 10 && currentTimeDiff < 1000) {
        if (currentDragDiff < 0) {
          dispatchEvent('slideleft');
        } else {
          dispatchEvent('slideright');
        }
      }
    }

    function onClick(event) {
      // TODO: When event target changes from mousedown to mouseup, event is not captured
      if (dragDiff) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    function onMove(e) {
      if (e.type !== 'touchmove') e.preventDefault();
      if (!startPageX) return;
      dragging(e);
    }
    function onEnd(e) {
      sliding(e);
      startPageX = null;
      startTime = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
      dispatchEvent('dragend');
      // timeout here, to make sure all event handler know that was dragging
      setTimeout(() => { dragDiff = 0; });
    }
    function onStart(e) {
      startPageX = getEventPageX(e);
      startTime = Date.now();
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchend', onEnd);
    }
    el.addEventListener('click', onClick, true);
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart);
  },
};
