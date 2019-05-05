
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

// 2D SKETCH HELPERS
// Returns a function that will map a number to a set scale
const mapXToY = (scale, outputStart, inputStart) => {
  return function (number) {return outputStart + scale * (number - inputStart)}
}

const config = {
  increment: 0.10,
  squareScale: 5,
  nSeed: 100,
  nDetail: 8,
  nAdjust: 0.5,
  randomNThreshhold: 60,
  randomHueThreshhold: 0.6,
  randomSatThreshhold: 1,
  randomBriThreshhold: 1.6,
}

const floatSettings = ['increment', 'nAdjust', 'randomHueThreshhold', 'randomSatThreshhold', 'randomBriThreshhold']

const parseIntOrFloat = (settingName, settingValue) => floatSettings.includes(settingName) ? parseFloat(settingValue) : parseInt(settingValue, 10)

// Returns an event handler that updates a setting in the sketch config
const singleSettingHandler = (settingName, elementToUpdate) => (evt) => {
  const setting = {}
  const newValue = evt.target.value;
  if (newValue !== undefined && newValue !== null) {
    setting[settingName] = newValue
    const success = sketch2DNoise.updateSettings(setting)
    if (success && elementToUpdate) elementToUpdate.innerHTML = newValue
    if (!success) evt.target.value = config.value
  }
}
// END HELPERS

const sketch2DNoise = (p) => {
  // CONSTANTS
  const CANVAS_HEIGHT = 600
  const CANVAS_WIDTH = 600
  const HUE_START = 0
  const SAT_START = 10000
  const BRI_START = 20000
  const BRI_SCALE = (100 - 45) / (100 - 0)
  const SAT_SCALE = (70 - 0) / (100 - 0)
  let COLS = Math.floor(CANVAS_WIDTH / config.squareScale) // almost CONST
  let ROWS = Math.floor(CANVAS_HEIGHT / config.squareScale) // almost CONST
  
  // HELPERS
  const mapBrightness = mapXToY(BRI_SCALE, 45, 0)

  const mapSaturation = mapXToY(SAT_SCALE, 0, 0)

  const random = (threshhold) => p.random(-threshhold, threshhold)

  const addRandomToOff = (xoff, yoff, threshhold) => {
    const addToX = random(threshhold)
    const addToY = random(threshhold)
    return [ xoff + addToX, yoff + addToY ]
  }

  const perlinHue = (xoff, yoff) => p.noise(xoff, yoff) * 100

  const perlinSat = (xoff, yoff) => mapSaturation(p.noise(xoff, yoff) * 100)

  const perlinBri = (xoff, yoff) => mapBrightness(p.noise(xoff, yoff) * 100)
  // END HELPERS
  
  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  
  p.draw = () => {
    let yoff = 0
    p.colorMode(p.HSB, 100)
    p.randomSeed(config.nSeed)
    p.noiseSeed(config.nSeed)
    p.noiseDetail(config.nDetail, config.nAdjust)
    
    for (let y = 0; y < ROWS; y++) {
      let xHueOff = HUE_START
      let xSatOff = SAT_START
      let xBriOff = BRI_START

      for (let x = 0; x < COLS; x++) {
        let hue
        let bri
        let sat
        
        // Introduce random additions to perlin noise values
        if (p.random(100) < config.randomNThreshhold) {
          const [ randomHueXoff, randomHueYoff ] = addRandomToOff(xHueOff, yoff, config.randomHueThreshhold)
          hue = perlinHue(randomHueXoff, randomHueYoff)
          
          const [ randomSatXoff, randomSatYoff ] = addRandomToOff(xSatOff, yoff, config.randomSatThreshhold)
          sat = perlinSat(randomSatXoff, randomSatYoff)

          const [ randomBriXoff, randomBriYoff ] = addRandomToOff(xBriOff, yoff, config.randomBriThreshhold)
          bri = perlinBri(randomBriXoff, randomBriYoff)
        } else {
          // No random addition to perlin noise values
          hue = p.noise(xHueOff, yoff) * 100
          sat = mapSaturation(p.noise(xSatOff, yoff) * 100)
          bri = mapBrightness(p.noise(xBriOff, yoff) * 100)
        }

        // Draw a rectangle with the color
        p.noStroke()
        p.fill(p.color(hue, sat, bri))
        p.rect(x * config.squareScale, y * config.squareScale, config.squareScale, config.squareScale)

        // Increment the x offset values
        xHueOff += config.increment
        xSatOff += config.increment
        xBriOff += config.increment
      }

      // Increment the y offset value
      yoff += config.increment
    }
  }

  sketch2DNoise.reset = () => sketch2DNoise
    .updateSettings({
      increment: 0.1,
      squareScale: 5,
      nSeed: 100,
      nDetail: 8,
      nAdjust: 0.5,
      randomNThreshhold: 60,
      randomHueThreshhold: 0.6,
      randomSatThreshhold: 1,
      randomBriThreshhold: 1.6
    })

  sketch2DNoise.reseed = () => sketch2DNoise.updateSettings({ 'nSeed': Math.floor(Math.random() * 1000) })

  // Takes a config object and returns whether or not whole update is successful 
  sketch2DNoise.updateSettings = (newSettings) => {
    let updateSuccessful = true
    for (const key in newSettings) {
      if (config.hasOwnProperty(key)) {
        config[key] = parseIntOrFloat(key, newSettings[key])

        // Update dependent properties for `squareScale`
        if (key === 'squareScale') {
          COLS = Math.floor(CANVAS_WIDTH / config.squareScale)
          ROWS = Math.floor(CANVAS_HEIGHT / config.squareScale)
        }
      } else {
        console.error(`Config does not have property ${key} to update.`)
        updateSuccessful = false
      }
    }
    return updateSuccessful
  }
}

// NOISE DETAIL
const slider2DNoiseDetail = document.getElementById('two-noise-detail')
const value2DNoiseDetail = document.getElementById('two-noise-detail-value')
slider2DNoiseDetail.addEventListener('change', singleSettingHandler('nDetail', value2DNoiseDetail))

// NOISE ADJUSTMENT
const slider2DNoiseAdjust = document.getElementById('two-noise-adjust')
const value2DNoiseAdjust = document.getElementById('two-noise-adjust-value')
slider2DNoiseAdjust.addEventListener('change', singleSettingHandler('nAdjust', value2DNoiseAdjust))

// NOISE INCREMENT
const slider2DNoiseIncrement = document.getElementById('two-noise-increment')
const value2DNoiseIncrement = document.getElementById('two-noise-increment-value')
slider2DNoiseIncrement.addEventListener('change', singleSettingHandler('increment', value2DNoiseIncrement))

// PIXEL SCALE
const slider2DPixelScale = document.getElementById('two-pixel-scale')
const value2DPixelScale = document.getElementById('two-pixel-scale-value')
slider2DPixelScale.addEventListener('change', singleSettingHandler('squareScale', value2DPixelScale))

// RANDOM NOISE
const slider2DRandomNoise = document.getElementById('two-random-noise')
const value2DRandomNoise = document.getElementById('two-random-noise-value')
slider2DRandomNoise.addEventListener('change', singleSettingHandler('randomNThreshhold', value2DRandomNoise))

// RANDOM HUE VARIATION
const slider2DRandomHue = document.getElementById('two-random-hue')
const value2DRandomHue = document.getElementById('two-random-hue-value')
slider2DRandomHue.addEventListener('change', singleSettingHandler('randomHueThreshhold', value2DRandomHue))

// RANDOM SATURATION VARIATION
const slider2DRandomSat = document.getElementById('two-random-sat')
const value2DRandomSat = document.getElementById('two-random-sat-value')
slider2DRandomSat.addEventListener('change', singleSettingHandler('randomSatThreshhold', value2DRandomSat))

// RANDOM BRIGHTNESS VARIATION
const slider2DRandomBri = document.getElementById('two-random-bri')
const value2DRandomBri = document.getElementById('two-random-bri-value')
slider2DRandomBri.addEventListener('change', singleSettingHandler('randomBriThreshhold', value2DRandomBri))

// RESET
const button2DReset = document.getElementById('two-reset')
const resetAllValues = () => {
  sketch2DNoise.reset()
  value2DNoiseIncrement.innerHTML = config.increment
  value2DPixelScale.innerHTML = config.squareScale
  value2DNoiseDetail.innerHTML = config.nDetail
  value2DNoiseAdjust.innerHTML = config.nAdjust
  value2DRandomNoise.innerHTML = config.randomNThreshhold
  value2DRandomHue.innerHTML = config.randomHueThreshhold
  value2DRandomSat.innerHTML = config.randomSatThreshhold
  value2DRandomBri.innerHTML = config.randomBriThreshhold
}
button2DReset.addEventListener('click', resetAllValues)
button2DReset.addEventListener('enter', resetAllValues)

// RESEED
const button2DReseed = document.getElementById('two-reseed')
button2DReseed.addEventListener('click', () => sketch2DNoise.reseed())
button2DReseed.addEventListener('enter', () => sketch2DNoise.reseed())

new p5(sketch2DNoise, 'two')
