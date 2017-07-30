import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';

@Injectable()
export class ClipboardService {
    constructor(public snackBar: MdSnackBar) {
    }

    copyValue(value) {
        value.select();
        document.execCommand('copy');
        this.snackBar.open('Код скопирован в буфер обмена!', '', {
            duration: 2000
        });
    }
}
