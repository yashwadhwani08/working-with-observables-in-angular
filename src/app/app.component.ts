import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  // interval = signal(0);
  // doubledInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`);
    // });
    // toObservable(this.clickCount)
  }

  ngOnInit(): void {
    // const timeInterval = setInterval(() => {
    //   console.log(this.doubledInterval());
    //   this.interval.update((prevIntervalNumber) => prevIntervalNumber + 1);
    // }, 1000);
    // this.destroyRef.onDestroy(() => clearInterval(timeInterval));
    // const subscription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());

    // This approach of passing a function directly to subscribe is a function overloaded version, where we pass the callback function typically passed in next property.

    // this.clickCount$.subscribe((val) => {
    //   // console.log(`Clicked button ${this.clickCount()} times.`);
    //   console.log(`Clicked button ${val} times.`);
    // });

    const subscription = this.clickCount$.subscribe({
      next: (val) => {
        console.log(`Clciked button ${val} times.`);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
