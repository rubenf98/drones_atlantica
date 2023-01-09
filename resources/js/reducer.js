import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import project from './redux/project'
import drone from './redux/drone'
import droneType from './redux/droneType'
import manufacturer from './redux/manufacturer'

const reducer = combineReducers({
    auth,
    application,

    project,
    drone,
    droneType,
    manufacturer
})

export default reducer