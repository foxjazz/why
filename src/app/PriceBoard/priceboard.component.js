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
var pricetypes_1 = require('./pricetypes');
var evepricing_service_1 = require('./evepricing.service');
require('rxjs/Rx');
var PriceBoardComponent = (function () {
    function PriceBoardComponent(evePricingService) {
        this.evePricingService = evePricingService;
    }
    PriceBoardComponent.prototype.ngOnInit = function () {
        this.priceBandA = new Array();
        this.DoAllSelections();
    };
    PriceBoardComponent.prototype.loadLocalData = function () {
        document.getElementById('noData').hidden = true;
        this.selSystems = new Array();
        var jsondata = localStorage.getItem('Systems');
        if (jsondata != null && jsondata.indexOf('systemid') > 0) {
            this.selSystems = JSON.parse(jsondata);
        }
        else {
            document.getElementById('noData').hidden = false;
            return;
        }
        jsondata = localStorage.getItem('SelEveItems');
        if (jsondata != null && jsondata.indexOf('marketGroup') > 0) {
            var restry = JSON.parse(jsondata);
            this.selEveItems = restry;
        }
        else {
            this.selEveItems = new Array();
        }
    };
    PriceBoardComponent.prototype.refreshData = function () {
        this.priceBandA = new Array();
        this.loadLocalData();
        this.DoAllSelections();
    };
    PriceBoardComponent.prototype.aggItems = function (region, itemname, data) {
        var filtered;
        var i = 0;
        var pp = new Array();
        var pps = new Array();
        for (i = 0; i < data.length; i++) {
            if (data[i].buy === false) {
                var p = new pricetypes_1.PriceData();
                p.duration = data[i].duration;
                p.price = data[i].price;
                p.volume = data[i].volume;
                p.range = data[i].range;
                p.issued = data[i].issued;
                p.location = data[i].location.name;
                pp.push(p);
            }
        }
        pps = pp.sort(function (left, right) { if (left.price < right.price)
            return -1; if (left.price > right.price)
            return 1;
        else
            return 0; });
        // NEW INTERFACE OBJECT
        var npb = {
            region: region,
            itemname: itemname,
            pricedata: pps
        };
        this.priceBandA.push(npb);
    };
    PriceBoardComponent.prototype.callPriceData = function (region, itemname, regionid, itemhref) {
        var _this = this;
        this.evePricingService.getPriceData(regionid, itemhref).subscribe(function (res) {
            if (res.items.length > 0)
                _this.aggItems(region, itemname, res.items);
        }, function (err) { return console.log('Something went wrong:' + err.message); });
    };
    PriceBoardComponent.prototype.DoAllSelections = function () {
        var isys = 0;
        var iitem = 0;
        try {
            var x = this.selSystems.length + this.selEveItems.length;
            if (x === 0) {
                document.getElementById('noData').hidden = false;
                return;
            }
        }
        catch (error) {
            document.getElementById('noData').hidden = false;
            return;
        }
        for (isys = 0; isys < this.selSystems.length; isys++) {
            for (iitem = 0; iitem < this.selEveItems.length; iitem++) {
                this.callPriceData(this.selSystems[isys].region, this.selEveItems[iitem].type.name, this.selSystems[isys].regionid, this.selEveItems[iitem].type.href);
            }
        }
    };
    PriceBoardComponent = __decorate([
        core_1.Component({
            selector: 'sel-pb',
            templateUrl: 'app/PriceBoard/priceboard.component.html',
            styleUrls: ['app/PriceBoard/canvas.css'],
            providers: [evepricing_service_1.EvePricingService]
        }), 
        __metadata('design:paramtypes', [evepricing_service_1.EvePricingService])
    ], PriceBoardComponent);
    return PriceBoardComponent;
}());
exports.PriceBoardComponent = PriceBoardComponent;
//# sourceMappingURL=priceboard.component.js.map