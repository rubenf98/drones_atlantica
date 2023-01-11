import React from 'react'
import Manufacturer from './manufacturer/Manufacturer'
import Operator from './operator/Operator'
import User from './users/User'

function Members() {
    return (
        <div>
            <User />
            <br />
            <Operator />
            <br />
            <Manufacturer />
        </div>
    )
}

export default Members