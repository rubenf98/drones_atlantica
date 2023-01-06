import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import project from './redux/project'
import drone from './redux/drone'

const reducer = combineReducers({
    auth,
    application,

    project,
    drone
})

export default reducer