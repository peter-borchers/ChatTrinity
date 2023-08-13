import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { FaqComponent } from '../faq/faq.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public selectedIndex = 0;
  @ViewChild(ChatComponent) chat!: ChatComponent;
  @ViewChild(HomeComponent) home!: HomeComponent;
  constructor() { }

  ngOnInit() {
  }

}
