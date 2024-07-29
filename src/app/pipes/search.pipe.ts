import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allMenu:any[], searchKey:string): any[] {
    const result:any = []
    

    if(!allMenu || searchKey == ""){
      return allMenu
    }else{
      allMenu.forEach((item:any) => {
        if(item['name'].toLowerCase().includes(searchKey.toLowerCase())){
          result.push(item)
        }
      })
    }



    return result
  }

}
