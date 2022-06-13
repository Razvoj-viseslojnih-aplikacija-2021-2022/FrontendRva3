import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from './../../../models/porudzbina';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';
import { MatDialog } from '@angular/material/dialog';
import { PorudzbinaDialogComponent } from '../../dialogs/porudzbina-dialog/porudzbina-dialog.component';

@Component({
  selector: 'app-porudzbina',
  templateUrl: './porudzbina.component.html',
  styleUrls: ['./porudzbina.component.css']
})
export class PorudzbinaComponent implements OnInit {

  displayedColumns = ['id', 'datum','isporuceno','iznos','placeno','dobavljac', 'actions'];
  dataSource! : MatTableDataSource<Porudzbina>;
  subscription!: Subscription;
  selectedPorudzbinaTop!: Porudzbina;

  constructor(private porudzbinaService: PorudzbinaService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.porudzbinaService.getAllPorudzbina().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, 
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
    );
  }  

  openDialog(flag: number, id?:number, datum?:Date, isporuceno?: Date, iznos?:number, placeno?:boolean, dobavljac?:Dobavljac) {
      const dialogRef = this.dialog.open(PorudzbinaDialogComponent, 
        {data:{id,datum,isporuceno,iznos,placeno,dobavljac}});

      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(res => {
        if(res === 1)
          this.loadData();
      });
    }

    public select(row:any){
      console.log(row);
      this.selectedPorudzbinaTop = row;
    }
}
