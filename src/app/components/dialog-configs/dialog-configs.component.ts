import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

export interface DialogData {
  origin: string,
  option: string,
  args? : any 
}

@Component({
  selector: 'app-dialog-configs',
  templateUrl: './dialog-configs.component.html',
  styleUrls: ['./dialog-configs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogConfigsComponent implements OnInit {
  titleConfirm: string  = '';
  titleModal  : string  = '';

  // auxiliares
  hide        : boolean = true;
  button_color: string  = 'accent';

  constructor(
    private fb    : FormBuilder,
    public dialogo: MatDialogRef<DialogConfigsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {
    this.initialValues()
  }
  initialValues() {
    switch (this.data.option) {
      // Agrupación de usuarios
      case 'platillo-random':
        this.titleModal   = 'PLATILLO DEL DÍA';
        this.titleConfirm = 'Ir al platillo';
        break;
      default:
        break;
    }
  }



  confirm() {
    switch (this.data.option) {
      case 'platillo-random':
        this.close(this.data.args);
        break;
      default:
        this.close(false); 
        break;
    }
  }

  close( data:any ): void { 
    this.dialogo.close(data); 
  }

  get validConfirm(): boolean {
    switch (this.data.option) {
      case 'platillo-random':
        return true;
      default:
        return false;
    }
  }
}
