import {Component, OnInit} from '@angular/core';
import {Item} from '../../assets/model/item';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items;

  constructor(private httpService: HttpClient) {
  }

  ngOnInit(): void {
    this.httpService.get(``).subscribe(
      data => {
        this.items = data as string [];	 // FILL THE ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
