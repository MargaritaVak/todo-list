import { FormControl } from "@angular/forms";

export interface Note {
    position: number;
    theme: string;
    description: string;
    author: string;
    date_creation: string;
    date_completed: string;
    category: string;
    priority: string;

}
