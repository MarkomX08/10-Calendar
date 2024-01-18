import calendarApi from "../../src/api/CalendarApi";

describe('Pruebas en el CalendarApi', () => {
    
    test('debe de tener la configuracion por defect', () => {

        // console.log(calendarApi);
        // console.log(process.env);
        expect(calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    });

    test("debe te tener el x-token en el header de todas las peticiones", async () => {
        const token = "ABC-123-XYZ";
        localStorage.setItem("token", token);
        const res = await calendarApi
          .get("/auth")
          .then((res) => res)
          .catch((res) => res);
          console.log(res);
        expect(res.config.headers["x-token"]).toBe(token);
      });
})