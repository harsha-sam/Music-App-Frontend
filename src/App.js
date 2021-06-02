import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { initialState, reducer } from "./store/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import Album from './components/Album/Album';
import "./App.css"

const code = new URLSearchParams(window.location.search).get('code')

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StateContext.Provider value={{state}}>
        <DispatchContext.Provider value={{dispatch}}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        { code ? <Dashboard code={code} /> : <Login /> }
                    </Route>
                    <Route path="/album/:id" children={<Album />} />
                </Switch>
            </Router>
        </DispatchContext.Provider>
    </StateContext.Provider>
}

export default App;
