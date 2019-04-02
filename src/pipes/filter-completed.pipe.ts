import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from 'src/models/lista.model';

@Pipe({
    name: 'filterCompleted',
    pure: false
})
export class FilterCompletedPipe implements PipeTransform {
    transform(lists: Lista[], completed: boolean = true): Lista[] {
        return lists.filter(list => list.finished === completed);
    }
}
