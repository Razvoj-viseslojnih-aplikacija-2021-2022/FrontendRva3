import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {

  public flag!: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
