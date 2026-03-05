// Smooth cursor effect
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Move main cursor instantly
  if (cursor) {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  }
});

// Smooth follower animation
function animateFollower() {
  // Smooth easing (lower = slower follow)
  const ease = 0.15;
  
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;
  
  followerX += dx * ease;
  followerY += dy * ease;
  
  if (cursorFollower) {
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
  }
  
  requestAnimationFrame(animateFollower);
}

animateFollower();

// Hover effects
const hoverElements = document.querySelectorAll(
  "a, button, input, textarea, .project, .skill-item, .certificate-item"
);

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(2)";
    if (cursorFollower) {
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.opacity = "0.8";
    }
  });

  el.addEventListener("mouseleave", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
    if (cursorFollower) {
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.opacity = "0.5";
    }
  });
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  if (cursor) cursor.style.opacity = "0";
  if (cursorFollower) cursorFollower.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  if (cursor) cursor.style.opacity = "1";
  if (cursorFollower) cursorFollower.style.opacity = "0.5";
});