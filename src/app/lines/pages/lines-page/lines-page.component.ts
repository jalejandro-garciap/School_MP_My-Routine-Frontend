import { Component } from '@angular/core';
import { Line } from '../../interfaces/line.interface';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { LinesService } from '../../services/lines.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { LineModalFormComponent } from '../../components/line-modal-form/line-modal-form.component';

@Component({
  selector: 'app-lines-page',
  templateUrl: './lines-page.component.html',
  styleUrls: ['./lines-page.component.scss']
})
export class LinesPageComponent {

  public lines: Line[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _linesService: LinesService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadLines();
  }

  loadLines():void {
    this._linesService.getLines().subscribe({
      next: response => {
        this.lines = response.data;
      }
    })
  }

  onCreate(line: Line):void {
    this._linesService.create( line ).subscribe({
      next: response => {
        const newLine = response.data; 
        this.lines.push(newLine);
        this.lines = [...this.lines];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._linesService.getById( id ).subscribe({
      next: response => {
        const dbLine = response.data;
        const message:ConfirmModalData = { body: `<< ${dbLine.name} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._linesService.deleteById( id ).subscribe({
            next: () => {
              const idx: number = this.lines.findIndex(m => m.id === dbLine.id);
              this.lines.splice(idx, 1);
              this.lines = [...this.lines];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(LineModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (line:Line)  => {
      if( !line ) return;

      this._linesService.update( line ).subscribe({
        next: response => {
          const lineUpdated = response.data; 
          const idx:number = this.lines.findIndex( p => p.id === lineUpdated.id);
          this.lines[idx] = lineUpdated;
          this.lines = [...this.lines];
          // this._toastService.info('Proyecto   editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
