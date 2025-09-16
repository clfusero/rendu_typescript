// main.ts
import { Car } from "./Car";
import { Race } from "./Race";

// On crée des voitures 
const car1 = new Car("Chiron", "Bugatti", "Bleu Nuit", 2023);
const car2 = new Car("Aventador", "Lamborghini", "Jaune", 2022);
const car3 = new Car("Phantom", "Rolls-Royce", "Noir", 2020);
const car4 = new Car("911 Turbo S", "Porsche", "Gris Argent", 2023);

// Course de 2 km, tick d’1 seconde, vitesse max 350 km/h
const race = new Race(2.0, 1, 350);
race.addCar(car1);
race.addCar(car2);
race.addCar(car3);
race.addCar(car4);

// Lancer la simulation
const winner = race.run(true);

console.log(`🏆 Gagnant : ${winner.brand} ${winner.model} 🚀`);


