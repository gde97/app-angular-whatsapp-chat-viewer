import { Component, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/dataStructure';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-edit-owner',
  templateUrl: './edit-owner.component.html',
  styleUrls: ['./edit-owner.component.css']
})
export class EditOwnerComponent {
  /*
  https://www.geeksforgeeks.org/copy-array-items-into-another-array-in-javascript/
  */

  mainTitle: string = "Cambia mittente a destra";
  titleChatOwners: string = "Mittenti a destra";
  subtitleChatOwners: string = "Togli spunta per eliminare";
  titleListSender: string = "Lista di tutti i mittenti";
  subtitleListSender: string = "Spunta per aggiungere";
  finalList: string = "Risultato selezioni:";
  buttonCancel: string = "Annulla";
  buttonConfirm: string = "Aggiorna mittenti";
  disableConfirm = true;

  selectedOwners: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {chat: Chat, listSender: string[]},
    private dialogRef: MatDialogRef<EditOwnerComponent>,
    private dataService: DataService,
    private dataSharingService: DataSharingService,
    private snackBar: SnackBarService,
    ){
      this.selectedOwners = [...data.chat.nameowner];
    }

  isNotAlreadyPresent(name: string){
    for(let i = 0; i < this.data.chat?.nameowner.length!; i++){
      if(this.data.chat?.nameowner[i].toLowerCase() == (name.toLowerCase())){
        return false;
      }
    }
    return true;
  }

  eventCheckbox(e: MatCheckboxChange, value: string){
    this.disableConfirm = false;
    if(e.checked){
      this.selectedOwners.push(value)
    }else{
      for(let i = 0; i < this.selectedOwners.length; i++){
        //console.log(i,this.selectedOwners[i],value )
        if(this.selectedOwners[i].toLowerCase() == (value.toLowerCase())){
          this.selectedOwners.splice(i,1);
          //console.log(this.selectedOwners)
          break;
        }
      }
    }
    this.allowSubmitAtLeastOne()
  }

  allowSubmitAtLeastOne(){
    if(this.selectedOwners.length < 1){
      this.disableConfirm = true;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submitEdit(){
    this.disableConfirm = true;
    let owners = JSON.stringify(this.selectedOwners);
    this.dataService.updateNameOwner(this.data.chat?.idchat!, owners).subscribe({
      next: (result: Chat) => {
        //console.log(result);
        this.openSnackBar('Aggiornamento avvenuto correttamente');
        this.dataSharingService.idChat.next(result.idchat);
        this.closeDialog();
      },
      error: (error) => {
        //console.log(error)
        this.openSnackBar('ERRORE');
      }
    })
  }

  openSnackBar(message: string) {
    this.snackBar.openRegisterBar(
      message,
      'Chiudi'
    );
  }
}
