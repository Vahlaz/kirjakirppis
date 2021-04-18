import React, { useState, useEffect } from 'react'
import MobileListingTable from './MobileListingTable'
import { useQuery } from '@apollo/client'
import { ALL_LISTINGS } from './queries.js'
import {
    BottomNavigation,
    BottomNavigationAction,
    Button,
    CircularProgress,
    Typography,

} from '@material-ui/core'
import UserWindow from './UserWindow.js'
import { ME } from './queries.js'
import NewListingForm from './NewListingsForm.js'
import { AddCircleOutlined, FaceOutlined } from '@material-ui/icons'

const ChoosePage = ({ page, data, user, setUser, token }) => {
    if (page === 0) return (<MobileListingTable data={data} user={user} />)
    if (page === 1) return (<NewListingForm user={user} />)
    if (page === 2) return (<UserWindow setUser={setUser} user={user} token={token} />)
    return (<>404</>)
}

const MobileSchoolFrongPage = ({setSchool}) => {
    const [page, setPage] = useState(0)
    const School = localStorage.getItem('KirjaKirppis-school')
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    useEffect(() => setToken(localStorage.getItem('KirjaKirppis-user-token')), [])

    const result = useQuery(ALL_LISTINGS, {
        variables: { school: `${School}` },
    })

    const userResult = useQuery(ME)

    if (userResult.loading) {
        return (
            <>
                <CircularProgress />
            </>
        )
    }
    if (!user && token && userResult.data.me) {
        setUser(userResult.data.me)
    }

    if (result.loading) {
        return (
            <>
                <CircularProgress />
            </>
        )
    }

    const allListings = result.data.allListings
    return (
        <div style={{ paddingBottom: 50 }}>
            <Typography variant='h6'>{School}</Typography>
            <Button
                onClick={() => {
                    window.localStorage.removeItem('KirjaKirppis-school')
                    setSchool('')
                }}
            >
                Vaihda koulua
          </Button>
            <ChoosePage page={page} data={allListings} user={user} setUser={setUser} token={token} />

            <BottomNavigation
                value={page}
                onChange={(event, newValue) => setPage(newValue)}
                style={{ position: 'fixed', bottom: 0, top: "auto", width: '100%' }}

            >
                <BottomNavigationAction showLabel label='Ilmoitukset' icon={<FaceOutlined />} />
                <BottomNavigationAction showLabel label='Tee ilmoitus' icon={<AddCircleOutlined />} />
                <BottomNavigationAction showLabel label='Käyttäjä' icon={<FaceOutlined />} />
            </BottomNavigation>
        </div>
    )
}

export default MobileSchoolFrongPage