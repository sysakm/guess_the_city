import type {TaskOptions} from '../types.ts';

export const cities = [
    "Paris",
    "London",
    "Rome",
    "Berlin",
    "Madrid",
    "Lisbon",
    "Amsterdam",
    "Prague",
    "Vienna",
    "Budapest",
    "Warsaw",
    "Athens",
    "Istanbul",
    "New York",
    "Los Angeles",
    "Chicago",
    "Toronto",
    "Vancouver",
    "Tokyo",
    "Kyoto",
    "Seoul",
    "Bangkok",
    "Singapore",
    "Dubai",
    "Cairo",
    "Marrakesh",
    "Cape Town",
    "Sydney",
    "Melbourne",
    "Rio de Janeiro",
];

export function generateOptions(n: number = 4): TaskOptions {
    const options: Array<string> = []
    const citiesCopy: Array<string> = [...cities]

    for (let i = 0; i < n && i < cities.length; i++) {
        const currentLastIndex = cities.length - 1 - i
        const cityIndex = Math.floor(Math.random() * (currentLastIndex + 1))

        const city = citiesCopy[cityIndex]
        options.push(city)

        citiesCopy[cityIndex] = citiesCopy[currentLastIndex]
        citiesCopy[currentLastIndex] = city
    }

    const correct = Math.floor(Math.random() * n)
    return {
        cities: options,
        correctIndex: correct
    }
}
