import {CardType} from "./CardType";

export default class CardModel {
   private _id: number;
   private _type: CardType;


    constructor(id: number, type: CardType) {
        this._id = id;
        this._type = type;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get type(): CardType {
        return this._type;
    }

    set type(value: CardType) {
        this._type = value;
    }
}