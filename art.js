import { createNoise4D } from "https://esm.sh/simplex-noise@4.0.3";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function createCircleLine(x, y, r, steps = 30, initialTheta = 0, finalStep = steps) {
  const out = [];
  const dtheta = (Math.PI * 2) / steps;
  for (let i = 0; i <= finalStep; i++) {
    const angle = initialTheta + dtheta * i;
    out.push([x + Math.cos(angle) * r, y + Math.sin(angle) * r]);
  }
  return out;
}

// 3x3 matrix multiply
function matMul(A, B) {
  const C = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      C[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j];
    }
  }
  return C;
}

// row-vector × 3x3 matrix
function vecMul(v, M) {
  return [
    v[0] * M[0][0] + v[1] * M[1][0] + v[2] * M[2][0],
    v[0] * M[0][1] + v[1] * M[1][1] + v[2] * M[2][1],
    v[0] * M[0][2] + v[1] * M[1][2] + v[2] * M[2][2],
  ];
}

function rotate3DLines(lines3D, rotation, center) {
  const cx = Math.cos(rotation.x), sx = Math.sin(rotation.x);
  const cy = Math.cos(rotation.y), sy = Math.sin(rotation.y);
  const cz = Math.cos(rotation.z), sz = Math.sin(rotation.z);
  const Rx = [
    [1, 0, 0],
    [0, cx, -sx],
    [0, sx, cx],
  ];
  const Ry = [
    [cy, 0, sy],
    [0, 1, 0],
    [-sy, 0, cy],
  ];
  const Rz = [
    [cz, -sz, 0],
    [sz, cz, 0],
    [0, 0, 1],
  ];
  const R = matMul(matMul(Rx, Ry), Rz);
  return lines3D.map((line) =>
    line.map((p) => {
      const shifted = [p[0] - center[0], p[1] - center[1], p[2] - center[2]];
      const r = vecMul(shifted, R);
      return [r[0] + center[0], r[1] + center[1], r[2] + center[2]];
    })
  );
}

function projectUVLines(lines3D, center, width, height = width) {
  const [cx, cy] = center;
  return lines3D.map((line) =>
    line.map(([u, v]) => [
      lerp(cx - width / 2, cx + width / 2, u),
      lerp(cy - height / 2, cy + height / 2, v),
    ])
  );
}

const UV_ORIGIN = [0.5, 0.5, 0.5];
const noise4D = createNoise4D();

function createSphere({
  center,
  radius,
  shellLines = 50,
  shells = 1,
  arcSteps = 50,
  arcLength = 1,
  rotation,
  frequency = 1,
  amplitude = 0,
  fillLength = 1,
  t = 0,
}) {
  const amplitudeClamp = amplitude;
  const lines3D = [];

  for (let j = 0; j < shells; j++) {
    const shellLines3D = [];
    const shellRadius = 0.5;
    const shellLinesCount = Math.ceil(shellLines * fillLength);

    const depths = [];
    for (let i = 1; i < shellLinesCount; i++) {
      depths.push(lerp(0.5 - shellRadius, 0.5 + shellRadius, i / shellLines));
    }

    depths.forEach((depth) => {
      const arcLineRadius = Math.sqrt(
        shellRadius * shellRadius - (shellRadius - depth) * (shellRadius - depth)
      );
      const arc2D = createCircleLine(0.5, 0.5, arcLineRadius, arcSteps, 0, arcSteps * arcLength);
      const noisy = arc2D.map(([x, y]) => {
        const n = noise4D(x * frequency, y * frequency, depth * frequency, t * 5 * frequency);
        const cn = clamp(n * amplitude, -amplitudeClamp, amplitudeClamp);
        const factor = 0.15;
        return [
          lerp(0.5, x, cn * factor + 1),
          lerp(0.5, y, cn * factor + 1),
          lerp(0.5, depth, cn * factor + 1),
        ];
      });
      shellLines3D.push(noisy);
    });

    const rotated = rotate3DLines(shellLines3D, rotation, UV_ORIGIN);
    lines3D.push(...rotated);
  }

  return projectUVLines(lines3D, center, radius * 2).map((line, i) =>
    i % 2 === 0 ? line.slice().reverse() : line
  );
}

function drawLines(ctx, lines, w, h) {
  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const line of lines) {
    if (line.length < 2) continue;
    ctx.beginPath();
    ctx.moveTo(line[0][0], line[0][1]);
    for (let i = 1; i < line.length; i++) {
      ctx.lineTo(line[i][0], line[i][1]);
    }
    ctx.stroke();
  }
}

const canvas = document.getElementById("art");
const ctx = canvas.getContext("2d");
const W = canvas.width;
const H = canvas.height;
const start = performance.now();

function frame(now) {
  const time = (now - start) / 1000;
  const t = time * 0.05;
  const lines = createSphere({
    center: [W * 0.5, H * 0.5],
    radius: W * 0.4,
    frequency: 2,
    amplitude: 1,
    shellLines: 40,
    arcSteps: 100,
    arcLength: 1,
    fillLength: 1,
    t,
    rotation: { x: Math.PI * t, y: Math.PI * t * 1.5, z: 0 },
  });
  drawLines(ctx, lines, W, H);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
