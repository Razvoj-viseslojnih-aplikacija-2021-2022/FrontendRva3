import { StavkaPorudzbineService } from './../../../services/stavka-porudzbine.service';
import { StavkaPorudzbine } from './../../../models/stavkaPorudzbine';
import { Artikl } from './../../../models/artikl';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-stavka-porudzbine-dialog',
  templateUrl: './stavka-porudzbine-dialog.component.html',
  styleUrls: ['./stavka-porudzbine-dialog.component.css']
})
export class StavkaPorudzbineDialogComponent implements OnInit {

  public flag!: number;
  artikli!: Artikl[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaPorudzbineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaPorudzbine,
    public stavkaPorudzbineService: StavkaPorudzbineService,
    public artiklService: ArtiklService) { }

  ngOnInit(): void {
    this.artiklService.getAllArtikls().subscribe(
      result => {
        this.artikli = result;
      }
    )
  }

  public compare(a:any, b:any){
    return a.id == b.id;
  }

  public add() {
    this.stavkaPorudzbineService.addStavkaPorudzbine(this.data)
      .subscribe(data => this.snackBar.open("Uspesno ste dodali stavku porudzbine: " + data.id, "U redu", { duration: 3500 })),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public update() {
    this.stavkaPorudzbineService.updateStavkaPorudzbine(this.data).subscribe
      (data => { this.snackBar.open("Stavka porudzbine: " + data.id + " je uspesno azurirana", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public delete() {
    this.stavkaPorudzbineService.deleteStavkaPorudzbine(this.data.id).subscribe
      (() => { this.snackBar.open("Stavka porudzbine je uspesno obrisana", "U redu", { duration: 3500 }) }),
      (error: Error) => {
        console.log(error.name + " " + error.message),
        this.snackBar.open("Doslo je do greske", "U redu", { duration: 2500 })
      }
  }

  public cancel(){
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od promena", "U redu", {duration:3500});
  }



}
