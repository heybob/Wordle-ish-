export const cardStates = {
    MATCH: 'MATCH',
    UNMATCH: 'UNMATCHED',
    CONTAINED: 'CONTAINES'
  }

export const MODAL_TEXT = {
    WINNIG: {
        TITLE: "Winner!", 
        MESSAGE: "Congratualtions, you have guessed the correct word!",
        BUTTON_NAME: 'Play Again!'
    },
    LOSING: {
        TITLE: "Sorry!", 
        MESSAGE: "You were unable to guess the word! Please try again", 
        BUTTON_NAME: 'Play Again!' 
    }

}
export const ERROR_MSGS = {
    MIN: 'Words must contain a minimum of 5 characters.',
    NO_NUM: 'Words do not contain numbers.',
    NO_SPECIAL: 'Words do not contain special characters.'
}

export const ENDGAME_TYPE = {
    WIN: 'winner',
    LOSE: 'loser'
}

export const APP_TITLE = 'Wordle(ish)'