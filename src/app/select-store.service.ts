import {Injectable, SimpleChange} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Answer} from "../_entities/answer";
import {AnswersStatistics} from "../_entities/answers-statistics";

@Injectable()
export class AnswersStore {
    private answers: Answer[] = [];
    private answersSubject: BehaviorSubject<AnswersStatistics>;
    answersStatistics$: Observable<AnswersStatistics>;

    constructor() {
        this.answersSubject = new BehaviorSubject<AnswersStatistics>({total: 0, correct: 0});
        this.answersStatistics$ = this.answersSubject.asObservable();
    }

    handleChange(change: SimpleChange) {
        this.removeAnswers(change.previousValue);

        if (Array.isArray(change.currentValue)) {
            change.currentValue.forEach(value => this.answers.push(value));
        } else if (change.currentValue) {
            this.answers.push(change.currentValue);
        }

        this.updateStatistics();
        // console.log('Change handling completed', this.answers);
    }

    removeAnswers(answers: Answer|Answer[]) {
        let itemsToRemove: Answer[] = [];

        if (Array.isArray(answers)) {
            itemsToRemove = answers;
        } else if (answers) {
            itemsToRemove.push(answers);
        }

        itemsToRemove.forEach(value => {
            let foundIndex = this.answers.indexOf(value);
            if (foundIndex >= 0) {
                this.answers.splice(foundIndex, 1);
            }
        });

        this.updateStatistics();
    }

    calculateStatistics(): AnswersStatistics {
        return {
            total: this.answers.length,
            correct: this.answers.filter(value => value.correct == true).length
        };
    }

    updateStatistics() {
        let statistics = this.calculateStatistics();
        this.answersSubject.next(statistics);
    }
}