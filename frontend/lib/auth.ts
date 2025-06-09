export async function signIn(email: string, password: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })

        if(!res.ok){
            const error = await res.json();
            throw new Error(error.message || 'Login failed')
        }

        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data;
    } catch (error){
        console.log('SignIn Error:', error);
        throw error;
    }
}

export function getCurrentUser() {
    if(typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}