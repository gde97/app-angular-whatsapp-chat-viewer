import { Pipe, PipeTransform } from '@angular/core';
import { Chat } from '../dataStructure';

//https://stackblitz.com/edit/angular-searchbar?file=app%2Fshared%2Ffilter.pipe.ts

@Pipe({
  name: 'searchfilter',
})
export class SearchfilterPipe implements PipeTransform {
  transform(chats: Chat[], searchChatName: string): Chat[] {
    if (!chats) return [];
    if (!searchChatName) return chats;
    searchChatName = searchChatName.toLowerCase();
    return chats.filter((chat) => {
      return chat.name.toLowerCase().includes(searchChatName);
    });
  }
}
