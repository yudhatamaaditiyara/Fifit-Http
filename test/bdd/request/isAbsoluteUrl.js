/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const http = require('http');
const helper = require('../../helper/helper');

/**
 */
describe('Request#isAbsoluteUrl', () => {
	/**
	 */
	it('must be "true" request url', (done) => {
		let server = helper.createServer();
		server.listen((request, response) => {
			response.end(request.isAbsoluteUrl ? 'true' : 'false');
		});
		server.start().then(() => {
			let options = {
				host: server.options.host,
				port: server.options.port,
				path: 'http://hostname/path?query=value'
			};
			http.get(options, (response) => {
				let buffer = '';
				response.setEncoding('utf-8');
				response.on('data', string => buffer += string);
				response.on('end', async() => {
					assert.strictEqual(buffer, 'true');
					await server.stop();
					done();
				});
			});
		});
	});

	/**
	 */
	it('must be "false" request url path', (done) => {
		let server = helper.createServer();
		server.listen((request, response) => {
			response.end(request.isAbsoluteUrl ? 'true' : 'false');
		});
		server.start().then(() => {
			let options = {
				host: server.options.host,
				port: server.options.port,
				path: '/path?query=value'
			};
			http.get(options, (response) => {
				let buffer = '';
				response.setEncoding('utf-8');
				response.on('data', string => buffer += string);
				response.on('end', async() => {
					assert.strictEqual(buffer, 'false');
					await server.stop();
					done();
				});
			});
		});
	});
});