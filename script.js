function _(tag) {
	document.createElement(tag)
}

function $$(selector) {
	return $(selector)[0]
}

var state = 0
var halted = false

function read(argument) {
	// console.log("I'm reading now!")
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
	var f = fseq[state]
	state ++
	state %= 3
	$('#step')[0].innerText = sequence[state]
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
