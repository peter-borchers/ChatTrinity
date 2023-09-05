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
  public loadingMessage = 'Good question, we\'re working on it...';
  private readonly awsPrefix = "botsonic.s3.amazonaws.com/";

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
      answer: question.question
    }
    this.chats.push(chatQuestionModel);
    setTimeout(() => {
      const chatAnswerModel = {
        sender: 'bot',
        isFaq: true,
        answer: (question.answer as Array<any>).join('')
      }
      this.chats.push(chatAnswerModel);
    }, 100);
  }
  sendMessage() {
    const model = {
      input_text: this.question,
      chat_history: []
    }
    const chatModel = {
      sender: 'user',
      answer: this.question
    }
    this.chats.push(chatModel);//adding the typed question to the chats array and therefore to the page
    this.question = '';
    const request = {
      ...this.tabs[this.selectedIndex],
      body: model
    };
    const loadingChatModel =  {
      sender: 'bot',
      answer: this.loadingMessage
    }
    this.chats.push(loadingChatModel);//adding the holding message to the chats array and therefor the page.
    this.apiService.sendMessage(request).subscribe((res: any) => {
      res = {
        sender: 'bot',
      ...res
      };
      this.chats.splice(this.chats.length - 1, 1);//remove the loading message
      res.answer = this.transformToHyperlinks(res.answer);//replace hyperlinks
      this.chats.push(res);//add the new answer to the array
    }, (error: any) => {
      this.chats.splice(this.chats.length - 1, 1);
    })
  }
  onClear() {
    this.chats = new Array();
  }
   public getSourceName(url: string): string {
    if (url.includes(this.awsPrefix)) {
      const splittedFilename = url.split(this.awsPrefix)[1].split(".");
      splittedFilename.shift();
      return splittedFilename.join(".");
    }
    return url.replace("https://", "");
  }

  public transformToHyperlinks(paragraph: string): string {
    // Regular expression with 'g' flag to match all occurrences
    const regex = /\[(.*?)\]\((.*?)\)/g;
    
    // Use String.replace() to transform all matching patterns into hyperlinks
    return paragraph.replace(regex, (match, displayText, target) => {
      return `<a href="${target}" target="_blank">${displayText}</a>`;
    });
  }

}
