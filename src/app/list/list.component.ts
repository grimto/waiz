import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items;
  ar;
  constructor(private httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.httpService.get(`http://localhost:8082/fridge/getContent?fridgeId=0`).subscribe(
      data => {
        this.items = data as string [];	 // FILL THE ARRAY WITH DATA.
        const listOfUPC = [];
        for (const item of this.items) {
          listOfUPC.push(item.upc14);
        }

        let params = new HttpParams();

        params = params.append('upcs', listOfUPC.join(','));
        this.httpService.get(`http://localhost:8081/grocery/identify` , {params : params}).subscribe(
          data2 => {
            this.ar = data2 as string[];
            for (const item of this.ar) {
              for (const t of this.items) {
                if (item.upc14 === t.upc14) {
                  t.name = item.name;
                }
              }
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err.message);
          }
        );
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  }

}
