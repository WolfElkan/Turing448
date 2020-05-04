function _(tag) {
	document.createElement(tag)
}

function $$(selector) {
	return $(selector)[0]
}

function octal(dec) {
	var e = Math.floor(dec / 8)
	var o = dec % 8
	return `${e}${o}`
}

var metastate = 0
var halted = false

var state = 's0'
var loc = 0
var readbit
var active


function read(argument) {
	active = $$('#mem'+octal(loc))
	readbit = active.innerText
	console.log(readbit)
}

function write(argument) {
	var s = $$('#'+state).children
	var writebit = s[4 * readbit + 2].children[0].value
	$(active).removeClass('b0')
	$(active).removeClass('b1')
	active.innerText = writebit
	$(active).addClass('b'+writebit)
}

function execute(argument) {
	var s = $$('#'+state).children
	var n = s[4 * readbit + 1]
	console.log(n.children[0].value)
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
})
