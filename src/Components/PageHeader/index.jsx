import React from 'react'
import './PageHeader.scss'

const PageHeader = props => {
    return (
        <div>
            <div className="page-header">
                <h2>{props.children}</h2>
            </div>
        </div>
    )
}

export default PageHeader