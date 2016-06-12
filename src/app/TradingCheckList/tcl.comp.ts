import { Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {checkList,stockList,stockListing} from './checkList';
// package.json has the dependency list
@Component({
    selector: 'sel-tcl',
    templateUrl: 'app/tradingchecklist/tcl.html',
    styleUrls: ['app/tradingchecklist/tcl.css']
})

//[provide('localStorage', {useValue: window.localStorage})]

export class tclComp implements OnInit {
    public title: string = 'Trading Checklist';
    public stock: string;
    public tradingVolume: boolean;
    public isEMAok: boolean;
    public isSetup: boolean;
    private stocks: stockList;
    private currentCheck: checkList;
    private errorMessage: string = '';
    
      constructor() { this.tradingVolume = false;}
      saveTask(){
          
        localStorage.setItem("checklist", JSON.stringify(this.stocks));
           
      }
      ngOnInit() {
          let res: string;
            res = localStorage.getItem('checklist');
         if(res != null && res.indexOf('checkList') > 0)
         {

             let restry = JSON.parse(res);
             this.stocks = restry;
             if (this.stocks.list.length > 0)
                this.currentCheck = this.stocks.list[0];
         }
         else {  
            this.stocks = new stockListing();
            }
  }
}

