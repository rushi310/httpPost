import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { MaterialModule } from "./shared/module/material.module";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetConfirmComponent } from './shared/component/get-confirm/get-confirm.component';
import { PostDashboardComponent } from './shared/component/post-dashboard/post-dashboard.component';
import { PostCardComponent } from './shared/component/post-card/post-card.component';
import { PostFormComponent } from './shared/component/post-form/post-form.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GetConfirmComponent,
    PostDashboardComponent,
    PostCardComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
