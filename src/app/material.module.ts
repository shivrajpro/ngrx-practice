import { NgModule } from "@angular/core";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectInfiniteScrollModule } from "ng-mat-select-infinite-scroll";

const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: "DD-MM-YYYY",
    },
    display: {
        dateInput: "DD-MM-YYYY",
        monthYearLabel: "MMMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
    },
};

const modules = [
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectInfiniteScrollModule
]
@NgModule({
    imports: modules,
    exports: modules,
    providers: [{ provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class MaterialModule {}
