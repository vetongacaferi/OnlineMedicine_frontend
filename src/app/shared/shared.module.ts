import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';



@NgModule({
    imports: [
        //   BrowserModule,
        //   ReactiveFormsModule,
        //   FormsModule
    ],
    declarations: [
        MapComponent
    ],
    exports: [
        MapComponent
    ],
    
    providers: [

    ]
})

export class SharedModule { }