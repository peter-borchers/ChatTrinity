import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FaqComponent } from '../faq/faq.component';
import Faqs from '../../assets/faqs.json';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(FaqComponent) faq!: FaqComponent;
  public selectedTabQuestion: any;
  @Input() public selectedIndex = 0;
  @Output() setIndex: EventEmitter<any> = new EventEmitter();
  public tabs: Array<any> = Faqs;
  constructor(public router: Router) { }

  ngOnInit() {
  }
  onIndexChange() {
    this.setIndex.emit(this.selectedIndex);
  }
}
