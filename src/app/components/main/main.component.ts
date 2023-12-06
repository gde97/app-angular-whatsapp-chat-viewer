import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImportComponent } from './import/import.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorageService } from 'src/app/services/sessionstorage.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-interface',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  mainTitle: string = "Visualizzatore chat Whatsapp"
  sidebarTitle: string = "Funzionalità";
  sidebarImport: string = "Importazione";
  sidebarExport: string = "Esportazione";
  sidebarLogout: string = "Logout";
  @ViewChild('drawer') drawer!: MatSidenav;

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private dataSharingService: DataSharingService,
    public dialogRef: MatDialog){}

  ngOnInit(): void {
    
  }

  openImport(){
    this.drawer.close();
    this.dialogRef.open(ImportComponent,{
      disableClose: true,
    })
  }

  openExport(){
    this.drawer.close();

  }

  logoutProcess(){
    this.dataSharingService.idChat.next(undefined!);
    this.sessionStorageService.clearAll(); 
    this.router.navigate(['/login'])
  }

}
