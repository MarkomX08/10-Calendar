export const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined,
}
export const AuthenticatedState = {
    status: 'Authenticated',
    user: {
        uid: 'abc',
        name: 'Marco'
    },
    errorMessage: undefined,
}
export const not_AuthenticatedState = {
    status: 'not-Authenticated',
    user: {},
    errorMessage: undefined,
}