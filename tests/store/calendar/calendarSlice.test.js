import { calendarSlice, onAddnewEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithEventsState, events, initialState } from "../../__fixtures__/calendarStates";

describe('Prueba en calendarSlice|', () => {

    test('debe de regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState);

    });

    test('onSetActiveEvent deve de activar el evento', () => {

        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        expect( state.activeEvent ).toEqual(events[0]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = {
            id: '3',
            start: new Date('2023-10-25 13:00:00'),
            end: new Date('2023-10-25 15:00:00'),
            title: 'Cumpleaños sorpresa',
            notes: 'Alguna nota de la sorpresa'
        };
        const state = calendarSlice.reducer( calendarWithEventsState, onAddnewEvent( newEvent ))
        expect(state.events).toEqual([...events, newEvent ]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const updEvent = {
            id: '1',
            start: new Date('2020-10-25 13:00:00'),
            end: new Date('2020-10-25 15:00:00'),
            title: 'Cumpleaños sorpresa de alguien',
            notes: 'Alguna nota de la sorpresa de alguien'
        };
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updEvent ));
        expect(state.events).toContain( updEvent ); 
    });

    

})