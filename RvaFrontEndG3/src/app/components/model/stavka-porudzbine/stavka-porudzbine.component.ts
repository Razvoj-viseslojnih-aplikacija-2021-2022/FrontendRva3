import { Porudzbina } from './../../../models/porudzbina';
import { Artikl } from './../../../models/artikl';
import { StavkaPorudzbine } from './../../../models/stavkaPorudzbine';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { StavkaPorudzbineService } from 'src/app/services/stavka-porudzbine.service';
import { StavkaPorudzbineDialogComponent } from '../../dialogs/stavka-porudzbine-dialog/stavka-porudzbine-dialog.component';

@Component({
  selector: 'app-stavka-porudzbine',
  templateUrl: './stavka-porudzbine.component.html',
  styleUrls: ['./stavka-porudzbine.component.css']
})
export class StavkaPorudzbineComponent implements OnInit,OnChanges {

  displayedColumns = ['id','artikl','jedinicaMere','kolicina','cena','porudzbina','redniBroj','actions'];
  dataSource!: MatTableDataSource<StavkaPorudzbine>;
  subscription!: Subscription;
  @Input() selectedPorudzbinaBottom!: Porudzbina;

  constructor(private stavkaPorudzbineService: StavkaPorudzbineService,
    private dialog: MatDialog) { }
  
    ngOnChanges(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.stavkaPorudzbineService.
    getStavkaPorudzbineByPorudzbina(this.selectedPorudzbinaBottom.id).subscribe
      (data => { this.dataSource = new MatTableDataSource(data) }),
      (error: Error) => { console.log(error.name + " " + error.message) }
  }

  public openDialog(flag: number, id?: number, artikl?: Artikl, jedinicaMere?: string, kolicina?: number,
                    cena?:number, porudzbina?: Porudzbina, redniBroj?:number) {
    const dialogRef = this.dialog.open(StavkaPorudzbineDialogComponent, { data: { id,artikl,jedinicaMere,kolicina,cena,porudzbina,redniBroj } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.data.porudzbina = this.selectedPorudzbinaBottom;
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.loadData();
      }
    })
  }


}
