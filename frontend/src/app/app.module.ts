import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { DasboardPageComponent } from './pages/dashboard-page/dasboard-page/dasboard-page.component';
import { CardComponent } from './shared/card/card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BucketComponent } from './shared/bucket/bucket.component';
import {MatChipsModule} from '@angular/material/chips';
import { LabelComponent } from './shared/label/label.component';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { LabelDialogWindowComponent } from './shared/label-dialog-window/label-dialog-window.component';
import { ScrollDirective } from './core/directives/scroll/scroll.directive';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DasboardPageComponent,
    CardComponent,
    BucketComponent,
    LabelComponent,
    LabelDialogWindowComponent,
    ScrollDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    DragDropModule,
    MatChipsModule,
    MatDialogModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
