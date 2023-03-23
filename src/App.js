// CSS
import './App.css';

// React Imports
import {useState, useCallback, useEffect} from 'react'

// data
import {wordsList} from './data/words'
// component
import { StartScreen } from './components/StartScreen';
import Game from './components/Game.js';
import  GameOver  from './components/GameOver';


const stages = [
  { id:1,name:"start"},
  { id:2,name:"game"},
  { id:3,name:"end"}
]

const guessesQty = 5


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord,setPickedWord] = useState("")
  const [pickedCategory,setPickedCategory] = useState("")
  const [letter, setLetter] = useState([])

  const [guessedLetter,setGuessedLetter] = useState([])
  const [wrongLetters,setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(3)
  const [score,setScore] = useState(0)

    const pickedWordAndCategory = useCallback( () => {
      // pega uma categoria aleatória
      const categories = Object.keys(words)
      const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

      console.log(category)

      // pega uma palavra aleatória

      const word = words[category][Math.floor(Math.random() * words[category].length)]

      console.log(word)

      // retono a categoria e a palavra escolhida aleatóriamente

      return {word, category}
    },[words])
  
  // Inicia o jogo
  const startGame = useCallback(() => {
    clearLetterStates()
    const {word,category} = pickedWordAndCategory()
    // Cria um array com as letras da palavra
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toUpperCase())

    // seta estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetter(wordLetters)



    console.log(word, category)
    console.log(wordLetters)


    setGameStage(stages[1].name)
  },[pickedWordAndCategory])

// processa a letra recebida no input

const verifyLetter = (letters) => {
  const normalizedLetters = letters.toUpperCase()
  // checa se a letra já foi usada
  if (
    guessedLetter.includes(normalizedLetters) || 
    wrongLetters.includes(normalizedLetters)
  ){
    return;
  }

  if (letter.includes(normalizedLetters)){
    setGuessedLetter((actualGuessedLetter) =>[
      ...actualGuessedLetter,
      normalizedLetters,
    ])
  }else{
    setWrongLetters((actualWrongLetter) => [
      ...actualWrongLetter,
      normalizedLetters,
    ])

    setGuesses((actualGuesses) => actualGuesses-1)
  }
  
}
const clearLetterStates  = () => {
  setGuessedLetter([])
  setWrongLetters([])
} 

// checa se as tentativas acabaram
useEffect(() => {
  if(guesses<=0){
  clearLetterStates()


    setGameStage(stages[2].name)
  }
},[guesses])

useEffect(() => {
  const uniqueLetters = [... new Set (letter)]
  // win condition 
  if(guessedLetter.length === uniqueLetters.length){
    // adiciona pontos ao jogador
    setScore((actualScore) => actualScore +=100)
    // insere uma nova palabra após o jogador acertar a anterior
    startGame()
  }
},[guessedLetter,letter,startGame])

// reinicia o jogo
const retry = () => {
  setScore(0)
  setGuesses(guessesQty)

  setGameStage(stages[0].name)
}
return (
    <div className="App">
      {gameStage==='start' && <StartScreen startGame={startGame}/> }
      {gameStage==='game' && <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory} 
        letter={letter} 
        guessedLetter={guessedLetter} 
        wrongLetters={wrongLetters} 
        guesses={guesses} 
        score={score}/>}
      {gameStage==='end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
