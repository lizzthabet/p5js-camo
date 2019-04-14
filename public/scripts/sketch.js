const sketch1DNoise = (p) => {
  p.setup = () => {
    p.createCanvas(300, 300)
  }

  p.draw = () => {
    p.background(240)
  }
}

new p5(sketch1DNoise, 'one')