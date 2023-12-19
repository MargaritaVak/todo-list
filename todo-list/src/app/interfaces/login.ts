import { FormControl } from '@angular/forms';

export interface Login {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
