# Genome Synth
## Playing music from the genome

### The science part
To explain this idea, I've got to go back a little and give you some background information. As you probably already know, all living organsisms have in their DNA a collection of genes. These genes are encoded into proteins, which are the active components of our cells, allowing transport, building, signaling, etc. These proteins are made up of amino acids, of which there are 20 in total. Each amino acid can be represented by a letter, so a protein sequence can be written as such:

>APKYDWIAMAQYLCQAYCPMFPIKPFYQIEVGLCCDKNFLDRDEKYFEKQQEVWSSCVMY

The same gene, and therefore protein, can differ between species, having a different sequence. This is mostly because species have evolved differently. Some parts of the sequence will be very similar (conserved) because they play a very intricate part in the function of the protein, while some parts will be very different. Thanks to bioinformatics tools we are able to compare these sequences, aligning these conserved regions together while highlighting dissimilar regions.

>V1AR_HUMAN MRLSAGPDAGPSGNSSPWWPLATGAGNTSREAEALGEGNGPPRDVRNEELAKLEIAVLAV

>V1AR_RAT    MSFPRGSQDRSVGNSSPWWPLTTEGSNGSQEAARLGEGDSPLGDVRNEELAKLEIAVLAV

>V1AR_MOUSE MSFPRGSHDLPAGNSSPWWPLTTEGANSSREAAGLGEGGSPPGDVRNEELAKLEVTVLAV

### The sound part
A synthesizer is an eletronic musical instrument which generates electrical signals resulting in the generation of sounds. Typically, monophonic synthesizers use one oscillator to generate a pulsing wave as the source of the sound. When pressing a key on the keyboard, the wave will be emited at the frequency corresponding to the note pressed (e.g. A=440Hz).

### Putting it together
By using one monophonic synthesizer per species for which we have aligned sequences, we are able to have 6 separate sources of sound. Each amino acid in the sequence is attributed a musical note, according to a predefined scale. We then "read" the sequences like a musical score, each synthesizer playing the corresponding note at the given position. In some cases (conserved sequence) all, or almost all synthesizers will play the same note, whereas when the sequences diverge greatly, complex chords can be heard. The result is a haunting, and dreamy experience.

### What next?
For this first version we have chosen to align the sequences for a specific protein, the AVPR1a receptor, chosen because of its involvement in social behavious within species. The next step, through the use of public APIs is to allow the sequences for any given gene/protein to be aligned and "listened to".

There are also many biophysical properties we can use to control various aspects of the synthesis, for instance using subtractive synthesis to highlight hydrophobic or hydrophilic regions.

Another application could be for researchers with impaired vision, as they would be able to listen to the sequences to discover properties which are currently only available through visual tools.