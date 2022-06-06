import { DobavljacService } from 'src/app/services/dobavljac.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/models/dobavljac';
import { Porudzbina } from 'src/app/models/porudzbina';
import { PorudzbinaService } from 'src/app/services/porudzbina.service';

@Component({
  selector: 'app-porudzbina-dialog',
  templateUrl: './porudzbina-dialog.component.html',
  styleUrls: ['./porudzbina-dialog.component.css']
})
export class PorudzbinaDialogComponent implements OnInit {

  flag!: number;
  dobavljaci!: Dobavljac[];

  constructor(public snackBar:MatSnackBar,
    public porudzbinaService: PorudzbinaService,
    public dialogRef: MatDialogRef<PorudzbinaDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Porudzbina,
    public dobavljacService: DobavljacService) { }

  ngOnInit(): void {
    this.dobavljacService.getAllDobavljac().subscribe( result =>{
      this.dobavljaci = result;
    }
    );
  }

  public compare(a:Porudzbina, b:Porudzbina){
    return a.id == b.id;
  }

  public add() {
    this.porudzbinaService.insertPorudzbina(this.data).subscribe(data => {
      this.snackBar.open('Uspešno dodata porudžbina: ' + data.id ,'OK', {duration: 2500} ), 
    (error: Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
  }
    );
  }

  public update() {
    this.porudzbinaService.updatePorudzbina(this.data).subscribe(data => {
      this.snackBar.open('Uspešno izmenjena porudžbina: ' + data.id,'OK', {duration: 2500} ), 
    (error: Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
  }
    );
  }

  public delete() {
    this.porudzbinaService.deletePorudzbina(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisana porudžbina!','OK', {duration: 2500} ), 
    (error: Error) => {
      console.log(error.name + " " + error.message);
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
  }
    );
  }
  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration:1000});
  }
}
