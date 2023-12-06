import { AfterContentInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Chat, User } from 'src/app/dataStructure';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DataService } from 'src/app/services/data.service';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.css'],
})
export class BarListComponent implements OnInit{
  searchBoxText = 'Cerca chat';
  searchBoxDelete = 'Pulisci';
  searchChatName = '';
  messageNoUser = 'Errore, effetturare il login'
  //refresh!: boolean;
  user!: User;
  id: number = 1;
  chats!: Chat[];
  idChatSelected: number = 0;

  constructor(
    private router: Router,
    private dataService: DataService,
    private sessionStorageService: SessionStorageService,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.refreschChats.subscribe((value) => {
      if(value){
        this.loadContentInit();
      this.dataSharingService.refreschChats.next(false)
      }
    });
  }
  ngOnInit(): void {
    this.loadContentInit()
  }

  loadContentInit(): void {
    let temp = this.sessionStorageService.getUser();
    if(temp != null){
      this.user = temp;
      this.getListChats();
    }else{
      this.router.navigate(['/login']);
    }    
  }

  getListChats(): void {
    this.dataService.getChats(this.user.id).subscribe((data) => {
      this.chats = data;
      
    });
  }

  setChatSelected(chat: Chat): void {
    this.dataSharingService.idChat.next(chat.idchat);
  }
}
