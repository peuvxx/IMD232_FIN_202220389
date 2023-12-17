let video;
let asciiGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  asciiGraphics = createGraphics(windowWidth, windowHeight);
}

function draw() {
  // 아스키 비디오를 그래픽 레이어에 그리기
  asciiGraphics.background(0);
  video.loadPixels();
  for (let y = 0; y < video.height; y += 2) {
    let row = '';
    for (let x = 0; x < video.width; x++) {
      const pixelIndex = (x + y * video.width) * 4;
      const r = video.pixels[pixelIndex];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const brightness = floor(map(avg, 0, 255, 0, 8));
      const asciiChar = [' ', '.', ':', '-', '=', '+', '*', '#', '@'][
        brightness
      ];
      row += asciiChar.repeat(2);
    }
    asciiGraphics.text(row, 0, y);
  }

  // 캔버스에 아스키 비디오 표시
  image(asciiGraphics, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
  asciiGraphics = createGraphics(windowWidth, windowHeight);
}
