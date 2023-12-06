import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/dataStructure';
import { DataService } from 'src/app/services/data.service';
import { ViewImageComponent } from './view-image/view-image.component';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() idUser!: number;
  @Input() idChat!: number;
  @Input() dataMessage!: Message;

  typeOfAttachment: string = '';
  stringType: string = '';
  toLoad: boolean = true;
  textToLoad: string = '';
  source: string = '';

  constructor(private dataService: DataService, public dialogRef: MatDialog) {}

  isAttachment() {
    if (this.dataMessage.attachment) {
      this.checkTypeAttachment();
      return true;
    }
    return false;
  }

  checkTypeAttachment() {
    if (this.audioAttachment()) {
      this.typeOfAttachment = 'audio';
      this.textToLoad = 'Riproduci audio';
      return;
    } else if (this.imageAttachment()) {
      this.typeOfAttachment = 'image';
      this.textToLoad = 'Visualizza immagine';
      return;
    }
    this.textToLoad = this.dataMessage.nameattachment;
  }

  imageAttachment(): boolean {
    let imagePNG = '.png';
    let imageJPG = '.jpeg';
    let imageJPG2 = '.jpg';
    let imageWEBP = '.webp';
    let imageGIF = '.gif';
    if (this.dataMessage.nameattachment.endsWith(imagePNG)) {
      this.stringType = 'image/png';
      return true;
    } else if (
      this.dataMessage.nameattachment.endsWith(imageJPG) ||
      this.dataMessage.nameattachment.endsWith(imageJPG2)
    ) {
      this.stringType = 'image/jpeg';
      return true;
    } else if (this.dataMessage.nameattachment.endsWith(imageWEBP)) {
      this.stringType = 'image/webp';
      return true;
    } else if (this.dataMessage.nameattachment.endsWith(imageGIF)) {
      this.stringType = 'image/gif';
      return true;
    }
    return false;
  }

  audioAttachment(): boolean {
    let audioOPUS = '.opus';
    let audioOGG = '.ogg';
    let audioMP3 = '.mp3';
    if (this.dataMessage.nameattachment.endsWith(audioOPUS)) {
      this.stringType = 'audio/ogg';
      return true;
    } else if (this.dataMessage.nameattachment.endsWith(audioOGG)) {
      this.stringType = 'audio/ogg';
      return true;
    } else if (this.dataMessage.nameattachment.endsWith(audioMP3)) {
      this.stringType = 'audio/mpeg';
      return true;
    }
    return false;
  }

  openImage() {
    this.dialogRef.open(ViewImageComponent, {
      data: { source: this.source },
      disableClose: false,
    });
  }

  download() {
    this.dataService
      .getAttachment(
        this.idUser,
        this.idChat,
        this.dataMessage.nameattachment,
        this.stringType
      )
      .subscribe((data) => {
        var downloadURL = window.URL.createObjectURL(data);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = this.dataMessage.nameattachment;
        link.click();
      });
  }

  load() {
    this.getAttachment();
    this.toLoad = false;
  }

  getAttachment() {
    this.source = this.dataService.getLinkAttachment(
      this.idUser,
      this.idChat,
      this.dataMessage.nameattachment,
      this.stringType
    );
  }
}
