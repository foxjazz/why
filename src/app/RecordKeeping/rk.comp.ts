import { Component, OnInit} from '@angular/core';
import 'rxjs/Rx';

// package.json has the dependency list
@Component({
    selector: 'sel-rk',
    templateUrl: 'app/recordkeeping/rk.html',
    styleUrls: ['app/recordkeeping/rk.css']
})

//[provide('localStorage', {useValue: window.localStorage})]

export class rkComp implements OnInit {
    public title: string = 'Record Keeping';
    private errorMessage: string = '';
    
      constructor() { }
      ngOnInit() {
    
  }
}

