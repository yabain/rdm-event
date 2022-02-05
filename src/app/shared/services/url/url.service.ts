import { Injectable } from '@angular/core';
import { Router, } from '@angular/router';


@Injectable({
    providedIn: "root"
})
export class UrlService {
    haveRef: boolean = false;

    constructor(
        private router: Router,) {

    }

    getEllectIdToUrl(): string {
        let href = this.router.url;
        let tab = href.split('/');
        if (tab[3]) {
            this.haveRef = true;
            // localStorage.setItem('referal', tab[3]);
            console.log('tab3: ', tab[3]);
            return tab[3];
        } else {
            return 'no_ellect';
        }
    }

    getConfIdToUrl(): string {
        let href = this.router.url;
        let tab = href.split('/');
        if (tab[3]) {
            this.haveRef = true;
            // localStorage.setItem('referal', tab[3]);
            console.log('tab3: ', tab[3]);
            return tab[3];
        } else {
            return 'no_conf';
        }
    }

}