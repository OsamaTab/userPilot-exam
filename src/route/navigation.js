import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider, Paper, createMuiTheme, CssBaseline } from '@material-ui/core'

import Nav from './nav'
import Home from '../screen/home'
import UserDetails from '../screen/userDetails'

export default function Navigation() {
    const theme = createMuiTheme({
        typography: {
            fontFamily: 'Mulish'
        },
        palette: {
            background: {
                default: "#E5E5E566"
            },
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Router>
                    <Switch>
                        <Nav>
                            <Route path="/" component={Home} />
                            <Route path="/users/:id" exact component={UserDetails} />
                        </Nav>
                    </Switch>
                </Router>
            </Paper>
        </ThemeProvider>
    )
}
