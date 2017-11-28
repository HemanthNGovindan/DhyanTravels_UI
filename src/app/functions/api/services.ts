import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class APIService {
    private apiURL = '';
    public PageContent: any;
    public LoadPage: boolean = false;
    public IPAddress: string = '';
    public AppData: {};
    private sericeRespondedSource = new Subject<object>();
    sericeResponded$ = this.sericeRespondedSource.asObservable();
    public animatecabdiv: boolean = false;
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    constructor(public http: Http) { }

    // // Service message commands
    announceServiceResponse(data: any) {
        this.sericeRespondedSource.next(data);
    }
    FetchSiteContents() {
        return this.http.get(this.apiURL + '/ReadApplicationContentFile').map(response => response.json());
    }

    NotifyCustomer(req: any) {
        // 'http://localhost:60543'
        return this.http.post(this.apiURL + '/NotifyCustomer', req, { headers: this.headers }).map(response => response.json());
    }
    FetchIPAddress() {
        return this.http.get('https://api.ipify.org').map(response => response);
    }
}