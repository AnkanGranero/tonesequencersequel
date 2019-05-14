import React, { Component } from 'react';
import Tone from 'tone';

const bass    = new Tone.Synth().toMaster();
const melody  = new Tone.Synth().toMaster();
const harmony = new Tone.Synth().toMaster();

let bassNote    = 'C2';
let melodyNote  = 'E4';
let harmonyNote = 'G2';

let bassNotes = [];

function whatSit(sit) {
  let situation = sit.replace(/[^A-Za-z]/g, '');

  switch(situation) {
    case "C": return sample(['E', 'G']);
    case "D": return sample(['F', 'A']);
    case "E": return sample(['G', 'B']);
    case "F": return sample(['A', 'C']);
    case "G": return sample(['B', 'D']);
    case "A": return sample(['C', 'E']);
    case "B": return sample(['D', 'F']);
  }
}

function bassNoteGenerator(situation) {
  const notes = {
    C2: ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3'],
    C3: ['B2', 'G2', 'C2'],
    D2: ['C2', 'G2', 'G2', 'E2'],
    E2: ['F2', 'D2', 'G2'],
    F2: ['C2', 'G2', 'E2'],
    G2: ['C2', 'C2', 'C3', 'C3', 'F2', 'G2'],
    A2: ['B2', 'G2'],
    B2: ['C3', 'A2'],
  };

  return sample(notes[situation]);
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

class Sequencer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isPLaying:  false,
      bpm:        120,
      buttonText: 'PLAY',
    }
  }

  changeTempo(event) {
    this.setState( {
      bpm: event.target.value
    })
  }

  initialBassNote(){
    return sample(['C2','C3','G2']);
  }

  play() {
    bassNotes.push(this.initialBassNote());

    let index = 0;
    Tone.Transport.scheduleRepeat(repeat.bind(this), '8n');

    if (!this.state.isPLaying) {
      console.log('playing');
      this.setState({isPLaying: true})

      Tone.Transport.start();
      this.setState({buttonText: 'STOP'});
    } else if (this.state.isPLaying) {
      console.log('stopped playing');

      this.setState({isPLaying: false})
      Tone.Transport.cancel()
      this.setState({buttonText: 'PLAY'});
    }

    function repeat() {
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }

      let step          = index % 8;
      let bassInputs    = document.querySelector(`.bass input:nth-child(${step +1})`);
      let melodyInputs  = document.querySelector(`.melody input:nth-child(${step +1})`);
      let harmonyInputs = document.querySelector(`.harmony input:nth-child(${step +1})`);

      Tone.Transport.bpm.value = this.state.bpm;

      if (index == 64) {
        index = 0;
      }

      console.log('vilken sit? ' + whatSit(bassNote));
      melodyNote = whatSit(bassNote) + 4;
      console.log('melodyNote är ' + melodyNote)

      harmonyNote = whatSit(melodyNote) + 3;
      console.log(harmonyNote)

      if (bassInputs.checked) {
        bassNote = bassNoteGenerator(bassNote);
        bass.triggerAttackRelease(bassNote, '8n' );
      }

      if (melodyInputs.checked) {
        melody.triggerAttackRelease(melodyNote, '8n' );
      }

      if (harmonyInputs.checked) {
        harmony.triggerAttackRelease(harmonyNote, '8n');
      }

      index++;
    }
  }

  renderCheckboxes() {
    return [...Array(8).keys()].map(n => <input type="checkbox" index={ n } />)
  }

  render() {
    let buttonText = this.state.buttonText;
    let bpm        = this.state.bpm;

    return (
      <div className="wrapper">
        <div class="buttons">
          <button id="play" onClick={ this.play.bind(this) }>
            { buttonText }
          </button>
        </div>

        <ul className="sideMenu">
          <li>BASS</li>
          <li>MEL</li>
          <li>HARM</li>
        </ul>

        <div className="bass">
          { this.renderCheckboxes() }
        </div>

        <div className="melody">
          { this.renderCheckboxes() }
        </div>

        <div className="harmony">
          { this.renderCheckboxes() }
        </div>

        <div>
          <input name="bpm"
                 id="bpm"
                 type="range"
                 min="30"
                 max="200"
                 value={ this.state.bpm }
                 onChange={ this.changeTempo.bind(this) }
                 steps="0.1" />
          <p>
            TEMPO: {bpm} BPM
          </p>
        </div>
      </div>
    );
  }
}

export default Sequencer
