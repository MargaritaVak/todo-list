import { FormControl } from "@angular/forms";

export interface Note {
    position: FormControl <number | null>;
    theme: FormControl <string | null>;
    description: FormControl <string | null>;
    author: FormControl <string | null>;
    date_creation: FormControl <string | null>;
    date_completed: FormControl <string | null>;
    changes: FormControl <string | null>;
}
