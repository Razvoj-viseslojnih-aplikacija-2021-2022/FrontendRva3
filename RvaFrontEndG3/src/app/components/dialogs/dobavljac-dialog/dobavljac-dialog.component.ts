import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dobavljac } from 'src/app/models/dobavljac';
import { DobavljacService } from 'src/app/services/dobavljac.service';

@Component({
  selector: 'app-dobavljac-dialog',
  templateUrl: './dobavljac-dialog.component.html',
  styleUrls: ['./dobavljac-dialog.component.css']
})
export class DobavljacDialogComponent implements OnInit {
  flag!: number;

  constructor(public snackBar:MatSnackBar,
    public dobavljacService: DobavljacService,
    public dialogRef: MatDialogRef<DobavljacDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Dobavljac) { }

  ngOnInit(): void {
  }

  public add() {
    this.dobavljacService.insertDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat dobavljač!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() {
    this.dobavljacService.updateDobavljac(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen dobavljač!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() {
    this.dobavljacService.deleteDobavljac(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan dobavljač!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }
  
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration:1000});
  }
}
