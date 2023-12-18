import { FormControl } from "@angular/forms";

export interface Note {
    id:string;
    theme: string;
    description: string;
    author: string;
    date_creation: string;
    date_completed: string;
    category: string;
    priority: string;
    expanded: boolean;
    check_result: boolean;
}
