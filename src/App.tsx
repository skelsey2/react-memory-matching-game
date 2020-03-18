import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {MemoryMatchingGame} from "./components/MemoryMatchingGame/MemoryMatchingGame";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {revealCardStateReducer} from "./reducer/revealState";
import asyncDispatchMiddleWare from "./middleware/asyncDispatchMiddleWare";
import { combineReducers, compose } from 'redux';

function App() {

    const reducers = combineReducers({
        revealCardState: revealCardStateReducer
    });

    // @ts-ignore
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    // @ts-ignore
    const store = createStore(reducers, composeEnhancers(applyMiddleware(asyncDispatchMiddleWare)));
    return (
        <MuiThemeProvider>
            <Provider store={store}>
                <MemoryMatchingGame/>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
