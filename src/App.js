import './App.css';
import {useEffect, useState, useRef} from 'react';
import {Tile} from './classes/Tile';
import { TileList } from './components/TileList';
import { cardStates, MODAL_TEXT } from './shared/constants';
import { Modal } from './components/Modal/Modal'; 
import { StringFrequencyMap } from './classes/StringFrequencyMap';

function App() {
  const winningModal = {
    title: MODAL_TEXT.WINNIG.TITLE, 
    message: MODAL_TEXT.WINNIG.MESSAGE, 
    confirmCallback: setModal, 
    buttonName: MODAL_TEXT.WINNIG.BUTTON_NAME
  };
  const losingModal = {
    title: MODAL_TEXT.LOSING.TITLE, 
    message: MODAL_TEXT.LOSING.MESSAGE, 
    confirmCallback: setModal, 
    buttonName: MODAL_TEXT.LOSING.BUTTON_NAME
  };
  const [wordleInput, setWordleInput] = useState('');
  const [wordleData, setWordleData] = useState([]);
  const [wordleSubmitCount, setWordleSubmitCount] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [modalState, setModalState] = useState(false);
  const [modalDetails, setModalDetails] = useState(losingModal);
  const wordleWord = 'woody';
  const maxAttempts = 5;
  const inputRef = useRef();
  const endGame = (status) => {
    if(status === 'winner'){
      setModal(true, winningModal)
    } else {
      setModal(true, losingModal);
    }
  };
  
  useEffect(()=> {
    //Refresh state when these dependencies change.
  }, [wordleInput, wordleData, errorText, modalState, modalDetails])

  useEffect(()=> {
    if(isWordleMatch()) {
      endGame('winner');
    } else if(wordleSubmitCount === maxAttempts) {
      endGame('loser');
    } else {
      setWordleInput('');
      inputRef.current.value = '';
    }
  }, [wordleSubmitCount])

  function isWordleMatch() {
    return wordleInput === wordleWord;
  }

  function setModal(state, props=null) {
      setModalDetails(props);
      setModalState(state);
      if(!state) {
        resetData();
      }
  }

  function resetData() {
    setWordleSubmitCount(0);
    setWordleData([]);
    setInputError(false);
    setWordleInput('');
    setErrorText('');
    inputRef.current.value = '';
  }
  
  function createWordleRow() {
    let freqList = new StringFrequencyMap(wordleWord);
    let wordleRow = [];
    for(let i = 0; i < wordleInput.length; i++) {
      if(wordleInput[i] ===  wordleWord[i] && freqList.hasChar(wordleInput[i])) {
        wordleRow[i] = new Tile(wordleInput[i], cardStates.MATCH);
        freqList.remove(wordleInput[i]);
      } else if(freqList.hasChar(wordleInput[i])){
        wordleRow[i] = new Tile(wordleInput[i], cardStates.CONTAINED);
        freqList.remove(wordleInput[i]);
      } else {
        wordleRow[i] = new Tile(wordleInput[i], cardStates.UNMATCH);
      }
    }
    let dat = [...wordleData];
    dat.push(wordleRow);
    setWordleData(dat);
  }

  function isInputValid() {
    if(wordleInput.length < 5) {
      setErrorText('Words must contain a minimum of 5 characters.');
      setInputError(true);
      return false;
    } else if(/\d/.test(wordleInput)) {
      setErrorText('Words do not contain numbers.');
      setInputError(true);
      return false;
    } else if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~œ∑´®†¥¨ˆøπ“‘«åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷¡™£¢∞§¶•ªº–≠]/.test(wordleInput)) {
      setErrorText('Words do not contain special characters.');
      setInputError(true);
      return false;
    } else {
      return true;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(isInputValid()) {
      setInputError(false);
      createWordleRow();
      setWordleSubmitCount((prev) => prev + 1);
    }
  }

  return (
    <div className="App">
      <h1>Wordle(ish)</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" 
              className="input-text--wordle"
              name="wordleText" 
              ref={inputRef} maxLength="5" 
              disabled={wordleSubmitCount === maxAttempts} 
              placeholder="Enter a 5 letter word"
              onChange={(e) => (setWordleInput(e.target.value.toLowerCase()))} />
        <button className="input-button--wordle" 
          type="submit" 
          disabled={wordleSubmitCount === maxAttempts || !wordleInput.length}>Submit</button>
      </form>
      {inputError && (<p className='error'>{errorText}</p>)}
      {wordleData.map((row, i) => (
        <div key={i} className="row-container">
          <TileList tileRow={row} />
        </div>)
      )}  
     {modalState === true && (
     <Modal 
      title={modalDetails.title} 
      message={modalDetails.message} 
      confirmCallback={modalDetails.confirmCallback} 
      buttonName={modalDetails.buttonName} />) }
    </div>
  );
}

export default App;
