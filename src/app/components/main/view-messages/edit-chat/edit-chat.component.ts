import { Component, HostListener, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/dataStructure';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html',
  styleUrls: ['./edit-chat.component.css'],
})
export class EditChatComponent {
  mainTitle: string = 'Modifica nome chat';
  textError: string = '';
  buttonCancel: string = 'Annulla';
  buttonConfirm: string = 'Aggiorna nome chat';
  disableConfirm = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { chat: Chat },
    private dialogRef: MatDialogRef<EditChatComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private snackBar: SnackBarService
  ) {}

  nameChatForm = this.formBuilder.group({
    name: this.formBuilder.control(this.data.chat.name, Validators.required),
  });

  @HostListener('document:keydown.enter')
  onDocumentKeydownEnter() {}

  closeDialog() {
    this.dialogRef.close();
  }

  submitEdit() {
    this.dataService
      .updateNameChat(this.data.chat.idchat, this.nameChatForm.value.name!)
      .subscribe({
        next: (result) => {
          //console.log(result);
          this.openSnackBar('Aggiornamento avvenuto correttamente');
          this.dataSharingService.idChat.next(this.data.chat.idchat);
          this.dataSharingService.refreschChats.next(true);
          this.closeDialog();
        },
        error: (error) => {
          //console.log(error)
          //this.openSnackBar('ERRORE');
          this.textError = 'Esiste già una chat con questo nome';
        },
      });
  }

  openSnackBar(message: string) {
    this.snackBar.openRegisterBar(message, 'Chiudi');
  }
}
