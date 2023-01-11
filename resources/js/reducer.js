import { combineReducers } from 'redux'

import auth from './redux/auth'
import application from './redux/application'

import project from './redux/project'
import drone from './redux/drone'
import droneType from './redux/droneType'
import manufacturer from './redux/manufacturer'
import localization from './redux/localization'
import operator from './redux/operator'
import flightReport from './redux/flightReport'
import crashReport from './redux/crashReport'

const reducer = combineReducers({
    auth,
    application,

    project,
    drone,
    droneType,
    manufacturer,
    localization,
    operator,

    flightReport,
    crashReport
})

export default reducer