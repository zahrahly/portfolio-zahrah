const canvas = document.getElementById("three-canvas");

/* ================= SCENE ================= */
const scene = new THREE.Scene();

/* ================= CAMERA ================= */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

/* ================= RENDERER ================= */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ================= PARTICLES ================= */
const particleCount = 2500;
const positions = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 12;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  sizes[i] = Math.random() * 1.5 + 0.5;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

const material = new THREE.PointsMaterial({
  color: 0xff3cac,
  size: 0.02,
  transparent: true,
  opacity: 0.8,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

/* ================= MOUSE PARALLAX ================= */
const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth - 0.5) * 0.6;
  mouse.y = (event.clientY / window.innerHeight - 0.5) * 0.6;
});

/* ================= ANIMATION ================= */
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  particles.rotation.y = elapsedTime * 0.04;
  particles.rotation.x = elapsedTime * 0.02;

  // Smooth parallax follow
  particles.position.x += (mouse.x - particles.position.x) * 0.05;
  particles.position.y += (-mouse.y - particles.position.y) * 0.05;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

/* ================= RESIZE ================= */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
