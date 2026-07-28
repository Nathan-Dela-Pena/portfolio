import { useLayoutEffect, useState } from "react";

/** Fit a board rectangle into the viewport and centre it. */
function fitRect(rect, vw, vh, pad) {
  const scale = Math.min((vw - pad * 2) / rect.w, (vh - pad * 2) / rect.h);
  return {
    scale,
    x: vw / 2 - (rect.x + rect.w / 2) * scale,
    y: vh / 2 - (rect.y + rect.h / 2) * scale,
  };
}

/**
 * The camera. Refits whenever the viewport changes, so sizing adapts
 * continuously rather than at fixed breakpoints.
 *
 * `target` must keep a stable identity between renders — see TARGETS in
 * board/geometry.js.
 */
export default function useCamera(viewportRef, target) {
  const [camera, setCamera] = useState({ scale: 0.25, x: 0, y: 0 });

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;

    const measure = () => {
      const { clientWidth: vw, clientHeight: vh } = el;
      if (!vw || !vh) return;
      setCamera(fitRect(target, vw, vh, vw < 700 ? 12 : 32));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, viewportRef]);

  return camera;
}
