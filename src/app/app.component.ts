import {Component, OnInit} from '@angular/core';
import {fundComp} from './fundamentals/fundamental.comp';
import {tclComp} from './tradingchecklist/tcl.comp';
import {rkComp} from './recordkeeping/rk.comp';
import {HelpComponent} from './Help/help.component';
import 'rxjs/Rx';

@Component({
    selector: 'eve-app',
    template: `<h1>Eve Market Data</h1>
    <nav>
        <a (click)="menuitem('help')">Help</a>
        <a (click)="menuitem('fund')">Fundamentals</a>
        <a (click)="menuitem('tcl')">Trading Checklist</a>
        <a (click)="menuitem('rk')">Record Keeping</a>
    </nav>
    <div id="help">
        <sel-help> loading test </sel-help>
    </div>
    <div id="fund">
        <sel-fund> loading check list </sel-fund>
    </div>
    <div id="tcl">
        <sel-tcl> loading items </sel-tcl>
    </div>
   
    <div id="rk">
        <sel-rk> loading records </sel-rk>
    </div>
    `,
    styleUrls: ['app/appstyle.css'],
    directives: [fundComp, tclComp, rkComp, HelpComponent],
  //  providers: [HTTP_PROVIDERS]
})

export class AppComponent implements OnInit {
    constructor(){}
    public menuitem(itm: string){
                document.getElementById('fund').hidden = true;
                document.getElementById('tcl').hidden = true;
                document.getElementById('rk').hidden = true;
                  document.getElementById('help').hidden = true;
        switch (itm) {
            case 'help': {
                document.getElementById('help').hidden = false;
            }
            break;
            case 'fund': {
                document.getElementById('fund').hidden = false;
            }
            break;
            case 'rk': {
                 document.getElementById('rk').hidden = false;
            }
            break;
            case 'tcl': {
                 document.getElementById('tcl').hidden = false;
            }
            break;
        }
    }
    ngOnInit() {
        this.menuitem('fund');
    }
 }
