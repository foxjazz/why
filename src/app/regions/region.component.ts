import { Component, OnInit} from '@angular/core';
import {Region, ISystem, ISystemShortDescriptor, ISystemShort} from './IRegions';
import { HTTPEveService } from './http-eve.service';
import 'rxjs/Rx';

// package.json has the dependency list
@Component({
    selector: 'sel-region',
    templateUrl: 'app/regions/region.component.html',
    styleUrls: ['app/appstyle.css'],
    providers: [HTTPEveService]
})

//[provide('localStorage', {useValue: window.localStorage})]

export class RegionComponent implements OnInit {
    public title: string = 'Regions List';
    private errorMessage: string = '';
    public Regs: Array<Region>;
    
    private loaded = false;
    public avSystems: Array<ISystem>;
    private selRegion: Region;
    private tempSys: Array<ISystemShort>;
    public selSystems: Array<ISystemShort>;
    private lastSelRegion: string;
    private lastSelRegionId: string;
    
      constructor(private eveService: HTTPEveService) { }
      

      private dedupe(sys: Array<ISystem>): Array<ISystem>
      {
        let res: Array<ISystem>;
        res = new Array<ISystem>();
        let flag = false;
          for ( let i = 0; i < sys.length; i++ ) {
            flag = false;
            if (i === 0) {
              res.push(sys[i]);
            }
            for (let i1 = 0; i1 < res.length; i1++) {
              if(sys[i].location.name === res[i1].location.name) {
                flag = true;
              }
            }
            if (!flag){
               res.push(sys[i]);
            }
            i++;
          }
        return res;
      };
      
      public onRemoveStation(systemshort: ISystemShort)
      {
        this.tempSys = this.selSystems;
        this.selSystems = new Array<ISystemShort>();
        let i = 0;
        for (i = 0; i < this.tempSys.length; i++) {
          if (systemshort === this.tempSys[i]) {
            continue;
          }
          this.selSystems.push(this.tempSys[i]);
        }
      }
    public onSelectStation(system: ISystem){
      if(this.selSystems == null){
        this.selSystems = new Array<ISystemShort>();
      }
      var systemshort: ISystemShort = <ISystemShort>{};
      systemshort.region = this.lastSelRegion;
      systemshort.regionid = this.lastSelRegionId;
      systemshort.system = system.location.name;
      systemshort.systemid = system.location.id_str;
      let i = 0;
        for (i = 0; i < this.selSystems.length; i++) {
          if (systemshort === this.selSystems[i]) {
            return;
          }
        }
        this.selSystems.push(systemshort);
        //JSON.stringify(this.selSystems);

        localStorage.setItem('Systems', JSON.stringify(this.selSystems));
          /*let res: string;
         res = localStorage.getItem('Systems');
         var restry = JSON.parse(res);
         console.log('res string from localstorage');
         console.log(res);
         console.log('object restry from localstorage');
         console.log (restry);
         this.selSystems = restry;*/
    }
    
      public onSelectRegion(region: Region) {
        this.selRegion = region;
        this.lastSelRegion = region.name;
        this.lastSelRegionId = region.id_str;
        this.eveService.getSystems(this.selRegion.id_str).subscribe(res => {
          this.avSystems = this.dedupe(res.items);
        });
      }

     getRegions(){
         let restry = JSON.parse(localStorage.getItem('Systems'));
         /*console.log('res string from localstorage');
         console.log(res);
         console.log('object restry from localstorage');
         console.log (restry);*/
         let jsondata = localStorage.getItem('Systems');
         if (jsondata != null && jsondata.indexOf('systemid') > 0)     {
           this.selSystems =JSON.parse(jsondata);
         }
// first I  need to know if data is compantible with res
        // data = JSON.parse(res);

         this.eveService.getRegions().subscribe(res2 => {
                this.Regs =  res2.items.filter(function(el: Region): boolean{
                  if ( isNaN(+el.name.slice(-1))) {
                   return true;
                  }
                });
                if (this.Regs.length > 0) {
                  this.loaded = true;
                }
           }, err => console.log('Something went wrong: ' + err.message));
     }

     ngOnInit() {
    this.getRegions();
  }
}

