const PROVA_BASE = [0, 180, 0, 255]
const PROVA_HOVER = [0, 100, 0, 255]

//function watch_var(v_obj)
//{
//    console.log(v_obj)
//    const whole_name = Object.keys(v_obj)[0]
//    const split_name = whole_name.split('.')
//    var name
//    if (split_name.length === 1) name = split_name[0]
//    else name = split_name[1]
//    const value = Object.values(v_obj)[0]
//    console.log(name, value)
//    return ({ name, value})
//}
//
//function watch_vars(vars)
//{
//    if (!vars || vars.length === 0) return []
//    const watched_vars = []
//    for (let i = 0; i < vars.length; i++) {
//	watched_vars.push(watch_var(vars[i]))
//    }
//    return watched_vars
//}

class Button
{
    constructor(x, y, w, h, click_callback, unformatted_label, vars_to_watch)
    {
	this.x = x
	this.y = y
	this.w = w
	this.h = h
	this.vars_to_watch = vars_to_watch
	this.unformatted_label = unformatted_label
	this.label = this.format_label()
	this.click = click_callback
    }

    show()
    {
	push()
	stroke(0)
	if (this.isMouseOver()) fill(PROVA_HOVER)
	else fill(PROVA_BASE)
	rect(this.x, this.y, this.w, this.h)

	noStroke()
	fill(0)
	text(this.label, this.x+5, this.y+2*this.h/5, this.w, this.h)
	pop()
    }

    isMouseOver()
    {
	return (mouseX > this.x &&
		mouseX < this.x + this.w &&
		mouseY > this.y &&
		mouseY < this.y + this.h)
    }

    format_label()
    {
	if (!this.vars_to_watch || this.vars_to_watch.length === 0) return this.unformatted_label
	var formatted_label = this.unformatted_label
	for (let v_i = 0; v_i < this.vars_to_watch.length; v_i++) {
	    var split_label = formatted_label.split("$"+v_i)
	    split_label[1] = this.vars_to_watch[v_i].value + split_label[1]
	    formatted_label = split_label.join('')
	    console.log("Formatted label:", formatted_label)
	}
	return formatted_label
    }
    
    watch()
    {
	if (!this.vars_to_watch) return
	for (let v of this.vars_to_watch) {
	    if (v.value !== data[v.name]) {
		v.value = data[v.name]
		this.label = this.format_label()
	    }
	}
    }
}
