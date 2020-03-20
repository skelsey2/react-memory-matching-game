import React from "react";
import Cards from "../Cards/Cards";
import ResetAndScoreContainer from "../ResetAndScoreContainer/ResetAndScoreContainer";
import './MemoryMatchingGame.scss'

export class MemoryMatchingGame extends React.Component<any, any> {
    
    render() {
        return (
            <div className="memory-matching-game-container">
                <Cards />
                <ResetAndScoreContainer />
            </div>
        )
    }
}