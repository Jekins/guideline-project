import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataService {
	constructor (
		private http: Http
	) {}

	getData() {
		return this.http.get('assets/data/components.json')
			.map((res: Response) => res.json());
	}
}