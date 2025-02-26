class Flower {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.petalCount = 8;
    this.angle = Math.random() * Math.PI * 2;
    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    this.growing = true;
    this.currentSize = 0;
  }

  draw(ctx) {
    if (this.growing && this.currentSize < this.size) {
      this.currentSize += 0.5;
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // Draw petals
    ctx.fillStyle = this.color;
    for (let i = 0; i < this.petalCount; i++) {
      ctx.beginPath();
      ctx.ellipse(
        this.currentSize,
        0,
        this.currentSize,
        this.currentSize / 3,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.rotate((Math.PI * 2) / this.petalCount);
    }

    // Draw center
    ctx.beginPath();
    ctx.fillStyle = "#FFD700";
    ctx.arc(0, 0, this.currentSize / 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class FlowerField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.flowers = [];
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  addFlower(x, y) {
    const size = 15 + Math.random() * 20;
    this.flowers.push(new Flower(x, y, size));
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.flowers.forEach((flower) => flower.draw(this.ctx));
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const landingPage = document.getElementById("landing");
  const celebrationPage = document.getElementById("celebration");
  const continueBtn = document.getElementById("continueBtn");
  const canvas = document.getElementById("flowerCanvas");
  const nameElement = document.getElementById("name");

  // Prompt for name if it's still [name]
  if (nameElement.textContent === "[name]") {
    const personName = prompt("Please enter the birthday person's name:");
    nameElement.textContent = personName || "[name]";
  }

  const flowerField = new FlowerField(canvas);

  continueBtn.addEventListener("click", () => {
    landingPage.style.display = "none";
    celebrationPage.style.display = "block";
    flowerField.animate();
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    flowerField.addFlower(x, y);
  });
});
