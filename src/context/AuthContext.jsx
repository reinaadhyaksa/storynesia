import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const syncSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            if (session?.user) {
                await fetchProfile(session.user.id)
            } else {
                setProfile(null)
            }
        }

        // jalan pertama kali
        syncSession()

        // refresh ulang setiap kali tab aktif lagi
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                console.log("👀 Tab aktif lagi, sync session")
                syncSession()
            }
        }
        document.addEventListener("visibilitychange", handleVisibilityChange)

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, [])

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)

            if (session?.user) {
                await fetchProfile(session.user.id)
            }
            setLoading(false)
        }

        getSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null)

                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    setProfile(null)
                }

                setLoading(false)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
            } else {
                setProfile(data)
            }
        } catch (error) {
            console.error('Error in fetchProfile:', error)
        }
    }

    const value = {
        user,
        profile,
        loading,   
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider