import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Faqs from '../../assets/faqs.json';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges  {
  @Input() public faqQuestionModel!: any;
  @Input() public selectedIndex = 0;
  public question!: string;
  public chats: Array<any> = new Array();
  public tabs: Array<any> = Faqs;
  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }
  ngOnChanges(simpleChange: SimpleChanges) {
    if(simpleChange && simpleChange['faqQuestionModel'] && simpleChange['faqQuestionModel'].currentValue) {
      this.faqQuestion(simpleChange['faqQuestionModel'].currentValue);
    }
    if(simpleChange && simpleChange['selectedIndex'] && simpleChange['selectedIndex']) {
      this.chats = [];
    }
  }
  faqQuestion(question: any) {
    const chatQuestionModel = {
      sender: 'user',
      data: {
        answer: question.question
      }
    }
    this.chats.push(chatQuestionModel);
    setTimeout(() => {
      const chatAnswerModel = {
        sender: 'bot',
        isFaq: true,
        data: {
          answer: (question.answer as Array<any>).join('')
        }
      }
      this.chats.push(chatAnswerModel);
    }, 100);
  }
  sendMessage() {
    const model = {
      question: this.question,
      chat_history: []
    }
    const chatModel = {
      sender: 'user',
      data: {
        answer: this.question
      }
    }
    this.chats.push(chatModel);
    this.question = '';
    const request = {
      ...this.tabs[this.selectedIndex],
      body: model
    }
    this.apiService.sendMessage(request).subscribe((res: Array<any>) => {
      res = res.map(el => {
        return  {
          sender: 'bot',
          ...el
        }
      })
      this.chats.push(...res);
    })
  }
  onClear() {
    this.chats = new Array();
  }
}
