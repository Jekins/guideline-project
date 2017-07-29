import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class ComponentsService {
    private componentsUrl = 'assets/data/components/component';

    constructor(private http: Http) {
    }

    getComponents(id?) {
        const partUrl = id ? `-${id}` : 's';
        const url = `${this.componentsUrl + partUrl}.json`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
