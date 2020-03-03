import CardModel from "../models/CardModel";

const initialState = {
    revealedCardSetDS: new Set<number>(),
    currentGuessedCards: new Set<CardModel>()
};

//  test remove initState
export const revealCardStateReducer = (state = initialState, action: { type: any; cardModel: CardModel }) => {
    console.log(' in reducer', state, action);

    switch (action.type) {
        case "REVEAL_CARD":
            if (state.currentGuessedCards.size === 0) {
                const currentGuessedCards = state.currentGuessedCards;
                return {
                    revealedCardSetDS: state.revealedCardSetDS,
                    currentGuessedCards: currentGuessedCards.add(action.cardModel)
                };
            }

            if (state.currentGuessedCards.size === 1) {
                const currentGuessedCards = state.currentGuessedCards;
                return {
                    revealedCardSetDS: state.revealedCardSetDS,
                    currentGuessedCards: currentGuessedCards.add(action.cardModel)
                };
            }

            if (state.currentGuessedCards.size === 2) {
                const currentGuessedCards = state.currentGuessedCards;
                return {
                    revealedCardSetDS: state.revealedCardSetDS,
                    currentGuessedCards: currentGuessedCards.add(action.cardModel)
                };
            }

            console.log('missed all cases');
            break;
        default:
            console.log('hit default case');
            return {
                revealedCardSetDS: state.revealedCardSetDS,
                currentGuessedCards: state.currentGuessedCards
            }
    }
};

