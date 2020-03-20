import React from "react";
import './ResetAndScoreContainer.scss';
import {Button} from '@material-ui/core';
import {connect} from "react-redux";

class ResetAndScoreContainer extends React.Component<any, any> {
    render() {
        return (
            <Button onClick={() => this.handleResetBtnClick()} variant="contained" color="primary"
                    className="reset-and-score-container">RESET GAME</Button>
        );
    }

    handleResetBtnClick() {
        console.log('reset btn click');
        this.props.dispatchResetBtnClick();
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        dispatchResetBtnClick: () => dispatch({
            type: "RESET_CARDS"
        })
    };
}


export default connect(
    () => ({}),
    mapDispatchToProps
)(ResetAndScoreContainer);
