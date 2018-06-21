import React from 'react'

class ScramblerControls extends React.Component{
    
    render(){
        return(
            <div>
                <button onClick={this.props.scramble}>Scramble</button> 
                <button onClick={this.props.unscramble}>Unscramble</button>
                <input onChange={this.props.handleInput} value={this.props.message} />
            </div>

        )
    }
}
export default ScramblerControls