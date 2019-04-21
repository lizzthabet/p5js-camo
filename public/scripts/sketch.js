
// TODO: Frame count
// TODO: Explore various `document ready` options?

const sketch1DNoise = (p) => {
  const CANVAS_HEIGHT = 300
  const CANVAS_WIDTH = 500

  let noLoop = false;
  let increment = 0.02
  let nDetail = 8
  let nAdjust = 0.5
  let yStart = 0;

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  p.draw = () => {
    p.background(51)
    p.noiseDetail(nDetail, nAdjust)
    
    p.stroke(255)
    p.noFill()
    p.beginShape()

    let yoff = yStart
    for (let x = 0; x < CANVAS_WIDTH; x++) {
      p.stroke(255)
      const y = p.noise(yoff) * CANVAS_HEIGHT;
      p.vertex(x, y)
      yoff += increment
    }
    p.endShape()
    yStart += increment

    if (noLoop) {
      p.noLoop()
    }
  }

  sketch1DNoise.setDetail = (detail) => {
    nDetail = parseInt(detail, 10)
  }

  sketch1DNoise.setAdjust = (adjust) => {
    nAdjust = parseFloat(adjust)
  }

  sketch1DNoise.setIncrement = (incr) => {
    increment = parseFloat(incr)
  }

  sketch1DNoise.toggleLoop = () => {
    noLoop = noLoop ? false : true
  }
}

new p5(sketch1DNoise, 'one')

// NOISE DETAIL
const slider1DNoiseDetail = document.getElementById('one-noise-detail');
const value1DNoiseDetail = document.getElementById('one-noise-detail-value');

slider1DNoiseDetail.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch1DNoise.setDetail(newValue)
    value1DNoiseDetail.innerHTML = newValue
  }
})

// NOISE ADJUSTMENT
const slider1DNoiseAdjust = document.getElementById('one-noise-adjust');
const value1DNoiseAdjust = document.getElementById('one-noise-adjust-value');

slider1DNoiseAdjust.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch1DNoise.setAdjust(newValue)
    value1DNoiseAdjust.innerHTML = newValue
  }
})

// NOISE INCREMENT
const slider1DNoiseIncrement = document.getElementById('one-noise-increment');
const value1DNoiseIncrement = document.getElementById('one-noise-increment-value');

slider1DNoiseIncrement.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch1DNoise.setIncrement(newValue)
    value1DNoiseIncrement.innerHTML = newValue
  }
})

const sketch2DNoise = (p) => {

  // VARIABLE FACTORS
  let increment = 0.10 // Make slider
  let squareScale = 7 // Make slider
  let nSeed = 100
  let nDetail = 8
  let nAdjust = 0.5
  let randomNThreshhold = 45

  // CONSTANTS
  const CANVAS_HEIGHT = 600
  const CANVAS_WIDTH = 600
  let COLS = Math.floor(CANVAS_WIDTH / squareScale) // almost CONST
  let ROWS = Math.floor(CANVAS_HEIGHT / squareScale) // almost CONST
  const HUE_START = 0
  const SAT_START = 10000
  const BRI_START = 20000
  const BRI_SCALE = (100 - 45) / (100 - 0)
  const SAT_SCALE = (70 - 0) / (100 - 0)
  
  sketch2DNoise.mapXToY = (scale, outputStart, inputStart) => {
    return function (number) {return outputStart + scale * (number - inputStart)}
  }
  sketch2DNoise.mapBrightness = sketch2DNoise.mapXToY(BRI_SCALE, 45, 0)
  sketch2DNoise.mapSaturation = sketch2DNoise.mapXToY(SAT_SCALE, 0, 0)
  
  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  
  p.draw = () => {
    let yoff = 0
    p.colorMode(p.HSB, 100)
    p.randomSeed(nSeed)
    p.noiseSeed(nSeed)
    p.noiseDetail(nDetail, nAdjust) // Make slider
    
    for (let y = 0; y < ROWS; y++) {
      let xHueOff = HUE_START;
      let xSatOff = SAT_START;
      let xBriOff = BRI_START;
      for (let x = 0; x < COLS; x++) {
        
        // Introducing random additions to perlin noise values
        if (p.random(100) < randomNThreshhold) {
          p.noStroke()
          const randomHue = p.noise(xHueOff + p.random(-0.6, 0.6), yoff + p.random(-0.6, 0.6)) * 100

          const randomSat = sketch2DNoise.mapSaturation(
            p.noise(xSatOff + p.random(-1, 1), yoff + p.random(-1, 1))
          * 100)

          const randomBri = sketch2DNoise.mapBrightness(
            p.noise(xBriOff + p.random(-1, 1), yoff + p.random(-1, 1))
           * 100)

          p.fill(p.color(randomHue, randomSat, randomBri))
          p.rect(x * squareScale, y * squareScale, squareScale, squareScale)

        } else {
          const randomHue = p.noise(xHueOff, yoff) * 100
          const randomSat = sketch2DNoise.mapSaturation(p.noise(xSatOff, yoff) * 100)
          const randomBri = sketch2DNoise.mapBrightness(p.noise(xBriOff, yoff) * 100)
        
          p.noStroke()
          p.fill(p.color(randomHue, randomSat, randomBri))
          p.rect(x * squareScale, y * squareScale, squareScale, squareScale)
      }
      
      xHueOff += increment
      xSatOff += increment
      xBriOff += increment
      }
      
      yoff += increment
    }
  }

  sketch2DNoise.reset = () => {
    increment = 0.1
    squareScale = 7
    COLS = Math.floor(CANVAS_WIDTH / squareScale)
    ROWS = Math.floor(CANVAS_HEIGHT / squareScale)
    nSeed = 100
    nDetail = 8
    nAdjust = 0.5
    randomNThreshhold = 45
  }

  sketch2DNoise.reseed = () => {
    nSeed = Math.floor(Math.random() * 1000)
  }

  sketch2DNoise.setDetail = (detail) => {
    nDetail = parseInt(detail, 10)
  }

  sketch2DNoise.setAdjust = (adjust) => {
    nAdjust = parseFloat(adjust)
  }

  sketch2DNoise.setIncrement = (incr) => {
    increment = parseFloat(incr)
  }
  
  sketch2DNoise.setPixelScale = (pixelScale) => {
    squareScale = parseInt(pixelScale, 10)
    COLS = Math.floor(CANVAS_WIDTH / squareScale)
    ROWS = Math.floor(CANVAS_HEIGHT / squareScale)
  }

  sketch2DNoise.setRandomNoise = (threshhold) => {
    randomNThreshhold = parseInt(threshhold, 10)
  }
}

// NOISE DETAIL
const slider2DNoiseDetail = document.getElementById('two-noise-detail')
const value2DNoiseDetail = document.getElementById('two-noise-detail-value')

slider2DNoiseDetail.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch2DNoise.setDetail(newValue)
    value2DNoiseDetail.innerHTML = newValue
  }
})

// NOISE ADJUSTMENT
const slider2DNoiseAdjust = document.getElementById('two-noise-adjust')
const value2DNoiseAdjust = document.getElementById('two-noise-adjust-value')

slider2DNoiseAdjust.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch2DNoise.setAdjust(newValue)
    value2DNoiseAdjust.innerHTML = newValue
  }
})

// NOISE INCREMENT
const slider2DNoiseIncrement = document.getElementById('two-noise-increment')
const value2DNoiseIncrement = document.getElementById('two-noise-increment-value')

slider2DNoiseIncrement.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch2DNoise.setIncrement(newValue)
    value2DNoiseIncrement.innerHTML = newValue
  }
})

// PIXEL SCALE
const slider2DPixelScale = document.getElementById('two-pixel-scale')
const value2DPixelScale = document.getElementById('two-pixel-scale-value')

slider2DPixelScale.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch2DNoise.setPixelScale(newValue)
    value2DPixelScale.innerHTML = newValue
  }
})

// RANDOM NOISE
const slider2DRandomNoise = document.getElementById('two-random-noise')
const value2DRandomNoise = document.getElementById('two-random-noise-value')

slider2DRandomNoise.addEventListener('change', (evt) => {
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    sketch2DNoise.setRandomNoise(newValue)
    value2DRandomNoise.innerHTML = newValue
  }
})

// RESET
const button2DReset = document.getElementById('two-reset')
button2DReset.addEventListener('click', () => sketch2DNoise.reset())
button2DReset.addEventListener('enter', () => sketch2DNoise.reset())

// RESET
const button2DReseed = document.getElementById('two-reseed')
button2DReseed.addEventListener('click', () => sketch2DNoise.reseed())
button2DReseed.addEventListener('enter', () => sketch2DNoise.reseed())

new p5(sketch2DNoise, 'two')
