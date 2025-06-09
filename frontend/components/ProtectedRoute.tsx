'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

type Props = {
    allowedRoles: string[]
    children: React.ReactNode
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
    const router = useRouter()

    useEffect(() => {
        const user = getCurrentUser()

        if(!user) {
            window.alert('You are not logged in')
            router.replace('/') // If user is not logged in, redirect to login
        } else if (!allowedRoles.includes(user.role)) {
            window.alert('You have no permission to access this page')
            router.replace('/') // If user does not have permission, redirect to login
        }
    }, [router, allowedRoles])

    return<>{children}</>
}

export default ProtectedRoute