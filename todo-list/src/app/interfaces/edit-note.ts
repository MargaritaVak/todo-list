import { FormControl } from "@angular/forms";

export interface EditNote {
  theme: FormControl<string | null>;
  date_completed: FormControl<string | null>;
  category: FormControl<string | null>;
  priority: FormControl<string | null>;
  description: FormControl<string | null>;
}
