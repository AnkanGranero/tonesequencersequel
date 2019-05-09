import React, {Component} from "react"
import Tone from 'tone';


const bass = new Tone.Synth().toMaster();
const melody = new Tone.Synth().toMaster();
const harmony = new Tone.Synth().toMaster();

let bassNote = "C2";
let melodyNote = "E4";
let harmonyNote = "G2";

let bassNotes = [];



function dice( range) {
  return Math.floor( Math.random() * range +1 )
 }

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



function bassNoteGenerator (situation){
  
  switch(situation){
  
   case "C2": switch(dice(8)){
                    case 1: return "C2";
                  
                    case 2: return "D2";
                     
                    case 3: return "E2";
                     
                    case 4: return "F2";
                     
                    case 5: return "G2";
                     
                    case 6: return "A2";
                     
                    case 7: return "B2";
                     
                    case 8: return "C3";
                     
   }
   case "C3": switch(dice(3)){
                    case 1: return "B2";
                     
                    case 2: return "G2";
                     
                    case 3: return "C2";
                         
   }
   case "D2": switch(dice(4)){
                    case 1: return "C2";
                     
                    case 2: return "G2";
                     
                    case 3: return "G2";
                     
                    case 3: return "E2";
                     
   }
   case "E2": switch(dice(3)){
                    case 1: return "F2";
                     
                    case 2: return "D2";
                     
                    case 3: return "G2";
                      
   }
   case "F2": switch(dice(3)){
                    case 1: return "C2";
                     
                    case 2: return "G2";
                     
                    case 3: return "E2";
                      
 }
 case "G2": switch(dice(6)){
                    case 1: return "C2";
                     
                    case 2: return "C2";
                     
                    case 3: return "C3";
                     
                    case 4: return "C3";
                     
                    case 5: return "F2";
                     
                    case 6: return "G2";
                     
 }
 
   case "A2": return Math.round(Math.random())? "B2" : "G2" ;
   case "B2": return Math.round(Math.random())? "C3" : "A2" ;
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

initialBassNote(){
    switch(dice(3)){
    case 1: return "C2";
    case 2: return "C3";
    case 3: return "G2";
  
  }
}
  
  play(){
  
bassNotes.push(this.initialBassNote()) ;
  
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
            
              
             } 
  
            if(bassInputs.checked) {
                bassNote = bassNoteGenerator(bassNote);
                
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

  /*  newBassLine(){
    
     
    let arrOfTones = [];
   
    for (var i = 0 ; i < 4; i) {
    
       let nr = Math.floor(Math.random() * 7);
    
       if ( allNotes[nr] + 2 !== arrOfTones[i-1]){
       arrOfTones.push( (allNotes[nr]) + 2 )
       i++;
       console.log("We pushed a tone " + nr)}
       
    } 
   
   
    
   bassNotes = arrOfTones;
  } */
  
  render() {
  


  let buttonText = this.state.buttonText;
  
  let bpm = this.state.bpm;
  
    return (
  
  
  
    
  <div className="wrapper">
  <div class="buttons">
 {/*  <button id="newBass" onClick={this.newBassLine.bind(this)}>NEW BASSLINE</button> */}
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