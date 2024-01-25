


 
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
  applyRotation(angle);
}

function updateAngleText(angle) {
  document.getElementById('angleText').textContent = angle;
}

function fetchAngleData() {
  fetch('http://192.168.15.37/degree')
    .then(response => response.text())
    .then(data => {
      const angle = parseInt(data);
      updateAngleText(angle);
      applyRotation(angle); // передаем угол в функцию applyRotation()
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchAngleData();
setInterval(fetchAngleData, 10000);

function applyRotation(angle) {
  const baseline = document.getElementById('baseLine');
  baseline.style.transition = "transform 1.0s";  
  baseline.style.transformOrigin = "50% 50%"; 
  baseline.style.transform = `rotate(${angle}deg)`; // используем переданный угол
}
updateAntennaAngle();