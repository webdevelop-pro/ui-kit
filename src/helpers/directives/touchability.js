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
    let lastDragDistance = null;
    let lastMoveEvent = null;
    let frameId = null;

    function dispatchEvent(eventName, value) {
      const event = new CustomEvent(eventName, {
        detail: value,
      });
      // Preserve backward compatibility for any legacy listeners.
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
      if (lastDragDistance !== null && Math.abs(lastDragDistance - dragDistance) < 0.5) {
        return;
      }
      lastDragDistance = dragDistance;
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
      if (e.type !== 'touchmove') {
        e.preventDefault();
      }
      if (!startPageX) return;
      lastMoveEvent = e;
      if (frameId !== null) return;
      frameId = requestAnimationFrame(() => {
        frameId = null;
        if (!startPageX || !lastMoveEvent) return;
        dragging(lastMoveEvent);
      });
    }
    function onEnd(e) {
      if (!startPageX) return;
      sliding(e);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
      lastMoveEvent = null;
      lastDragDistance = null;
      startPageX = null;
      startTime = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove, { passive: true });
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
      dispatchEvent('dragend');
      // timeout here, to make sure all event handler know that was dragging
      setTimeout(() => { dragDiff = 0; });
    }
    function onStart(e) {
      startPageX = getEventPageX(e);
      if (startPageX === null) return;
      startTime = Date.now();
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove, { passive: true });
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchend', onEnd);
    }
    el.addEventListener('click', onClick, true);
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchstart', onStart, { passive: true });

    el.__touchability = {
      onClick,
      onStart,
      onMove,
      onEnd,
    };
  },
  unbind(el) {
    const handlers = el.__touchability;
    if (!handlers) return;
    el.removeEventListener('click', handlers.onClick, true);
    el.removeEventListener('mousedown', handlers.onStart);
    el.removeEventListener('touchstart', handlers.onStart, { passive: true });
    document.removeEventListener('mousemove', handlers.onMove);
    document.removeEventListener('touchmove', handlers.onMove, { passive: true });
    document.removeEventListener('mouseup', handlers.onEnd);
    document.removeEventListener('touchend', handlers.onEnd);
    delete el.__touchability;
  },
};
