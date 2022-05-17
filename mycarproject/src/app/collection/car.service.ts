import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarData } from './models/car.model';
import { BrandModel } from './models/brand.model';

@Injectable({ providedIn:'root'})
export class CarServices{
    constructor(private http: HttpClient, private router: Router) {}

    private cars: CarData[] = [];
    private carUpdated = new Subject<CarData[]>();
    
    addCar(brand: BrandModel, type: string, fuel: string, year: Date, horsepower: Number) {
        const car: CarData = { 
            id: "", 
            brand: brand, 
            type:type, 
            fuel:fuel, 
            year:year, 
            horsepower:horsepower, 
            added: new Date(), 
            user: "" };
        this.http
          .post<{ message: string; Id: string }>(
            'http://localhost:4000/app/create',
            car
          )
          .subscribe((responseData) => {
            const id = responseData.Id;
            this.router.navigate(["/list"]);
          });
      }
}