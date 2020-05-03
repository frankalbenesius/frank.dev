import math from "canvas-sketch-util/math";

export default function projectUVLines(lines3D, center, width, height = width) {
  const [cx, cy] = center;
  return lines3D.map((line3D) => {
    return line3D.map((uvPoint3D) => {
      const [u, v] = uvPoint3D; // ignores the z value (cause orthographic)
      const x = math.lerp(cx - width / 2, cx + width / 2, u);
      const y = math.lerp(cy - height / 2, cy + height / 2, v);
      return [x, y];
    });
  });
}
