noise.seed(200);

let cvs = document.querySelector('#canvas');
let ctx = cvs.getContext('2d');
let l = 2;
let w = cvs.width;
let h = cvs.height;

class Node {
  constructor(params) {
    this.ctx = params.ctx;
    this.max_x = params.max_x;
    this.max_y = params.max_y;
    this.max_l = params.max_l;
    this.seed = params.seed;
    this.noise = noise.perlin3;
    this.x = 0;
    this.y = 0;
    this.getValue(0);
  }

  update(time) {
    this.getValue(time);

    // draw lines
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.prev_x, this.prev_y);
    this.ctx.lineWidth = this.l;
    this.ctx.stroke();

    // debugging
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(this.x, this.y, this.l * 10, this.l * 10);
  }

  getValue(time) {
    this.time = time;

    // different noise for different values
    this.noise_x = this.noise(this.seed, this.seed * -1, this.time);
    this.noise_y = this.noise(this.seed * -1, this.seed, this.time);
    // color noise stronger towards center
    this.noise_c = 1 - Math.max(Math.abs(this.noise_x), Math.abs(this.noise_y));
    this.noise_l = this.noise_c;

    // set previous plot for drawing lines to prev point
    this.prev_x = this.x;
    this.prev_y = this.y;

    // set new plots
    this.x = this.noise_x * this.max_x / 2 + this.max_x / 2;
    this.y = this.noise_y * this.max_y / 2 + this.max_y / 2;

    // line width
    this.l = this.noise_l * this.max_l / 2 + this.max_l / 2;

    // color
    let hue = 360 * (time % 10 / 10);
    let sat = this.noise_c * 60 + 40;
    let lit = this.noise_c * 60;

    // set it
    this.color = `hsla(${hue}, ${sat}%, ${lit}%, 0.03)`;

  }}


let nodes = [];
let node_count = 1000;
for (let i = 0; i < node_count; i++) {
  let new_node = new Node({
    ctx: ctx, seed: (i + 1) / node_count,
    max_x: w, max_y: h, max_l: l });

  nodes.push(new_node);
}

let rate = 0.005;
let update = clock => {
  // uncomment to see each frame
  // ctx.clearRect(0, 0, w, h);

  // update each node
  nodes.forEach(node => {node.update(clock);});

  // kill after arbitrary time. 
  // in this case, 20 (after 4000 updates at 0.005 rate)
  if (clock < 20) {
    window.requestAnimationFrame(() => {
      update(clock + rate);
    });
  } else {
    console.log('Done!');
  }
};

update(0);