import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string,length:number=30,suffix: string = '...'): string {
    if(value.length>length){
      let truncated: string = value.substring(0, length).trim() + suffix;
      return truncated;
    }
    return value;
  }

}
