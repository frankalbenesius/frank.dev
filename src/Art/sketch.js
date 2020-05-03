import { renderPaths } from "canvas-sketch-util/penplot";
import random from "canvas-sketch-util/random";
import createSphere from "./createSphere";

export default function sketch({ width, height }) {
  const seed = random.getRandomSeed();
  return (props) => {
    let lines = [];
    const t = props.time * 0.05;
    lines.push(
      ...createSphere({
        seed,
        center: [width * 0.5, height * 0.5],
        radius: width * 0.4,
        frequency: 2,
        amplitude: 1,
        shellLines: 40,
        arcSteps: 100,
        arcLength: 1,
        fillLength: 1,
        t,
        rotation: {
          x: Math.PI * t,
          y: Math.PI * t * 1.5,
          z: 0,
        },
      })
    );

    return renderPaths(lines, {
      ...props,
    });
  };
}
