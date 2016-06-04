import { Component, OnInit} from '@angular/core';

@Component({
    selector: 'sel-test',
    template: `<h1>{{title}}</h1>
    `
    })
    export class TestComponent{
          title = "test the title";
    }