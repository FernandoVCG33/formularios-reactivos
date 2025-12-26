import { Component } from '@angular/core';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe
  ],
  templateUrl: './basic-page.html',
})
export class BasicPage {

}
