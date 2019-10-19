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

const {IncomingMessage} = require('http');
const Url = require('fifit-url');

/**
 */
class Request extends IncomingMessage
{
	/**
	 * @returns {boolean}
	 */
	get isSecure(){
		return !!this.socket.encrypted;
	}

	/**
	 * @returns {boolean}
	 */
	get isAbsoluteUrl(){
		return /^[a-zA-Z][a-zA-Z0-9+-.]*:/.test(this.url);
	}

	/**
	 * @returns {string}
	 */
	get href(){
		if (this._href == null) {
			this._href = this.isAbsoluteUrl ? this.url : (this.origin + this.url);
		}
		return this._href;
	}

	/**
	 * @returns {string}
	 */
	get origin(){
		if (this._origin == null) {
			this._origin = `${this.protocol}//${this.host}`;
		}
		return this._origin;
	}

	/**
	 * @returns {string}
	 */
	get protocol(){
		if (this._protocol == null) {
			this._protocol = this.scheme + ':';
		}
		return this._protocol;
	}

	/**
	 * @returns {string}
	 */
	get scheme(){
		if (this._scheme == null) {
			this._scheme = this.socket.encrypted ? 'https' : 'http';
		}
		return this._scheme;
	}

	/**
	 * @returns {string}
	 */
	get host(){
		if (this._host == null) {
			this._host = this.headers['host'] || '';
		}
		return this._host;
	}

	/**
	 * @returns {string}
	 */
	get hostname(){
		if (this._hostname == null) {
			const host = this.host;
			const length = host[0] === '[' ? host.indexOf(']') + 1 : host.indexOf(':');
			this._hostname = host.substr(0, length);
		}
		return this._hostname;
	}

	/**
	 * @returns {string}
	 */
	get port(){
		if (this._port == null) {
			const host = this.host;
			this._port = (/\:([0-9]*)$/.exec(host) || [])[1] || '';
		}
		return this._port;
	}

	/**
	 * @returns {string}
	 */
	get path(){
		return this.parsedUrl.path;
	}

	/**
	 * @returns {string}
	 */
	get pathname(){
		return this.parsedUrl.pathname;
	}

	/**
	 * @returns {string}
	 */
	get search(){
		return this.parsedUrl.search;
	}

	/**
	 * @returns {URLSearchParams}
	 */
	get searchParams(){
		return this.parsedUrl.searchParams;
	}

	/**
	 * @returns {string}
	 */
	get query(){
		return this.parsedUrl.query;
	}

	/**
	 * @returns {Object}
	 */
	get queryParams(){
		return this.parsedUrl.queryParams;
	}

	/**
	 * @returns {Url}
	 */
	get parsedUrl(){
		if (this._parsedUrl == null) {
			this._parsedUrl = new Url(this.url);
		}
		return this._parsedUrl;
	}

	/**
	 * @returns {Url}
	 */
	get parsedHref(){
		if (this._parsedHref == null) {
			this._parsedHref = new Url(this.href);
		}
		return this._parsedHref;
	}

	/**
	 * @param {Server} server
	 * @returns {function}
	 */
	static class(server){
		class Request extends this{};
		Request.protoype.server = server;
		return Request;
	}
}

/**
 * @+
 */
module.exports = Request;