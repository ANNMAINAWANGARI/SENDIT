import { Pipe, PipeTransform } from '@angular/core';
import { ParcelInterface } from '../interfaces/parcelInterface';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value:ParcelInterface[], filterText:string): ParcelInterface[]{
    if(value.length=== 0 || filterText ===''){
      return value
    }
    const filtered:ParcelInterface[]=[]
    for(let item of value){
      if(item.parcel_id?.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase())!==-1){
        filtered.push(item)
      }
    }
    return filtered
  }

}
