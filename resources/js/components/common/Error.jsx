import { Alert } from 'antd'
import React from 'react'

function Error({ errors, message }) {
    return (
        <div>{errors.length ? <Alert
            message={message}
            description={errors.map((error, index) => (
                <p key={index}>{error}</p>
            ))}
            style={{ margin: "20px 0px" }}
            type="error"
            closable
        /> : <></>}</div>
    )
}

export default Error