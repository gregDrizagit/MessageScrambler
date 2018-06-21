import React, { Component } from 'react';
import ScramblerControls from './ScramblerControls'

let randomCharacters = ['a','b','c' ,'d','e','f', 'g','h','o','j', 'k', 'l', 'm', 
'n', 'o', 'p', 'q', 'r', 's', 't','u','v', 'w', 'x', 'y', 
'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', 
'#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '[' , ']', '{', '}', 
'?', '<', '>', '/', ':', ';', '|' ]; //create an array of characters to pull from later


class App extends Component {

  state = {message:`Hello Fuzz! Thanks for letting me share my skills with you! 
                    You can scramble any message you like by putting some text in the 
                    box and pressing *scramble*. Press *unscramble* to unscramble the text. 
                    The letters in red are the letters from your message input.`//this is the stock message
  , messageString:''}

  handleInput = (e) => {
    this.setState({message: e.target.value})//we hold the value of the input box in state to create a controlled input 
  }

  componentDidMount(){
    this.scramble() //when the component mounts, we scramble the default message 
  }

  unscramble = () => {
    let spans = document.body.querySelectorAll('span, br')//when we unscrmable, we select all spans and br elements from the dom 
    let messageString = '';
    let spanObjects = [];

      for(let i = 0; i < spans.length; i++){//look over each element
        
        if(spans[i].hasAttribute('hidden')){//if the attribute is hidden, that means it contains one of the letters to our message
          spanObjects.push(<span style={{fontSize: 18, color:'red'}}>{spans[i].innerHTML}</span>)//we push it into our spanObjects array and change the color and size
          messageString += spans[i].innerHTML//add the letter to the message string 
        }else if(spans[i].tagName === "BR"){//if one of the elements in spans is a break object
          spanObjects.push(<br />)//create a new break object 
        }else{
          spanObjects.push(<span>{spans[i].innerHTML}</span>)//if it's just a normal letter, create a new span for it 
        }   
      }

      this.setState({spans: spanObjects, messageString: messageString}) //set the objects and the new message in state
    
  }

  

  scramble = () => {

    if(this.state.message !== ''){ //checks to make sure there is something to scramble 
        let spans = []; 
        let messageArray = this.state.message.split('')//we split the input message into an array 
        this.setState({messageString: ""})
        messageArray.forEach(char => {

          spans.push(<span hidden>{char}</span>) //we push each letter of our message into a new spans array 

          let numRandomChars = Math.floor(Math.random() * Math.floor(70)) //we generate a random number of random chars
          //this is the number of random chars we have inbetween letters from our message
          for(let i = 0; i < numRandomChars; i++){
            let randomChar = randomCharacters[Math.floor(Math.random() * Math.floor(randomCharacters.length))]; //select a random char from our array 
            spans.push(<span>{randomChar}</span>)

            if(spans.length % 100 === 0){//every 100 lines, break
              spans.push(<br />)
            }
          }
      })
      this.setState({spans: spans})//set the spans in state

    }else{
      alert('Please enter a message to scramble')

    }
  }

  

    render() {  
      if(this.state.spans){ //if we're finished processing the message,
        return (//render the controls, the spans, and the decoded message if we have it
            <div style={{margin: '10px'}}>
              <ScramblerControls 
                                unscramble={this.unscramble}
                                scramble={this.scramble}
                                handleInput={this.handleInput}
                                message={this.state.message} />
                <div style={{padding:'10px', fontSize:20}}>
                  {this.state.messageString ?
                      this.state.messageString
                      :
                      null
                    }
                </div>
                <div style={{padding: '10px', fontFamily: "monospace"}}>
                  {this.state.spans}
                </div>
          </div>
        )
    }else{
      return(//else just render the controls
        <div style={{margin: '10px'}}>
        <ScramblerControls 
                            unscramble={this.unscramble}
                            scramble={this.scramble}
                            handleInput={this.handleInput}
                            message={this.state.message} />
        </div>
      )
  }
}
}

export default App;
