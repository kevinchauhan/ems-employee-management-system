import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({ cmp }) => {
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) {
            navigate('/')
        }
    }, [auth])

    return cmp
}

export default Protected