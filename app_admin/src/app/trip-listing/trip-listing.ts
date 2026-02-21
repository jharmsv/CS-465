import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { trips } from '../data/trips';
import { Trip } from '../models/trip';
import { TripCard } from '../trip-card/trip-card';
import { TripDataServices } from '../services/trip-data';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  // providers: [TripDataServices]
})

export class TripListing implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataServices,
    private router: Router,
    private cdr: ChangeDetectorRef // detects changes
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;

          // Manually trigger change detection to ensure the view updates with the new data
          // This is necessary when navigating back to this component to force Angular to re-render the trip cards
          this.cdr.detectChanges();

          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          }
          else {
            this.message = 'There were no trips retireved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }



  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();

  }

}