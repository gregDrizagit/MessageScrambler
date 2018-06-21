import React, { Component } from 'react';
import ScramblerControls from './ScramblerControls'

let randomCharacters = ['a','b','c' ,'d','e','f', 'g','h','o','j', 'k', 'l', 'm', 
'n', 'o', 'p', 'q', 'r', 's', 't','u','v', 'w', 'x', 'y', 
'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', 
'#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '[' , ']', '{', '}', 
'?', '<', '>', '/', ':', ';', '|' ];


class App extends Component {

  state = {message:`Hello Fuzz! Thanks for letting me share my skills with you! 
                    You can scramble any message you like by putting some text in the 
                    box and pressing *scramble*. Press *unscramble* to unscramble the text. The letters in red are the letters from your message input.`
  , messageString:''}

  handleInput = (e) => {
    this.setState({message: e.target.value})
  }

  componentDidMount(){
    this.scramble()
  }

  unscramble = () => {
    let spans = document.body.querySelectorAll('span, br')
    let messageString = '';
    let spanObjects = [];
      for(let i = 0; i < spans.length; i++){
        
        if(spans[i].hasAttribute('hidden')){
          spanObjects.push(<span style={{fontSize: 18, color:'red'}}>{spans[i].innerHTML}</span>)
          messageString += spans[i].innerHTML
        }else if(spans[i].tagName === "BR"){
          spanObjects.push(<br />)
        }else{
          spanObjects.push(<span>{spans[i].innerHTML}</span>)
        }   
      }

      this.setState({spans: spanObjects, messageString: messageString})
    
  }

  

  scramble = () => {

    if(this.state.message !== ''){
        let spans = []; 
        let messageArray = this.state.message.split('')
        this.setState({messageString: ""})
        messageArray.forEach(char => {

          spans.push(<span hidden>{char}</span>)

          let randomIndex = Math.floor(Math.random() * Math.floor(70)) 

          for(let i = 0; i < randomIndex; i++){
            let randomChar = randomCharacters[Math.floor(Math.random() * Math.floor(randomCharacters.length))]; 
            spans.push(<span>{randomChar}</span>)

            if(spans.length % 100 === 0){
              spans.push(<br />)
            }
          }
      })
      this.setState({spans: spans})

    }else{
      alert('Please enter a message to scramble')

    }
  }

  

    render() {  
      if(this.state.spans){
        return (
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
      return(
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
