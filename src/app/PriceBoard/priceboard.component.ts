import {Component, OnInit} from '@angular/core';
import {ItemType} from '../EveItems/ItemTypes';
import {items, PriceData, PriceBand} from './pricetypes';
import {ISystemShort} from '../regions/IRegions';
import {EvePricingService} from './evepricing.service';
import 'rxjs/Rx';
@Component({
  selector: 'sel-pb',
  templateUrl: 'app/PriceBoard/priceboard.component.html',
  styleUrls: ['app/PriceBoard/canvas.css'],
  providers: [EvePricingService]
})
export class PriceBoardComponent implements OnInit {
  public selSystems: Array<ISystemShort>;
  public selEveItems: Array<ItemType>;
  public resItems: Array<items>;
  public prices: Array<PriceData>;
  public priceBandA: Array<PriceBand>;
  constructor(private evePricingService: EvePricingService) { }
  ngOnInit() {
    this.priceBandA = new Array<PriceBand>();
   
    this.DoAllSelections();
  }
  private loadLocalData() {
     document.getElementById('noData').hidden = true;
    this.selSystems = new Array<ISystemShort>();
    let jsondata = localStorage.getItem('Systems');
    if (jsondata != null && jsondata.indexOf('systemid') > 0)     {
      this.selSystems =JSON.parse(jsondata);
    } else {
        document.getElementById('noData').hidden = false;
        return;
    }
    
     jsondata = localStorage.getItem('SelEveItems');
         if(jsondata != null && jsondata.indexOf('marketGroup') > 0)
         {
             let restry = JSON.parse(jsondata);
             this.selEveItems = restry;
         }  else {  
            this.selEveItems = new Array<ItemType>();
         }
    
  }
  refreshData() {
    this.priceBandA = new Array<PriceBand>();
    this.loadLocalData();
    this.DoAllSelections();
  }
  
  private aggItems(region: string, itemname: string,data: Array<items>){
    let filtered: Array<items>;
    let i = 0;
    let pp = new Array<PriceData>();
    let pps = new Array<PriceData>();
    for(i = 0; i < data.length; i++)
    {
      if(data[i].buy === false){
        let p: PriceData = new PriceData();
        p.duration = data[i].duration;
        p.price = data[i].price;
        p.volume = data[i].volume;
        p.range = data[i].range;
        p.issued = data[i].issued;
        p.location = data[i].location.name;
        pp.push(p);
      }
    }
    pps = pp.sort((left,right): number => {if(left.price < right.price) return -1; if(left.price > right.price) return 1; else return 0;});
    // NEW INTERFACE OBJECT
    let npb: PriceBand = {
      region: region,
      itemname: itemname,
      pricedata: pps
    };
    this.priceBandA.push(npb);
  }
  
  private callPriceData(region: string, itemname: string,regionid: string, itemhref: string) {
    this.evePricingService.getPriceData(regionid, itemhref).subscribe(res => {
      if(res.items.length > 0)
        this.aggItems(region, itemname, res.items);
    },
      err => console.log('Something went wrong:' + err.message));
  }
  private DoAllSelections() {
    let isys = 0;
    let iitem = 0;
    try {
      let x = this.selSystems.length + this.selEveItems.length;
      if(x === 0){
        document.getElementById('noData').hidden = false;
        return;  
      } 
    } catch (error) {
      document.getElementById('noData').hidden = false;
      return;
    }
    for (isys = 0; isys < this.selSystems.length; isys++) {
      for (iitem = 0; iitem < this.selEveItems.length; iitem++) {
        this.callPriceData(this.selSystems[isys].region,this.selEveItems[iitem].type.name,this.selSystems[isys].regionid, this.selEveItems[iitem].type.href);
      }
    }
  }

}