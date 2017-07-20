import {Component, Input, OnChanges, OnDestroy, SimpleChanges} from "@angular/core";
import {AnswersStore} from "./select-store.service";
import {Answer} from "../_entities/answer";

@Component({
    selector: 'vt-select',
    template: `<div *ngFor="let answer of answersArray" style="border: 1px solid black;">{{answer | json}}</div>`
})
export class VtSelect implements OnChanges, OnDestroy {
    answersArray: Answer[] = [];
    @Input() answers: Answer|Answer[] = [];

    constructor(private answersStore: AnswersStore) {}

    ngOnChanges(changes: SimpleChanges) {
        if (Array.isArray(this.answers)) {
            this.answersArray = this.answers;
        } else {
            this.answersArray = [this.answers];
        }

        this.answersStore.handleChange(changes.answers);
    }

    ngOnDestroy() {
        this.answersStore.removeAnswers(this.answers);
    }
}