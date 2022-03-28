/** TEST INIT
 * @Observation : Primera pruena de test de inicio, probamos que todo se ejecute 
 * tal cual lo venimos pensando.
 */ 

//const app = require('../index');
//const routes = require('../Routes/routes');
/*
 *const  {agent} = require('supertest');
 *const server = app();
 *const request = agent( server );
 */
//const app = express();
//app.use('/api', routes);

describe("test-init", () =>{
	test("test", ()=>{
		expect(true).toBe(true);
	})
})

/*
 *describe( ' testig-server-routes-contacts', ()=>{
 *  test('It should response the post method',done => {
 *    //const { url } = request.get('/');
 *    request.get('/contacts').then( response =>{
 *      expect(response).toBe(200);
 *      done();
 *    })
 *  })
 *})
 */

