import { FormControl } from "@angular/forms";

export interface User {
    name: FormControl <string | null>;
    login: FormControl <string | null>;
    password: FormControl <string | null>;
}
