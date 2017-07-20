import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AnswersStore} from "./select-store.service";
import {AnswersStatistics} from "../_entities/answers-statistics";

@Component({
    selector: 'answers-statistics',
    template: `
        <div style="border: 1px solid red;">
            <ng-template #loading>Still loading...</ng-template>
            <div *ngIf="answersStatistics$ | async as statistics; else loading">
                <p>Total # of answers: {{statistics.total}}</p>
                <p># of correct answers: {{statistics.correct}}</p>
            </div>
        </div>
    `
})
export class AnswersStatisticsComponent implements OnInit {
    answersStatistics$: Observable<AnswersStatistics>;

    constructor(private answersStore: AnswersStore) {}

    ngOnInit() {
        this.answersStatistics$ = this.answersStore.answersStatistics$;
    }
}