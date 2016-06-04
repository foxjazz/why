import {Component, OnInit} from '@angular/core';
import {RegionComponent} from './regions/region.component';
import {ItemComponent} from './EveItems/item.component';
import {PriceBoardComponent} from './PriceBoard/priceboard.component';
import {HelpComponent} from './Help/help.component';
import 'rxjs/Rx';

@Component({
    selector: 'eve-app',
    template: `<h1>Eve Market Data</h1>
    <nav>
        <a (click)="menuitem('help')">Help</a>
        <a (click)="menuitem('region')">Region</a>
        <a (click)="menuitem('items')">Items</a>
        <a (click)="menuitem('pb')">Price Board</a>
    </nav>
    <div id="help">
        <sel-help> loading test </sel-help>
    </div>
    <div id="region">
        <sel-region> loading test </sel-region>
    </div>
    <div id="items">
        <sel-items> loading items </sel-items>
    </div>
   
    <div id="pb">
        <sel-pb> loading canvas </sel-pb>
    </div>
    `,
    styleUrls: ['app/appstyle.css'],
    directives: [RegionComponent, ItemComponent, PriceBoardComponent, HelpComponent],
  //  providers: [HTTP_PROVIDERS]
})

export class AppComponent implements OnInit {
    constructor(){}
    public menuitem(itm: string){
                document.getElementById('items').hidden = true;
                document.getElementById('pb').hidden = true;
                document.getElementById('region').hidden = true;
                  document.getElementById('help').hidden = true;
        switch(itm){
            case 'help': {
                document.getElementById('help').hidden = false;
            }
            break;
            case 'region': {
                document.getElementById('region').hidden = false;
            }
            break;
            case 'items': {
                 document.getElementById('items').hidden = false;
            }
            break;
            case 'pb': {
                 document.getElementById('pb').hidden = false;
            }
            break;
        }
    }
    ngOnInit() {
        this.menuitem('region');
    }
 }
