import { Pipe, PipeTransform } from '@angular/core';
declare var moment: any;

@Pipe({
  name: 'postdateformat'
})
export class PostdateformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var returnValue: any;
    if (value) {
      returnValue = moment(value).fromNow();
    }
    else
      returnValue = moment(new Date()).fromNow();
    return returnValue;
  }

}

@Pipe({
  name: 'phoneclick'
})
export class phoneClickPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var returnString = '';
    if (value) {
      var postedDate = value.split('|');
      postedDate.forEach(item => {
        returnString += `<a class="phone-click" href="tel:` + item + `">` + item + `</a><br\>`
      });
      return returnString;
    }
  }

}
