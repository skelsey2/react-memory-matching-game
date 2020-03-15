import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {MemoryMatchingGame} from "./components/MemoryMatchingGame/MemoryMatchingGame";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {revealCardStateReducer} from "./reducer/revealState";
import asyncDispatchMiddleWare from "./middleware/asyncDispatchMiddleWare";
import { combineReducers } from 'redux';

function App() {

    const reducers = combineReducers({
        revealCardState: revealCardStateReducer
    });

    // @ts-ignore
    const store = createStore(reducers, applyMiddleware(asyncDispatchMiddleWare));
    return (
        <MuiThemeProvider>
            <Provider store={store}>
                <MemoryMatchingGame/>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
