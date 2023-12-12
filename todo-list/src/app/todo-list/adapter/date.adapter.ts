import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
    override parse(value:any): Date | null{
        if((typeof value === 'string') && (value.indexOf('/') > -1)){
            const  str = value.split('/');
            const day = Number(str[0]);
            const month = Number(str[1]) -1;
            const year = Number(str[2]);
            return new Date(year, month, day);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);

    }

    override format(date: Date, displayFormat: string): string {
        if(displayFormat === 'input') {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return this._twoNumber(day) + '.' + this._twoNumber(month) + '.' + year;
        } else if (displayFormat === 'inputMonth'){
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return this._twoNumber(month) + '.' + year;
        } else{
            return date.toDateString();
        }
    }

    private _twoNumber(n: number) : string{
        return('00'+ n).slice(-2);
    }
}

export const APP_DATE_FORMATS = {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'input',
        monthYearLabel: 'inputMonth',
        dateAllyLabel: {year:'numeric', month:'long', day: 'numeric'},
        monthYearAllyLabel: {year:'numeric', month:'long'}
    }
};