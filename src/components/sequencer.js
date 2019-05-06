import React, {Component} from "react"
import Tone from 'tone';


const kick = new Tone.Player("./kick.wav").toMaster();
const snare = new Tone.Player("./snare.mp3").toMaster();



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
            let kickInputs = document.querySelector(`.kick input:nth-child(${step +1})`);
            let snareInputs = document.querySelector(`.snare input:nth-child(${step +1})`);
  
            Tone.Transport.bpm.value = this.state.bpm;
  
            if(kickInputs.checked) {
                kick.start()
                 
            }
            
            if(snareInputs.checked) {
              
              
                snare.start()
            }
            index++;
        }
  
  
  }
  
  render() {
  


  let buttonText = this.state.buttonText;
  
  let bpm = this.state.bpm;
  
    return (
  
  
  
    
  <div className="wrapper">
  <button id="play" onClick={this.play.bind(this)}>{buttonText}</button>
  
  <div className="kick">
          <input type="checkbox" index="1"></input>
          <input type="checkbox" index="2"></input>
          <input type="checkbox" index="3"></input>
          <input type="checkbox" index="4"></input>
          <input type="checkbox" index="5"></input>
          <input type="checkbox" index="6"></input>
          <input type="checkbox" index="7"></input>
          <input type="checkbox" index="8"></input>
      </div>
  
      <div className="snare">
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