// Title: "idle_game"
// Created: mar 5 nov 2024, 09:34:41, CET

var data = {
    money: 0,
    click_power: 1,
    click_power_upgrade: 1,
    click_power_cost: 10,
    click_power_cost_mult: 10
}

var PLAYING = true
var buttons = []

// Buttons Functions
const click = () => data.money += data.click_power
const canAfford = (cost) => data.money >= cost
const buy = (cost) => data.money -= cost
const buy_click_power = () => {
    const cost = data.click_power_cost
    if (!canAfford(cost)) console.log("You can't afford it")
    else {
	buy(cost)
	data.click_power_cost *= data.click_power_cost_mult
	data.click_power += data.click_power_upgrade
	data.click_power_upgrade += 1
    }
}
 // 

function setup()
{
    createCanvas(windowWidth, windowHeight)
    buttons.push(new Button(100, 100, 100, 50, click, "click: +$0",
			    [{name:"click_power", value:data.click_power}]))
    buttons.push(new Button(100, 200, 100, 50, buy_click_power, "click power: +$0\ncost: $1",
			    [{name:"click_power_upgrade", value:data.click_power_upgrade},
			     {name:"click_power_cost", value:data.click_power_cost}]))
}

function draw()
{
    background(40)
    if (PLAYING) {

	for (let button of buttons) {
	    button.watch()
	    button.show()
	}

	push()
	noStroke()
	fill(255)
	textSize(20)
	text(data.money, 50, 50)
	pop()
    }
}

function mousePressed()
{
    for (let button of buttons) {
	if (button.isMouseOver()) button.click()
    }
}
