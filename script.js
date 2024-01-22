
document.querySelector('.antenna-container').addEventListener('mousedown', (e) => {
  isDragging = true;
  updateAngle(e);
});

document.querySelector('.antenna-container').addEventListener('mouseup', () => {
  isDragging = false;
});

document.querySelector('.antenna-container').addEventListener('mousemove', (e) => {
  if (isDragging) {
    updateAngle(e);
  }
});

function updateAngle(e) {
  const centerX = 250;
  const centerY = 250;
  const radians = Math.atan2(e.clientX - centerX, e.clientY - centerY);
  let angle = Math.round(-(radians * (180 / Math.PI) - 180));
  if (angle < 0) {
    angle += 360;
  }
  document.getElementById('angle').textContent = angle;
  document.getElementById('angleLine').setAttribute('transform', `rotate(${angle}, 250, 250)`);
}

function applyRotation() {
  const newAngle = parseInt(document.getElementById('angle').textContent);
  document.getElementById('baseLine').style.transition = "transform 6s ease";
  document.getElementById('baseLine').setAttribute('transform', `rotate(${newAngle}, 250, 250)`);
}