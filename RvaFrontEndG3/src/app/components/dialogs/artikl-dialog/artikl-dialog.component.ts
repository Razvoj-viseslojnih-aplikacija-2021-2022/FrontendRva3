import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Artikl } from 'src/app/models/artikl';
import { ArtiklService } from 'src/app/services/artikl.service';

@Component({
  selector: 'app-artikl-dialog',
  templateUrl: './artikl-dialog.component.html',
  styleUrls: ['./artikl-dialog.component.css']
})
export class ArtiklDialogComponent implements OnInit {

  public flag!: number;
  
  constructor(private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ArtiklDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Artikl,
    public artiklService: ArtiklService) { }

  ngOnInit(): void {
  }

  public add() : void {
    this.artiklService.insertArtikl(this.data).subscribe(() => {
      this.snackBar.open('Uspešno dodat artikl!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public update() : void {
    this.artiklService.updateArtikl(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjen artikl!','OK', {duration: 2500} );
    }, 
    (error: Error) => {
      this.snackBar.open('Došlo je do greške!', 'Zatvori', {duration:2500});
    }
    );
  }

  public delete() : void {
    this.artiklService.deleteArtikl(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisan artikl!','OK', {duration: 2500} );
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
