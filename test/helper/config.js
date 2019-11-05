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
'use strict';

const fs = require('fs');

/**
 * @+
 */
module.exports = {
	server:{
		host: 'localhost',
		port: 9000
	},
	serverDefaultPort:{
		host: '127.0.0.1',
		port: 80
	},
	serverIpv6Host:{
		host: '::1',
		port: 9000
	},
	serverIpv6HostDefaultPort:{
		host: '::1',
		port: 80,
	},
	secureServer:{
		host: 'localhost',
		port: 9000,
		options: {
			key: fs.readFileSync(__dirname + '/cert/key.pem'),
			cert: fs.readFileSync(__dirname + '/cert/cert.pem')
		}
	},
	secureServerDefaultPort:{
		host: 'localhost',
		port: 443,
		options: {
			key: fs.readFileSync(__dirname + '/cert/key.pem'),
			cert: fs.readFileSync(__dirname + '/cert/cert.pem')
		}
	},
	secureServerIpv6Host:{
		host: 'localhost',
		port: 9000,
		options: {
			key: fs.readFileSync(__dirname + '/cert/key.pem'),
			cert: fs.readFileSync(__dirname + '/cert/cert.pem')
		}
	},
	secureServerIpv6HostDefaultPort:{
		host: 'localhost',
		port: 443,
		options: {
			key: fs.readFileSync(__dirname + '/cert/key.pem'),
			cert: fs.readFileSync(__dirname + '/cert/cert.pem')
		}
	}
};