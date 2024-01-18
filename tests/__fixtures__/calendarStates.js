export const events = [
    {
        id: '1',
        start: new Date('2023-10-21 13:00:00'),
        end: new Date('2023-10-21 15:00:00'),
        title: 'Cumpleaños',
        notes: 'Alguna nota'
    },
    {
        id: '2',
        start: new Date('2023-10-23 13:00:00'),
        end: new Date('2023-10-23 15:00:00'),
        title: 'Cumpleaños de mala',
        notes: 'Alguna nota de mala'
    },
]


// fixtures
export const initialState = {
    isLoadingEvents: true,
        events: [],
        activeEvent: null
}
export const calendarWithEventsState = {
    isLoadingEvents: false,
        events: [ ... events ],
        activeEvent: null
}
export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
        events: [ ... events ],
        activeEvent: { ...events[0]}
}