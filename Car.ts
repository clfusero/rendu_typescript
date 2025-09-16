// Car.ts
export class Car {
  model: string;
  brand: string;
  color: string;
  year: number;
  speed: number;     // km/h
  started: boolean;

  constructor(model: string, brand: string, color: string, year: number) {
    this.model = model;
    this.brand = brand;
    this.color = color;
    this.year = year;
    this.speed = 0;
    this.started = false;
  }

  start(): void {
    if (!this.started) {
      this.started = true;
      console.log(`${this.brand} ${this.model} démarre.`);
    } else {
      console.log(`${this.brand} ${this.model} est déjà démarrée.`);
    }
  }

  stop(): void {
    if (this.started) {
      this.started = false;
      this.speed = 0;
      console.log(`${this.brand} ${this.model} s'arrête.`);
    } else {
      console.log(`${this.brand} ${this.model} est déjà arrêtée.`);
    }
  }

  accelerate(increment: number): void {
    if (!this.started) {
      console.log(`Impossible d'accélérer : ${this.brand} ${this.model} n'est pas démarrée.`);
      return;
    }
    this.speed += increment;
    if (this.speed < 0) this.speed = 0;
    console.log(`${this.brand} ${this.model} roule à ${this.speed.toFixed(0)} km/h.`);
  }
}

