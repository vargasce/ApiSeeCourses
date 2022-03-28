'use strict'

/** TEST DATE
 * @Observations => Validacion de metodos de fecha.
 */

const dt = require('../Custom/dates/dates');

describe("Test-Date", () =>{
    test("Balongs Range Times", () =>{
        let result = dt.belongsRangeTime('2021-01-01', '12:00:00', '13:00:00', '13:00:00', '13:40:00');
        expect(true).toBe(result);
    });
});