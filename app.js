const express = require('express');
const app = express();
const Magenta = require('magenta');
const tf = require('@tensorflow/tfjs-node');

const magenta = new Magenta();
const musicRnn = magenta.getMusicRnn();

const generateChords = async (model, mood) => {
  const inputSequence = magenta.noteSequenceToMidi(
    magenta.midiFileToNoteSequence(`path/to/input_${mood}.mid`)
  );

  const chordProgression = await model.generate(
    inputSequence,
    Math.floor(inputSequence.totalTime * 4),
    4,
    16,
    50
  );

  const noteSequence = magenta.midiFileToNoteSequence(`path/to/generated_${mood}.mid`);
  const readableChordProgression = magenta.noteSequenceToChordProgression(noteSequence);

  return readableChordProgression;
};

const generateChordProgression = async (mood) => {
  const modelDefinition = {
    inputShape: [null, 128],
    units: 512,
    rnn: 'lstm',
    numLayers: 2,
    outputShape: [128],
    dropout: 0.5,
  };

  const model = await magenta.loadModel('music_rnn', modelDefinition);

  const chordProgression = await generateChords(model, mood);

  return chordProgression;
};

app.use(express.json());

app.post('/generate-chord-progression', async (req, res) => {
  const { mood } = req.body;

  try {
    const chordProgression = await generateChordProgression(mood);
    res.status(200).json({ chordProgression });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});