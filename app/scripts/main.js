'use strict';

// Akebono Hapi Drum// E3    F#3    G3    B3    C4    E4    F#4    G4
var scale = {
	'G':'E3',
	'A':'F#3',
	'V':'G3',
	'L':'B3',
	'I':'C4',
	'S':'E4',
	'T':'F#4',
	'C':'G4',
	'M':'B5',
	'P':'C5',
	'H':'E5',
	'R':'F#5',
	'N':'G5',
	'Q':'B5',
	'E':'C6',
	'D':'E6',
	'F':'F#6',
	'W':'G6',
	'Y':'B6',
	'K':'C7',
	'-':'E7'
};

var colors = d3.scale.category20c().domain(Object.keys(scale));

var GenomeSynth = function(){
	this.synth = new Tone.MonoSynth();
	var filter = new Tone.Filter(370, 'lowpass');
	this.synth.connect(filter);

	var delay = new Tone.FeedbackDelay(0.7, 0.2);
	filter.connect(delay);

	var freeverb = new Tone.JCReverb(0.3);
	delay.connect(freeverb);

	freeverb.toMaster();
};

var synths = [];
var alignmentArray = [];
var organisms = [];

$.each(aligments, function(i,d){
	synths.push(new GenomeSynth());
	alignmentArray.push(d.sequence.split(''));
	organisms.push(d.organism);
});

var position = 0;
Tone.Transport.setInterval(function(time){
	$.each(synths, function(i, genomeSynth){
		$('#'+organisms[i].split(' ')[0].toLowerCase()+'-seq').text(alignmentArray[i][position]);
		$('#'+organisms[i].split(' ')[0].toLowerCase()+'-seq').parent().css('background-color',colors(scale[alignmentArray[i][position]]));
		genomeSynth.synth.triggerAttackRelease(scale[alignmentArray[i][position]], '2s', time);
	});
	position++;
}, '5s');

$('#start-button').click(function(){
	Tone.Transport.start();
});

$('#stop-button').click(function(){
	Tone.Transport.stop();
});
