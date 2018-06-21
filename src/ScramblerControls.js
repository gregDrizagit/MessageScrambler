import React from 'react'

class ScramblerControls extends React.Component{
    
    render(){
        return(
            <div>
                <input style={{width: 300, height: 15}} onChange={this.props.handleInput} value={this.props.message} />
                <button onClick={this.props.scramble}>Scramble</button> 
                <button onClick={this.props.unscramble}>Unscramble</button>
            </div>

        )
    }
}
export default ScramblerControls