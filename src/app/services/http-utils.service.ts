import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpUtilsService {

  constructor() { }

	/**************SETTERS HTTP********************/
	setParams(content: any, data: any) {
		for(let key in data) content = content.set(key, data[key])
		return content;
	}
  /**
	 * set Params
	 */
	setHTTPParams(data: any): HttpParams {
		return this.setParams(new HttpParams(),data);
	}

}
