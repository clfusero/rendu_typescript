// Race.ts
import { Car } from "./Car";

type Entry = {
  car: Car;
  distanceKm: number;   // distance accumulée
};

export class Race {
  private entries: Entry[] = [];
  private targetDistanceKm: number;
  private maxSpeedKmH: number;
  private tickSeconds: number;

  constructor(targetDistanceKm: number, tickSeconds: number = 1, maxSpeedKmH: number = 220) {
    this.targetDistanceKm = targetDistanceKm;
    this.tickSeconds = tickSeconds;
    this.maxSpeedKmH = maxSpeedKmH;
  }

  addCar(car: Car): void {
    this.entries.push({ car, distanceKm: 0 });
  }

  startAll(): void {
    this.entries.forEach(e => e.car.start());
  }

  private randomAcceleration(): number {
    // Petite variation : -10 à +25 km/h par tick
    const min = -10;
    const max = 25;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private step(): void {
    for (const e of this.entries) {
      // Variation de vitesse
      const delta = this.randomAcceleration();
      e.car.accelerate(delta);

      // Clamp de sécurité
      if (e.car.speed > this.maxSpeedKmH) e.car.speed = this.maxSpeedKmH;
      if (e.car.speed < 0) e.car.speed = 0;

      // Avancement (km/h -> km par tick)
      const kmPerTick = (e.car.speed / 3600) * this.tickSeconds;
      e.distanceKm += kmPerTick;
    }
  }

  private getLeader(): Entry {
    return this.entries.slice().sort((a, b) => b.distanceKm - a.distanceKm)[0];
  }

  run(verbose: boolean = true): Car {
    if (this.entries.length === 0) {
      throw new Error("Aucune voiture dans la course.");
    }

    this.startAll();

    let t = 0;
    while (true) {
      this.step();
      t += this.tickSeconds;

      const leader = this.getLeader();
      if (verbose && t % 5 === 0) { // log toutes les 5 s
        const board = this.entries
          .map(e => `${e.car.brand} ${e.car.model}: ${e.distanceKm.toFixed(3)} km`)
          .join(" | ");
        console.log(`[t=${t}s] Leader: ${leader.car.brand} ${leader.car.model} — ${leader.distanceKm.toFixed(3)} km`);
        console.log(`  ${board}`);
      }

      // Condition d’arrivée
      let winner: Entry | undefined = undefined;
      for (const e of this.entries) {
        if (e.distanceKm >= this.targetDistanceKm) {
            winner = e;
            break;
        }
      } 

      if (winner) {
        // On “stop” tout le monde pour conclure proprement
        this.entries.forEach(e => e.car.stop());
        if (verbose) {
          console.log(
            `🏁 Victoire de ${winner.car.brand} ${winner.car.model} en ~${t}s, ` +
            `distance: ${winner.distanceKm.toFixed(3)} km`
          );
        }
        return winner.car;
      }

      // (Option) garde-fou si distance trop longue
      if (t > 3600) {
        // 1h de course max
        const fallback = this.getLeader();
        console.log(`Limite de temps atteinte — vainqueur par distance: ${fallback.car.brand} ${fallback.car.model}`);
        return fallback.car;
      }
    }
  }
}
