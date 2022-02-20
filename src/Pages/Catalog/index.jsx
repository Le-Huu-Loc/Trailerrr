import React from 'react'
import { useParams } from 'react-router-dom'
import PageGrid from '../../Components/PageGrid'
import PageHeader from '../../Components/PageHeader'

const Catalog = () => {

    const { category } = useParams()

    let stringHeader = ''

    switch (category) {
        case 'movie':
            stringHeader = 'Movies'
            break;
        case 'topmv':
            stringHeader = 'Top Rated Movies'
            break;
        case 'upcomingmv':
            stringHeader = 'Upcoming Movies'
            break;
        case 'toptv':
            stringHeader = 'Top Rated TVs'
            break;
        case 'on_the_air':
            stringHeader = 'On The Air'
            break;
        case 'favourite':
            stringHeader = 'Favourite'
            break;

        default:
            stringHeader = 'TVs'
            break;
    }

    return (
        <>
            <PageHeader>
                {stringHeader}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <PageGrid category={category} />
                </div>
            </div>
        </>
    )
}

export default Catalog