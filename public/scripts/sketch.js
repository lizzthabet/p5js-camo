var logo;

function preload() {
  logo = loadImage('../images/gray-area-logo-small.png');
}

function setup() {
  createCanvas(480, 480);
}

function draw() {
  background(35);
  image(logo, 199, 210, 82, 59);
}
