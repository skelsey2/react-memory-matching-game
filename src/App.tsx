import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {MemoryMatchingGame} from "./components/MemoryMatchingGame/MemoryMatchingGame";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {revealCardStateReducer} from "./reducer/revealState";

function App() {
    // @ts-ignore
    const store = createStore(revealCardStateReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return (
        <MuiThemeProvider>
            <Provider store={store}>
                <MemoryMatchingGame/>
            </Provider>
        </MuiThemeProvider>
    );
}

export default App;
