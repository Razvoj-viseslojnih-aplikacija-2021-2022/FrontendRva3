import { ArtiklService } from './../../../services/artikl.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Artikl } from 'src/app/models/artikl';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource! : MatTableDataSource<Artikl>;
  subscription!: Subscription;

  constructor(private artiklService: ArtiklService) { }

  ngOnDestroy(): void {
   this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.subscription = this.artiklService.getAllArtikls()
    .subscribe(
      data => {this.dataSource = new MatTableDataSource(data)}),
    (error: Error) => {console.log(error.name + ' ' + error.message)}
  }

}
