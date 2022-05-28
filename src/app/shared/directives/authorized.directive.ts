import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[isAuthorized]",
})
export class IsAuthorizedDirective {
    hasView = true;
    role: string;

    @Input()
    isAuthorized: string[];
    isRunning = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewRef: ViewContainerRef
    ) {}

    ngOnInit() {  
                this.role = localStorage.getItem('userRole');
                this.role = 'USER';
                if(this.role != '')
                this.hasView = this.isAuthorized.indexOf(this.role) !== -1
                if (this.hasView) {
                    this.viewRef.clear();
                    this.viewRef.createEmbeddedView(this.templateRef);
                } else {
                    this.viewRef.clear();
                }
       
    }
}
