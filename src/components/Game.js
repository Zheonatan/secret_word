import React, { useState,useRef } from 'react'
import './Game.css'

const Game = ({verifyLetter, pickedWord,pickedCategory,letter,guessedLetter,wrongLetters,guesses,score}) => {
  
  const[letters,setLetters] = useState("")
  const lettersInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    verifyLetter(letters)
    setLetters("")
    lettersInputRef.current.focus()

  }

  return     (
    <div className="game">
      <p className="points"><span>Pontuação {score}</span></p>
        <h1>Advinhe a Palavra</h1>
        <h3 className="tip"></h3>
        <h3 className="tip">Dica Sobre a palavra: <span>{pickedCategory}</span></h3>
        <p>Você ainda tem {guesses} tentativas</p>
        <div className="wordContainer">
          {letter.map((letters,i) =>
            guessedLetter.includes(letters)?(
            <span key={i} className="letter">{letters}</span> 
            ):(
              <span key={i} className="blankSquare"></span>
          ))}
          </div>
          <div className="letterContainer">
            <p>Tente Advinhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}>
              <input type="text"
                name='letter'
                maxLength='1'
                required 
                onChange={(e) => setLetters(e.target.value)} 
                value={letters} 
                ref={lettersInputRef}/>
              <button>Jogar</button>
            </form>
          </div>
          <div className="wrongLettersContainer">
            <p>Letras já utilizadas</p>
            {wrongLetters.map((letters,i) =>(
              <span key={i}>{letters},</span>
            )) }
          </div>
    </div>
  )
}

export default Game
