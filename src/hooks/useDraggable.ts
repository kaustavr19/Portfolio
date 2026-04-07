"use client";

import { useRef, useCallback } from "react";

export function useDraggable(defaultPosition: { x: number; y: number }) {
  const posRef = useRef(defaultPosition);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 });

  const setNodeRef = useCallback((node: HTMLDivElement | null) => {
    nodeRef.current = node;
    if (node) {
      node.style.left = `${posRef.current.x}px`;
      node.style.top = `${posRef.current.y}px`;
    }
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const node = nodeRef.current;
    if (!node) return;

    const d = dragRef.current;
    d.dragging = true;
    d.startX = e.clientX;
    d.startY = e.clientY;
    d.origX = posRef.current.x;
    d.origY = posRef.current.y;

    const onMove = (ev: MouseEvent) => {
      if (!d.dragging || !nodeRef.current) return;
      const dx = ev.clientX - d.startX;
      const dy = ev.clientY - d.startY;
      const newX = Math.max(0, d.origX + dx);
      const newY = Math.max(0, d.origY + dy);
      posRef.current = { x: newX, y: newY };
      nodeRef.current.style.left = `${newX}px`;
      nodeRef.current.style.top = `${newY}px`;
    };

    const onUp = () => {
      d.dragging = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  return { setNodeRef, onMouseDown };
}
