import { FormControl } from '@angular/forms';

export type FormData<T> = {
    [Prop in keyof T]: FormControl<T[Prop]>;
}
