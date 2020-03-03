import React from "react";
import './Cards.scss';
import CardsService from "../../services/CardsService";
import Card from "../Card/Card";
import {CardType} from "../../models/CardType";
import shuffle from "shuffle-array";

export default class Cards extends  React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            cards: []
        };
    }

    // When the component mounts onto the DOM; like @NgOnInit
    componentDidMount(): void {
        CardsService.getCards()
            .then( (resp: any) => this.setState({
                cards: resp.data.matches
            }));
    }


    processCards(cards: any) {
        const stateCards =  cards.map( (card: any) => {
            return <Card key={card.id + CardType.STATE}  card={card} cardType={CardType.STATE} />
        });
        const capitolCards =  cards.map( (card: any) => {
            return <Card key={card.id + CardType.CAPITOL}  card={card} cardType={CardType.CAPITOL} />
        });

        return shuffle(stateCards.concat(capitolCards));
    }
    
    render() {
        const processedCards = this.processCards(this.state.cards);

        return (
          <div className="cards-container">{processedCards}</div>
        );
    }
}
