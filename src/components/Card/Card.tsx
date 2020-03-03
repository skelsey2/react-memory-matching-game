import React from "react";
import {CardType} from "../../models/CardType";
import './Card.scss';
import {default as MuiCard} from '@material-ui/core/Card';
import {connect} from "react-redux";
import CardModel from "../../models/CardModel";

class Card extends React.Component<any, any> {
    private cardModel: CardModel;

    constructor(props: any, context: any) {
        super(props, context);

        this.cardModel = new CardModel(props.card.id, props.card.type);
    }

    render() {
        console.log('in render');
        const cardData =  this.getCardDataOrX();

        return (
            <MuiCard  variant="outlined" className="card">
                    <span onClick={ (event) => this.handleRevealCardClick(event) }>{cardData}</span>
            </MuiCard>
        );
    }

    private getCardDataOrX() {
        // Revealing Cards, not checking for Match Logic
        // Matching logic done prior in reducer
        console.log(' in get card data', this);
        if (this.props.revealedCardSetDS.has(this.cardModel)) {

            return this.getRevealedData();
        }
        return 'X';
    }

    private getRevealedData(){
        if(this.props.cardType === CardType.CAPITOL) {
            return this.props.card.capitol;
        } else{
            return this.props.card.state;
        }
    }

    private handleRevealCardClick(event: any) {
        console.log('reveal card click');
        // dispatches an action
        this.props.blah(this.cardModel);
    }
}

// export default Cards;
// mapStateToProps, fn name comes from React Docs
// https://react-redux.js.org/using-react-redux/connect-mapstate
function mapStateToProps(state: any) {
    return {
        revealedCardSetDS: state.revealedCardSetDS,
        currentGuessedCards: state.currentGuessedCards
    };
}

const mapDispatchToProps = (dispatch: any) => ({
    blah: (cardModel: any) => dispatch({
        type: "REVEAL_CARD",
        cardModel: cardModel
    })
});

//      Redux Wrapped
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);