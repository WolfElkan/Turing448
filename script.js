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


function read(argument) {
	readbit = $$('#mem'+octal(loc)).innerText
}

function write(argument) {
	// console.log("I'm writing now!")
}

function execute(argument) {
	// console.log("I'm executing now!")
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
