import { Component, OnInit} from '@angular/core';
import 'rxjs/Rx';

// package.json has the dependency list
@Component({
    selector: 'sel-tcl',
    templateUrl: 'app/tradingchecklist/tcl.html',
    styleUrls: ['app/tradingchecklist/tcl.css']
})

//[provide('localStorage', {useValue: window.localStorage})]

export class tclComp implements OnInit {
    public title: string = 'Trading Checklist';
    private errorMessage: string = '';
    
      constructor() { }
      ngOnInit() {
    
  }
}

