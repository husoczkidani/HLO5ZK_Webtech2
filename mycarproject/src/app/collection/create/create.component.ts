import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { CarServices } from "../car.service";

@Component({
    selector:'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent {
    brands: String[] = [
        'Nissan',
        'Toyota',
        'Lexus',
        'Honda',
        'Subaru',
        'Acura',
        'Mitsubishi',
        'Mazda',
        'Infinity',
        'Suzuki'
      ];

    constructor(public carService: CarServices) {}

    onCreate(form: NgForm){
        if (form.invalid) {
            return;
        }
      
        this.carService.addCar(
            form.value.brand,
            form.value.type,
            form.value.fuel,
            form.value.year,
            form.value.horsepower,
        );
    }
}