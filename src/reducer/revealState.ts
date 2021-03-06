import CardModel from "../models/CardModel";

const initialState = {
    revealedCardSetDS: new Set<CardModel>(),
    currentGuessedCards: new Set<CardModel>(),
    gameLocked: false,
    resetCount: 0
};

//  test remove initState
export const revealCardStateReducer = (state = initialState,
    action: { type: any; cardModel: CardModel, asyncDispatch: any, resetCount: number }) => {
    console.log(' RevealState Reducer: ' + action.type, state, action);

    switch (action.type) {
        case "REVEAL_CARD":
            if (state.gameLocked) {
                return { ...state };
            }

            if (state.currentGuessedCards.size === 0) {
                const currentGuessedCards = new Set(state.currentGuessedCards);
                return {
                    ...state,
                    revealedCardSetDS: state.revealedCardSetDS,
                    currentGuessedCards: currentGuessedCards.add(action.cardModel)
                };
            }

            if (state.currentGuessedCards.size === 1) {
                // go through all models in the set, and see if action.cardModel's "partner" is in there
                const priorGuessedCard = Array.from(state.currentGuessedCards)[0];
                const didFindComplementCard = priorGuessedCard.id === action.cardModel.id && priorGuessedCard.type !== action.cardModel.type;

                if (didFindComplementCard) {
                    const revealedCardSetDS = new Set(state.revealedCardSetDS).add(priorGuessedCard).add(action.cardModel);
                    return {
                        ...state,
                        revealedCardSetDS: revealedCardSetDS, // has 2 cards in it
                        currentGuessedCards: new Set()
                    };
                }

                const currentGuessedCards = new Set(state.currentGuessedCards);
                setTimeout(() => action.asyncDispatch({ // you guessed, but you struck out
                    type: "HIDE_CARDS"
                }), 1000);
                return {
                    ...state,
                    revealedCardSetDS: state.revealedCardSetDS,
                    currentGuessedCards: currentGuessedCards.add(action.cardModel),
                    gameLocked: true
                };
            }
            break;

        case "HIDE_CARDS":
            return {
                ...state,
                revealedCardSetDS: state.revealedCardSetDS,
                currentGuessedCards: new Set(),
                gameLocked: false
            };

        case "RESET_CARDS":
            return {
                revealedCardSetDS: new Set<CardModel>(),
                currentGuessedCards: new Set<CardModel>(),
                gameLocked: false,
                resetCount: ++state.resetCount
            };

        default:
            console.log('hit default case');
            return {
                ...state,
                revealedCardSetDS: state.revealedCardSetDS,
                currentGuessedCards: state.currentGuessedCards,
                gameLocked: false,
                
            }
    }
};

