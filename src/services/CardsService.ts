import axios from "axios";

export default class CardsService {

    static getCards(): any {
        return axios.get('https://api.myjson.com/bins/1b3p9k');
    }
}