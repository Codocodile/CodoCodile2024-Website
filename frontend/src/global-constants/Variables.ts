export const urls = {
    landing: '/',
    signIn: '/sign-in',
    signUp: '/sign-up',
    forgetPassword: '/forget-password',
    passwordReset: '/password-reset/:token',
    panel: '/panel',
    profile: '/panel/profile',
    team: '/panel/team',
    sponsor: '/sponsor',
}
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
