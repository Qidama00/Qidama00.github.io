const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

class Wave {
  constructor(amplitude, wavelength, speed, yOffset, color, lineWidth) {
    this.amplitude = amplitude; // 波幅
    this.wavelength = wavelength; // 波长
    this.speed = speed; // 移动速度
    this.yOffset = yOffset; // 垂直偏移
    this.phase = 0; // 当前相位
    this.color = color;
    this.lineWidth = lineWidth;
  }

  draw(ctx, time) {
    ctx.beginPath();
    ctx.moveTo(0, this.yOffset);
    for (let x = 0; x <= width; x += 10) {
      const y = this.yOffset + this.amplitude * Math.sin((2 * Math.PI / this.wavelength) * x + this.phase + time * this.speed);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }

  update() {
    this.phase += this.speed;
  }
}

// 创建多层波浪
const waves = [];
for (let i = 0; i < 10; i++) {
  waves.push(new Wave(
    20 + Math.random() * 30,          // amplitude
    200 + Math.random() * 300,        // wavelength
    0.001 + Math.random() * 0.002,    // speed
    50 + i * 60,                       // yOffset
    `rgba(255,255,255,${0.05 + i*0.02})`, // color透明度逐渐增加
    1                                 // lineWidth
  ));
}

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resizeCanvas);

function draw(time = 0) {
  ctx.clearRect(0, 0, width, height);

  waves.forEach(wave => {
    wave.draw(ctx, time);
    wave.update();
  });

  requestAnimationFrame(draw);
}

draw();



