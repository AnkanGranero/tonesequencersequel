import React, {Component} from "react"
import Tone from 'tone';


const bass = new Tone.Synth().toMaster();
const melody = new Tone.Synth().toMaster();
const harmony = new Tone.Synth().toMaster();

let bassNote = "C2";
let melodyNote = "E4";
let harmonyNote = "G2";
let allNotes = ["C","D","E","F","G","A","B"]
let bassNotes = ["C2", "G2", "A2", "F2"];
let melodyNotes = ["C4","D4","E4","F4","G4","A4","B4"];
let harmonyNotes = ["C3","D3","E3","F3","G3","A3","B3"];
let j = 0;



function whatSit (sit){
 let situation = sit.replace(/[^A-Za-z]/g, "");
 switch(situation){
 
  case "C": return Math.round(Math.random())? "E" : "G" ;
  case "D": return Math.round(Math.random())? "F" : "A" ;
  case "E": return Math.round(Math.random())? "G" : "B" ;
  case "F": return Math.round(Math.random())? "A" : "C" ;
  case "G": return Math.round(Math.random())? "B" : "D" ;
  case "A": return Math.round(Math.random())? "C" : "E" ;
  case "B": return Math.round(Math.random())? "D" : "F" ;
}
}






class Sequencer extends Component {
    constructor(props) {
    super(props)
  
    this.state = {
      isPLaying: false,
      bpm: 120,
      buttonText: "PLAY"
    }
  }
  
  changeTempo(event){
  
  
  this.setState( {
    bpm: event.target.value
  })
  
  }
  
  play(){
  
  
  
    console.log("playing")
  
  
    let index = 0;
    Tone.Transport.scheduleRepeat(repeat.bind(this), "8n");
    
    if(!this.state.isPLaying){
      console.log("playing");
      this.setState({isPLaying: true})
      Tone.Transport.start();
      this.setState({buttonText: "STOP"});
    }
    else if(this.state.isPLaying){
      console.log("stopped playing");
      this.setState({isPLaying: false})
      Tone.Transport.cancel()
      this.setState({buttonText: "PLAY"});
      
      
    }

 

  
    
    function repeat() {
    
      
      
      if (Tone.context.state !== 'running') {
        Tone.context.resume();
      }
            
            
            
            let step = index % 8;
            let bassInputs = document.querySelector(`.bass input:nth-child(${step +1})`);
            let melodyInputs = document.querySelector(`.melody input:nth-child(${step +1})`);
            let harmonyInputs = document.querySelector(`.harmony input:nth-child(${step +1})`);
  
            Tone.Transport.bpm.value = this.state.bpm;

            if( index == 64) {
              index = 0
            } 

            

              console.log("vilken sit? "+ whatSit(bassNote));

               melodyNote = whatSit(bassNote) + 4;
               console.log("melodyNote är "+ melodyNote)
                 
               harmonyNote = whatSit(melodyNote) + 3;
                 console.log(harmonyNote)
               
             
              
              


  
  

            if( index % 16 == 0) {
            
              bassNote = bassNotes[j++];
              if (j > 3) {
                j = 0
              }
             }
  
            if(bassInputs.checked) {
              

                bass.triggerAttackRelease(bassNote, "8n" );
               
                 
            }
            
            if(melodyInputs.checked) {
              
              
              melody.triggerAttackRelease(melodyNote, "8n" );
            }


            if(harmonyInputs.checked) {


              harmony.triggerAttackRelease(harmonyNote, "8n");
            }

            index++;
        }
  
  
  }

   newBassLine(){
    
     
    let arrOfTones = [];
    for (var i = 0 ; i < 4; i++) {
      
       let nr = Math.floor(Math.random() * 7);
       arrOfTones.push( (allNotes[nr]) + 2 )
       console.log("what nr " + nr)
    }
    console.log(arrOfTones)
   bassNotes = arrOfTones;
  }
  
  render() {
  


  let buttonText = this.state.buttonText;
  
  let bpm = this.state.bpm;
  
    return (
  
  
  
    
  <div className="wrapper">
  <div class="buttons">
  <button id="newBass" onClick={this.newBassLine.bind(this)}>NEW BASSLINE</button>
  <button id="play" onClick={this.play.bind(this)}>{buttonText}</button>
  </div>

  <div className="sideMenu">
  <li> BASS</li>
  <li> MELODY</li>
  <li>HARMONY</li>
  
  </div>
  
  <div className="bass">
          
          <input type="checkbox" index="1"></input>
          <input type="checkbox" index="2"></input>
          <input type="checkbox" index="3"></input>
          <input type="checkbox" index="4"></input>
          <input type="checkbox" index="5"></input>
          <input type="checkbox" index="6"></input>
          <input type="checkbox" index="7"></input>
          <input type="checkbox" index="8"></input>
      </div>
  
      <div className="melody">
          <input type="checkbox" index="1"></input>
          <input type="checkbox" index="2"></input>
          <input type="checkbox" index="3"></input>
          <input type="checkbox" index="4"></input>
          <input type="checkbox" index="5"></input>
          <input type="checkbox" index="6"></input>
          <input type="checkbox" index="7"></input>
          <input type="checkbox" index="8"></input>
      </div>

      <div className="harmony">
          <input type="checkbox" index="1"></input>
          <input type="checkbox" index="2"></input>
          <input type="checkbox" index="3"></input>
          <input type="checkbox" index="4"></input>
          <input type="checkbox" index="5"></input>
          <input type="checkbox" index="6"></input>
          <input type="checkbox" index="7"></input>
          <input type="checkbox" index="8"></input>
      </div>
  
   <div><input name="bpm" id="bpm" type="range" min="30" max="200" value={this.state.bpm} onChange={this.changeTempo.bind(this)} steps="0.1"></input>
   <p>TEMPO: {bpm} BPM</p>
   </div>
  
  </div>
  
    );
  }
  }


  export default Sequencer