var T = require('timbre');

var sequence = 'TAACTGACTCTGCTGTGTTTCCTTGGCATTATAGCTAATCAAATTGAGCAGGTCAGGTAACAGTTTATACTTACACCTACTATTTCAAAACCATGAGCTCATTCACATTTTCACTGAAGTAACAAATCCTCCATAAACTAGAAAATCTCAAACTGGTGACTGGGAGTTTTGGTTTTGTTTTTTTGTTGTTTTATTTTATTTTATTTTATTTTCTAGATGGAGTCTTGCTCTGTTGCCCAGGCTGGATGCAATGGCATGATCTCAGCTCACTGCAACCTCCACCTTTCGGGTTCAAGCAATCCTCCTGCCTCAATCTTCCAAGTAGCTGGGACTACAGGAATGAGCTGCCGCACCTGGCC'.split('');
var mapping =  [];
mapping['A'] = 69;
mapping['T'] = 71;
mapping['G'] = 74;
mapping['C'] = 76;
var lastNote;

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

T("interval", {interval:1200}, function(count) {
	synth.allSoundOff();
	var noteNum  = mapping[sequence[count]];
	var velocity = 64;
	synth.noteOn(noteNum, velocity);
	lastNote = noteNum;
}).start();