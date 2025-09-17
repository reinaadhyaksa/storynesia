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

        // Jalan pertama kali
        syncSession()

        // Refresh ulang setiap kali tab aktif lagi
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                console.log("👀 Tab aktif lagi, sync session")
                syncSession()
            }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)

        // Auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null)

                if (session?.user) {
                    await fetchProfile(session.user.id)
                } else {
                    setProfile(null)
                }

                setLoading(false)
            }
        )

        return () => {
            subscription.unsubscribe()
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
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

    const signUp = async ({ email, password, full_name, avatar_url }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                    avatar_url
                }
            }
        })

        if (error) {
            return { error }
        }

        if (data.user) {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name,
                    avatar_url,
                    updated_at: new Date().toISOString()
                })
                .eq('id', data.user.id)

            if (profileError) {
                console.error('Error updating profile:', profileError)
            } else {
                setProfile({
                    id: data.user.id,
                    email: data.user.email,
                    full_name,
                    avatar_url,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                })
            }
        }

        return { data, error: null }
    }

    const signIn = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        return { data, error }
    }

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error)
        }
    }

    const updateProfile = async (updates) => {
        if (!user) return { error: 'No user logged in' }

        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single()

        if (!error) {
            setProfile(data)
        }

        return { data, error }
    }

    const value = {
        user,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider