"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
//import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
require('rxjs/add/operator/map');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS]);
//bootstrap(RegionComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]); 
//# sourceMappingURL=main.js.map