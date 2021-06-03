import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { initialState, reducer } from "./store/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import Album from './components/Album/Album';
import "./App.css"

const code = new URLSearchParams(window.location.search).get('code')

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StateContext.Provider value={{ state }}>
        <DispatchContext.Provider value={{ dispatch }}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {code ? <Dashboard code={code} childComponent={<Home/>}/> : <Login />}
                    </Route>
                    <Route path="/album/:id">
                        <Dashboard code={code} childComponent={<Album type="album"/>} />
                    </Route>
                    <Route exact path="/search">
                        <Dashboard code={code} childComponent={<Search />}/>
                    </Route>
                    <Route exact path="/playlists/:id">
                        <Dashboard code={code} childComponent={<Album type="playlist"/>} />
                    </Route>
                </Switch>
            </Router>
        </DispatchContext.Provider>
    </StateContext.Provider >
}

export default App;
