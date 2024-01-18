import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { AuthenticatedState, initialState } from "../../__fixtures__/authState"
import { testUserCredentials } from "../../__fixtures__/testUserCredentials";

describe('Pruebas en AuthSlice', () => {

    test('debe de regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual( initialState );
        

    });

    test('debe de realizar un login', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials )) 
        expect( state ).toEqual({
            status: 'Authenticated',
            user: testUserCredentials,
            errorMessage: undefined
          })
    });

    test('debe de realizar el logout', () => {
        const errorMessage= 'Credenciales no válidas';
        const state = authSlice.reducer( AuthenticatedState, onLogout(errorMessage));
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage,
        });
    });

    test('debe de limpiar el msj de error', () => {
        const errorMessage = 'Credenciales no válidas';
        const state =  authSlice.reducer( AuthenticatedState, onLogout( errorMessage ));
        const newState = authSlice.reducer( state, clearErrorMessage());

        expect( newState.errorMessage).toBe( undefined );
    })

})