import {Component} from '@angular/core';
import {Answer} from "../_entities/answer";

@Component({
  selector: 'app-root',
  template: `
      <vt-select [answers]="{value: 'apple', correct: false}"></vt-select>
      <vt-select [answers]="answers2"></vt-select>
      <vt-select *ngFor="let answer of answers3" [answers]="answer"></vt-select>

      <button (click)="onSwitchAnswers()">Switch data sets</button>

      <answers-statistics></answers-statistics>
  `
})
export class AppComponent {
  answers2: Answer|Answer[] = [{value: 'pineapple', correct: true}, {value: 'apricot', correct: true}];
  answers3: Answer|Answer[] = [{value: 'mango', correct: false}, {value: 'orange', correct: true}, {value: 'pineapple', correct: true}];

  onSwitchAnswers() {
    this.answers2 = {value: 'pear', correct: false};
    this.answers3 = [{value: 'mango1', correct: true}, {value: 'orange1', correct: false}];
  }
}
