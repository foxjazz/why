import { Component, OnInit} from '@angular/core';
import 'rxjs/Rx';

// package.json has the dependency list
@Component({
    selector: 'sel-fund',
    templateUrl: 'app/fundamentals/fund.html',
    styleUrls: ['app/fundamentals/fund.css']
})

//[provide('localStorage', {useValue: window.localStorage})]

export class fundComp implements OnInit {
    public title: string = 'Fundamentals';
    private errorMessage: string = '';
    
      constructor() { }
      ngOnInit() {
    
  }
}

