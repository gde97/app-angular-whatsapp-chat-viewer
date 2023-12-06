import { AfterViewChecked, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chat, Message, User } from 'src/app/dataStructure';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DataService } from 'src/app/services/data.service';
import { EditOwnerComponent } from './edit-owner/edit-owner.component';
import { EditChatComponent } from './edit-chat/edit-chat.component';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrls: ['./view-messages.component.css'],
})
export class ViewMessagesComponent implements AfterViewChecked {
  // GUI messages
  noChatSelectedTxt: string = 'Seleziona una chat';
  bottomBarTxt: string = 'Visualizzazione chat esportata';
  topBarTxt: string = '';
  chatNameOption: string = 'Modifica nome chat';
  ownerOption: string = 'Cambia mittente a destra';
  // variables
  idUser?: User;
  idChat?: number;
  chat?: Chat;
  listmsg!: Message[];
  listSender: string[] = [];
  needScroll: boolean = true;
  needToAddOwner: boolean = true;

  constructor(
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private sessionStorageService: SessionStorageService,
    public dialogRef: MatDialog
  ) {
    this.dataSharingService.idChat.subscribe((value) => {
      this.idChat = value;
      this.queryChat();
    });
  }

  ngAfterViewChecked() {
    if(this.needScroll){
      this.scrollToBottom();
    }
  }

  queryChat():void{
    if(this.idChat != undefined){
      this.dataService.getAChat(this.idChat).subscribe({
        next: (chat: Chat) => {
          this.idUser = this.sessionStorageService.getUser();
          this.chat = chat;
          this.queryDataMessages();
        },
      })
    }
  }

  queryDataMessages(): void {
    if (this.chat != undefined) {
      this.dataService.getMessages(this.chat.idchat).subscribe({
        next: (messages) => {
        this.resetForNewData();
        this.listmsg = messages;        
      },
    });
    }
  }

  resetForNewData() {
    this.topBarTxt = this.chat!.name;
    this.listSender = [];
    this.needScroll = true;
    this.needToAddOwner = true;
  }

  scrollToBottom(): void {
    let listToScroll = document.getElementsByClassName('message-list')[0];
    try {
      if (listToScroll != undefined) {
        //console.log(listToScroll);
        let max = listToScroll.scrollHeight;
        //console.log(max);
        listToScroll.scrollTo({ top: max });
        this.needScroll = false;
      }
    } catch (err) {
      //console.log(err);
    }
  }

  checkIfIsOwner(sender: string): boolean {
    if (!this.listSender.includes(sender)) {
      this.listSender.push(sender);
    }
    for(let i = 0; i < this.chat?.nameowner.length! ; i++ ){
      if(this.chat?.nameowner[i].toLowerCase() == (sender.toLowerCase())){
        this.needToAddOwner = false;
        return true;
      }
    };
    return false;
  }

  //todo update del chat.owner, popup to select the owner if list is empty

  openEditChat(){
    this.dialogRef.open(EditChatComponent,{
      data: {chat: this.chat},
      disableClose: true,
    })
  }

  openEditOwner(){
    this.dialogRef.open(EditOwnerComponent,{
      data: {chat: this.chat, listSender: this.listSender},
      disableClose: true,
    })
  }

  queryUpdateChatOwner(nameowner: string): void {
    this.dataService.updateNameOwner(this.chat?.idchat!, nameowner);
  }
}
