import { NgModule } from "@angular/core";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";

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
@NgModule({
    imports: [
        MatExpansionModule,
        MatIconModule
    ],
    exports: [
        MatExpansionModule,
        MatIconModule
    ],
    providers: [{ provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class MaterialModule {}
