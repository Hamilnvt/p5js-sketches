let particles = [];

let groups = [];
let yllow = [];
let rd = [];
let gren = [];

let rules = [];
let cosinomagico = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  let ny = 1000;
  let nr = 300;
  let ng = 300;
  yllow = create_group(ny,"yellow");
  rd = create_group(nr,"red");
  gren = create_group(ng,"green");

  
  for (let i = 0; i < groups.length*groups.length; i++) {
    rules.push(generate_rule(groups));
  }
  
  
  //cosinomagico = [ 
  //  new Rule(gren,gren,0.13059615967034977),
  //  new Rule(gren,yllow,-0.38836176370174613),
  //  new Rule(gren,yllow,-0.480318971319142),
  //  new Rule(gren,yllow,-0.4919742510773028),
  //  new Rule(gren,rd,-0.2392342658472732),
  //  new Rule(gren,yllow,-0.11348573938379386),
  //  new Rule(yllow,yllow,-0.3751855965013454),
  //  new Rule(rd,gren,-0.26219241746557814),
  //  new Rule(yllow,yllow,0.1603357395079466)
  //];
  
  cosinomagico = [ 
    new Rule(gren,gren,0.13059615967034977),
    new Rule(gren,yllow,-0.38836176370174613-0.480318971319142-0.4919742510773028-0.11348573938379386),
    new Rule(gren,rd,-0.2392342658472732),
    new Rule(yllow,yllow,-0.3751855965013454),
    new Rule(rd,gren,-0.26219241746557814),
    new Rule(yllow,yllow,0.1603357395079466)
  ];
}

function draw() {
  background(0);
  
  //apply_rule_set(rules);
  apply_rule_set(cosinomagico);
  
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

function create_group(number, colour) {
  let group = [];  
  for (let i = 0; i < number; i++) {
    group.push(new Particle(random(50,width-50),random(50,height-50),colour));
    particles.push(group[i]);
  }
  groups.push(group);
  return group;
}

function apply_rule(rule) {
  for (let i = 0; i < rule.p1.length; i++) {
    let acc = createVector(0,0);
    let a,b,dx,dy,d,F;
    for (let j = 0; j < rule.p2.length; j++) {
      a = rule.p1[i];
      b = rule.p2[j];
      dx = a.pos.x-b.pos.x;
      dy = a.pos.y-b.pos.y;
      d = sqrt(dx*dx + dy*dy);
      if (d > 0 && d < 100) {
        F = rule.g * 1/d;
        acc.x += F*dx;
        acc.y += F*dy;
      }
    }
    a.vel.x = (a.vel.x+acc.x)*0.5;
    a.vel.y = (a.vel.y+acc.y)*0.5;
    a.pos.x += a.vel.x;
    a.pos.y += a.vel.y;
    
    if (a.pos.x < 0) {
      a.vel.x *= -1;
    }
    if (a.pos.x > width) {
      a.vel.x *= -1;
    }
      
    if (a.pos.y < 0) {
        a.vel.y *= -1;
      }
    if (a.pos.y > height) {
      a.vel.y *= -1;
    }
  } 
}

function generate_rule(groups) {
  let g1 = groups[floor(random(groups.length))];
  let g2 = groups[floor(random(groups.length))];
  let magnitude = random(0.5);
  if (random() > 0.5) magnitude *= -1;
  let rule = new Rule(g1,g2,magnitude);
  return rule;
}

function apply_rule_set(ruleset) {
  for (let i = 0; i < ruleset.length; i++) {
    apply_rule(ruleset[i]);
  }
}

function discard_rules(ruleset) {
  for (let i = ruleset.length-1; i >= 0; i--) {
    for (let j = ruleset.length-1; j >= 0; j--) {
      if (i!=j && ruleset[i][0] == ruleset[j][0] && ruleset[i][1]==ruleset[j][1] && ((ruleset[i][2] > 0 && ruleset[j][2] > 0) || (ruleset[i][2]<0 && ruleset[j][2] <0))) {
        ruleset.splice(j,1);
      } 
    }
  }
}
