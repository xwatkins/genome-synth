var T = require('timbre');
var request = require('request');
var dict = require('./dict.json');

var lastNote = "G";
console.log(dict[lastNote]);
var synth = T("SynthDef").play();

synth.def = function(opts) {
	var vco1, vco2, cuttof, vcf, eg, vca;

	vco1 = T("saw", {freq:opts.freq});
	vco2 = T("sin", {freq:(opts.freq /2 )});

	cutoff = T("env", {table:[6000, [opts.freq, 500]]}).bang();
	vcf = T("lpf", {cutoff:cutoff, Q:5}, vco1, vco2);

	eg = T("adsr", {a:150, d:500, s:0.45, r:1500, lv:0.6});
	vca = eg.append(vcf).bang();
	return vca;
};

var playSequence = function(sequence) {
	var sequenceArray = sequence.split('');
	T("interval", {interval:1200}, function(count) {
		synth.allSoundOff();
		synth.noteOff(lastNote)
		var noteNum  = dict[sequenceArray[count]];
		var velocity = 64;
		synth.noteOn(noteNum, velocity);
		lastNote = noteNum;
	}).start();
}

var sequenceService = function(proteinId) {
	request('http://www.uniprot.org/uniprot/' + proteinId + '.fasta', function(error, resp, body){
		console.log(parseFASTA(body));
		playSequence(parseFASTA(body));
	});
}

var parseFASTA = function(fasta) {
	var lines = fasta.split('\n');
	lines.splice(0,1);
	return(lines.join(''));
}

sequenceService('Q9UBP0');
