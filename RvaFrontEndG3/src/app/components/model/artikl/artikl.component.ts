import { ArtiklService } from './../../../services/artikl.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Artikl } from 'src/app/models/artikl';
import { MatDialog } from '@angular/material/dialog';
import { ArtiklDialogComponent } from '../../dialogs/artikl-dialog/artikl-dialog.component';

@Component({
  selector: 'app-artikl',
  templateUrl: './artikl.component.html',
  styleUrls: ['./artikl.component.css']
})
export class ArtiklComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource! : MatTableDataSource<Artikl>;
  subscription!: Subscription;

  constructor(private artiklService: ArtiklService,
    private dialog: MatDialog) { }

  ngOnDestroy(): void {
   this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.subscription = this.artiklService.getAllArtikls()
    .subscribe(
      data => {this.dataSource = new MatTableDataSource(data)},
    (error: Error) => {console.log(error.name + ' ' + error.message)});
  }

  openDialog(flag: number, id?: number, naziv?:string, proizvodjac?:string) {
    const dialogRef = this.dialog.open(ArtiklDialogComponent, {data:{id,naziv,proizvodjac}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1)
        this.loadData();
    });
  }

}
