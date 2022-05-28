import { FormGroup } from "@angular/forms";

export function capitalizeWords(formGrpName: FormGroup,
    formControlName: string) {
    const inputControl = formGrpName.get(formControlName);
    const capitalWord = inputControl.value.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    inputControl.setValue(capitalWord);
    return
}
