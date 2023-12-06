import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { User } from 'src/app/dataStructure';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {
  /*
  https://stackoverflow.com/questions/47270324/nullinjectorerror-no-provider-for-matdialogref
  https://efficientcoder.net/angular-14-upload-files-formdata-httpclient/
  https://stackoverflow.com/questions/63981959/unable-to-upload-multiple-files-at-once-in-angular-spring-boot-app
  */
  mainTitle: string = 'Importazione chat';
  buttonUpload: string = 'Seleziona file';
  textTypeUpload: string = 'Seleziona il tipo di file da caricare';
  typeUpload = [
    { name: 'Solo Zip', selection: false },
    { name: 'Una chat e i suoi allegati', selection: false },
  ];
  textUnderField: string = 'Nome della chat con cui verrà salvata';
  buttonCancel: string = 'Annulla';
  buttonConfirm: string = 'Importa';
  typeSelected!: number;
  user!: User;
  selectedFiles: File[] = [];
  newSelectedFiles: File[] = [];
  disableConfirm: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ImportComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private sessionStorageService: SessionStorageService,
    private snackBar: SnackBarService
  ) {}

  nameChatForm = this.formBuilder.group({
    name: this.formBuilder.control('', Validators.required),
  });

  ngAfterContentInit(): void {
    let temp = this.sessionStorageService.getUser();
    if (temp != null) {
      this.user = temp;
    } else {
      //error?
    }
  }

  chooseFile(event: any): void {
    this.selectedFiles = event.target.files;
    switch (this.typeSelected) {
      case 0:
        this.disableConfirm = false;
        break;
      case 1:
        let thereIsATxt = this.setNameChat();
        this.nameChatForm.enable();
        if (!thereIsATxt) {
          this.nameChatForm.disable();
        }
        break;
    }
  }

  removeFile(n: number) {
    this.newSelectedFiles = [];
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (i != n) {
        this.newSelectedFiles.push(this.selectedFiles[i]);
      }
    }
    this.selectedFiles = this.newSelectedFiles;
    if (this.selectedFiles.length == 0) {
      this.disableConfirm = true;
    }
  }

  setNameChat(): boolean {
    let CHAT_EXTENSION = '.txt';
    let NAME_CHAT_ZIP = '_chat';
    let NAME_CHAT_FOLDER = 'Chat WhatsApp con ';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i].name.endsWith(CHAT_EXTENSION)) {
        let name = this.selectedFiles[i].name.replace(CHAT_EXTENSION, '');
        if (name.includes(NAME_CHAT_ZIP)) {
          //si deve assolutamente modificare il nome
          this.nameChatForm.controls.name.setValue('inserire nome');
          this.disableConfirm = true;
          return true;
        }
        if (name.includes(NAME_CHAT_FOLDER)) {
          //non è obbligatorio modificarlo
          this.nameChatForm.controls.name.setValue(
            name.replace(NAME_CHAT_FOLDER, '')
          );
          this.disableConfirm = false;
          return true;
        }
      }
    }
    return false;
  }

  submitImport() {
    switch (this.typeSelected) {
      case 0:
        this.uploadFilesZip();
        break;
      case 1:
        this.uploadFilesChat();
        break;
      default:
        this.openSnackBar('ERRORE');
    }
    this.closeDialog();
  }

  uploadFilesZip(): void {
    let allZip = true;
    for (let i = 0; i < this.selectedFiles!.length; i++) {
      if (!this.selectedFiles![i].name.endsWith('.zip')) {
        allZip = false;
      }
    }
    if (allZip) {
      this.dataService.uploadZips(this.user.id, this.selectedFiles!).subscribe({
        next: (value) => {
          //console.log(result);
          this.openSnackBar(
            "Caricamento avvenuto correttamente \n Attendi il termine dell'elaborazione"
          );
          this.dataSharingService.refreschChats.next(true);
          this.closeDialog();
        },
        error: (error) => {
          //console.log(error)
          this.openSnackBar('ERRORE non sono tutti ZIP');
        },
      });
    } else {
      this.openSnackBar('ERRORE non sono tutti ZIP');
    }
  }

  uploadFilesChat(): void {
    let thereIsATxt = false;
    for (let i = 0; i < this.selectedFiles!.length; i++) {
      if (this.selectedFiles![i].name.endsWith('.txt')) {
        thereIsATxt = true;
      }
    }
    if (thereIsATxt) {
      this.dataService
        .uploadFolder(
          this.user.id,
          this.nameChatForm.controls.name.value!,
          this.selectedFiles!
        )
        .subscribe({
          next: (value) => {
            //console.log(result);
            this.openSnackBar(
              "Caricamento avvenuto correttamente \n Attendi il termine dell'elaborazione"
            );
            this.dataSharingService.refreschChats.next(true);
            this.closeDialog();
          },
          error: (error) => {
            //console.log(error)
            this.openSnackBar('ERRORE caricamento chat');
          },
        });
    } else {
      this.openSnackBar('ERRORE non è stata trovata una chat');
    }
  }

  openSnackBar(message: string) {
    this.snackBar.openRegisterBar(message, 'Chiudi');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
