'use strict';


// Akebono E3    F#3    G3    B3    C4    E4    F#4    G4
var akebono = {
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

var chromatic = {
	'G':'C1',
	'A':'D1',
	'V':'E1',
	'L':'F1',
	'I':'G1',
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
}

// Default settings
Tone.Transport.bpm.value = 65;
$('#speed-k').val(Tone.Transport.bpm.value);
var scale = akebono;

var colors = d3.scale.category20c().domain(Object.keys(scale));

var GenomeSynth = function(){
	this.synth = new Tone.MonoSynth();
};

var synths = [];
var alignmentArray = [];
var organisms = [];

var filter = new Tone.Filter(370, 'lowpass');
// this.synth.connect(filter);

var delay = new Tone.FeedbackDelay(0.7, 0.2);
filter.connect(delay);

var freeverb = new Tone.JCReverb(0.3);
delay.connect(freeverb);

freeverb.toMaster();

$.each(aligments, function(i,d){
	var newSynth = new GenomeSynth();
	newSynth.synth.connect(filter);
	synths.push(newSynth);
	alignmentArray.push(d.sequence.split(''));
	organisms.push(d.organism);
});

var position = 0;

var looper = function(time){
	$.each(synths, function(i, genomeSynth){
		$('div #'+organisms[i].split(' ')[0].toLowerCase()+'-seq').text(alignmentArray[i][position]);

		d3.select('#'+organisms[i].split(' ')[0].toLowerCase()+'-seq')
			.transition()
			.duration(60000/Tone.Transport.bpm.value)
			.style('background-color',colors(scale[alignmentArray[i][position]]));

		genomeSynth.synth.triggerAttackRelease(scale[alignmentArray[i][position]], '1n', time);
	});
	position++;
}

Tone.Transport.setInterval(looper, "4n");

var playing = true;
var togglePlayState = function() {
	if(playing){
		Tone.Transport.stop();
		$('#button').text('Play');
		playing = false;
	} else {
		Tone.Transport.start();
		$('#button').text('Stop');
		playing = true;
	}
}

$('#button').click(function(){
	togglePlayState();
});

// Speed knob
$(".dial").knob({
	'min':50,
    'max':500,
    'width':100,
    'change':function(v) {
    	Tone.Transport.bpm.value = v;
    }
});


Tone.Transport.start();
