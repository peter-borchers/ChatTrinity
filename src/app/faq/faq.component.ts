import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import Faqs from '../../assets/faqs.json';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  @Input() public faqQuestionModel!: any;
  @Input() public selectedIndex = 0;
  @Output() setIndex: EventEmitter<any> = new EventEmitter();
  public tabs: Array<any> = Faqs;
  constructor(public apiService: ApiService) { }
  ngOnInit() {
  }
  onIndexChange() {
    this.setIndex.emit(this.selectedIndex);
  }

}
