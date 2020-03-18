import React from "react";
import { connect } from "react-redux";
import shuffle from "shuffle-array";
import { CardType } from "../../models/CardType";
import CardsService from "../../services/CardsService";
import Card from "../Card/Card";
import './Cards.scss';

export class Cards extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            cards: [],
            processedCards: []
        };
    }

    // When the component mounts onto the DOM; like @NgOnInit
    componentDidMount(): void {
        CardsService.getCards()
            .then((resp: any) => this.setState({cards: resp.data.matches}, () =>  this.processCards(resp.data.matches)));
    }

    /**
     * Invoked on Reset
     * @param prevProps 
     * @param nextProps 
     */
    componentDidUpdate(prevProps: any, nextProps: any) {
        console.log('CARDS - componentDidUpdate' + this.props.resetCount);
        if (prevProps.resetCount !== this.props.resetCount) {
            this.processCards(this.state.cards);
        }
    }

    processCards(cards: any) {
        const stateCards = cards.map((card: any) => {
            return <Card key={card.id + CardType.STATE} card={card} cardType={CardType.STATE} />
        });
        const capitolCards = cards.map((card: any) => {
            return <Card key={card.id + CardType.CAPITOL} card={card} cardType={CardType.CAPITOL} />
        });

        this.setState({
            processedCards: shuffle(stateCards.concat(capitolCards))
        });
    }

    render() {
        return (
            <div className="cards-container">{this.state.processedCards}</div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        resetCount: state.revealCardState.resetCount
    }
}


export default connect(
    mapStateToProps,
    () => ({})
)(Cards);
