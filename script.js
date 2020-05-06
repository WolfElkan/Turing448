function _(tag) {
	document.createElement(tag)
}

function $$(selector) {
	return $(selector)[0]
}

function octal(dec) {
	var e = Math.floor(dec / 8)
	var o = dec % 8
	console.log(dec+` -> ${e}${o}`)
	return `${e}${o}`
}

var metastate = 0
var halted = false

var state = 's0'
var loc = 0
var readbit
var writebit
var active
var run
var running = false

function halt() {
	$('#step')[0].innerText = "Halt"
	$('#step').prop('disabled', true)
	halted = true;
	clearInterval(run)
}

function read(argument) {
	$(active).removeClass('active')
	active = $$('#mem'+octal(loc))
	$(active).addClass('active')
	readbit = active.innerText
}

function write(argument) {
	var s = $$('#'+state).children
	writebit = s[4 * readbit + 2].children[0].value
	$(active).removeClass('b0')
	$(active).removeClass('b1')
	active.innerText = writebit
	$(active).addClass('b'+writebit)
}

function execute(argument) {
	var s = $$('#'+state).children
	var n = s[4 * readbit + 1].children[0].value
	var oldstate = state
	state = 's' + n
	$('#'+oldstate).removeClass('active')
	$('#'+state).addClass('active')
	var a = s[4 * readbit + 3].children[0].value
	var g = s[4 * readbit + 4].children[0].value
	g = Number(g)
	var oldloc = loc
	console.log(g,typeof(g))
	g = g ? g : 0
	loc += 64 + g
	loc %= 64
	// console.log(loc)
	// Abs checkbox not working 
	if (oldloc == loc && readbit == writebit && oldstate == state) {
		halt()
	}
}

var sequence = ['Read','Write','Execute']
var fseq = [read,write,execute]

function step() {
	var f = fseq[metastate]
	metastate ++
	metastate %= 3
	$('#step')[0].innerText = sequence[metastate]
	f()
}

$(document).ready(function() {
	$('#step').click(step)
	$('.mem').click(function() {
		$(this).removeClass('b0')
		$(this).removeClass('b1')
		this.innerText ^= 1
		$(this).addClass(`b${this.innerText}`)
	})
	$('#run').click(function() {
		if (running) {
			clearInterval(run)
			this.innerText = "Run"
		} else {
			run = setInterval(function() {
				$('#step').click()
			}, 50);
			this.innerText = "Stop"
			running = true
		}
	})
})
