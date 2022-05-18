import { Component, OnInit } from "@angular/core";
import { Subscriber, Subscription } from "rxjs";
import { CarServices } from "../car.service";
import { CarData } from "../models/car.model";

@Component({
    selector:'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    constructor(public carService: CarServices) {}

    cars: CarData[]= [];
    private carSubscription: Subscription;

    ngOnInit(): void {
        this.carService.getCarList();
        this.carSubscription = this.carService.getCarListUpdatedListener()
        .subscribe((listedCars: CarData[]) =>{
          this.cars = listedCars;
        })
    }

    onDelete(carId: string){
        this.carService.deleteCarById(carId).subscribe(() => {
          this.carService.getCarList()
        });;
    }
}