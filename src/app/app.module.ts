import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewMessagesComponent } from './components/main/view-messages/view-messages.component';
import { MainComponent } from './components/main/main.component';
import { BarListComponent } from './components/main/bar-list/bar-list.component';
import { SearchfilterPipe } from './pipes/searchfilter.pipe';
import { ImportComponent } from './components/main/import/import.component';
import { ExportComponent } from './components/main/export/export.component';
import { EditChatComponent } from './components/main/view-messages/edit-chat/edit-chat.component';
import { EditOwnerComponent } from './components/main/view-messages/edit-owner/edit-owner.component';
import { MessageComponent } from './components/main/view-messages/message/message.component';
import { ViewImageComponent } from './components/main/view-messages/message/view-image/view-image.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ViewMessagesComponent,
    MainComponent,
    BarListComponent,
    SearchfilterPipe,
    ImportComponent,
    ExportComponent,
    EditChatComponent,
    EditOwnerComponent,
    MessageComponent,
    ViewImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
