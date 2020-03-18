import React from "react";
import { connect } from "react-redux";
import CardModel from "../../models/CardModel";
import { CardType } from "../../models/CardType";
import './Card.scss';

class Card extends React.Component<any, any> {
    private cardModel: CardModel;

    constructor(props: any, context: any) {
        super(props, context);

        this.cardModel = new CardModel(props.card.id, props.cardType);
    }

    render() {
        const cardData = this.getRevealedData();
        const flipped = this.getIsFlipped();

        return (
            <div onClick={(event) => this.handleRevealCardClick(event)}
                className={`card ${flipped && "flipped"}`}>
                <div className="a-card-side front">X</div>
                <div className="a-card-side back">{cardData}</div>
            </div>
        );
    }

    getIsFlipped() {
        // Revealing Cards, not checking for Match Logic
        // Matching logic done prior in reducer
        // console.log(' in get card data', this);
        return this.doCardsStructurallyContainCard(this.props.revealedCardSetDS, this.cardModel) ||
            this.doCardsStructurallyContainCard(this.props.currentGuessedCards, this.cardModel);
    }

    doCardsStructurallyContainCard(cards: Set<CardModel>, card: CardModel) {
        return Array.from(cards)
            .some(element => card.equals(element));
    }

    private getRevealedData() {
        if (this.props.cardType === CardType.CAPITOL) {
            return this.props.card.capitol;
        } else {
            return this.props.card.state;
        }
    }

    private handleRevealCardClick(event: any) {
        // dispatches an action
        this.props.blah(this.cardModel);
    }
}

// export default Cards;
// mapStateToProps, fn name comes from React Docs
// https://react-redux.js.org/using-react-redux/connect-mapstate
function mapStateToProps(state: any) {
    return {
        revealedCardSetDS: state.revealCardState.revealedCardSetDS,
        currentGuessedCards: state.revealCardState.currentGuessedCards
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        blah: (cardModel: any) => dispatch({
            type: "REVEAL_CARD",
            cardModel: cardModel
        })
    };
};

//      Redux Wrapped
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);