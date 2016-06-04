"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var region_component_1 = require('./regions/region.component');
var item_component_1 = require('./EveItems/item.component');
var priceboard_component_1 = require('./PriceBoard/priceboard.component');
var help_component_1 = require('./Help/help.component');
require('rxjs/Rx');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.menuitem = function (itm) {
        document.getElementById('items').hidden = true;
        document.getElementById('pb').hidden = true;
        document.getElementById('region').hidden = true;
        document.getElementById('help').hidden = true;
        switch (itm) {
            case 'help':
                {
                    document.getElementById('help').hidden = false;
                }
                break;
            case 'region':
                {
                    document.getElementById('region').hidden = false;
                }
                break;
            case 'items':
                {
                    document.getElementById('items').hidden = false;
                }
                break;
            case 'pb':
                {
                    document.getElementById('pb').hidden = false;
                }
                break;
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        this.menuitem('region');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'eve-app',
            template: "<h1>Eve Market Data</h1>\n    <nav>\n        <a (click)=\"menuitem('help')\">Help</a>\n        <a (click)=\"menuitem('region')\">Region</a>\n        <a (click)=\"menuitem('items')\">Items</a>\n        <a (click)=\"menuitem('pb')\">Price Board</a>\n    </nav>\n    <div id=\"help\">\n        <sel-help> loading test </sel-help>\n    </div>\n    <div id=\"region\">\n        <sel-region> loading test </sel-region>\n    </div>\n    <div id=\"items\">\n        <sel-items> loading items </sel-items>\n    </div>\n   \n    <div id=\"pb\">\n        <sel-pb> loading canvas </sel-pb>\n    </div>\n    ",
            styleUrls: ['app/appstyle.css'],
            directives: [region_component_1.RegionComponent, item_component_1.ItemComponent, priceboard_component_1.PriceBoardComponent, help_component_1.HelpComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map