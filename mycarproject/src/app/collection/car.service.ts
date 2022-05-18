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

    private carList: CarData[] = [];
    private carListUpdated = new Subject<CarData[]>();
    
    
    getCarListUpdatedListener() {
      return this.carListUpdated.asObservable();
    }
  
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
        console.log(car)
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

    getCarList() {
      this.http
        .get<{ message: string; Car: any}>('http://localhost:4000/app/cars')
        .pipe(
          map((carData) => {
            return carData.Car.map((car: any) => {
              return {
                id: car._id,
                brand: car.brand,
                type: car.type,
                fuel: car.fuel,
                year: car.year,
                horsepower: car.horsepower,
                added: car.added,
              };
            });
          })
        )
        .subscribe((transformedElements) => {
          this.carList = transformedElements;
          this.carListUpdated.next([...this.carList]);
        });
    }

    deleteCarById(carId: string){
      return this.http.delete('http://localhost:4000/app/delete/' + carId);
    }
}