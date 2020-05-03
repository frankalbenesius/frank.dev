import React, { useRef, useEffect } from "react";
import canvasSketch from "canvas-sketch";
import sketch from "./sketch";

export default function Art() {
  const ref = useRef();

  useEffect(() => {
    canvasSketch(sketch, {
      dimensions: [300, 300],
      canvas: ref.current,
      animate: true,
    });
  }, []);

  return <canvas ref={ref} />;
}
