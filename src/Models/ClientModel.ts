import {color} from "./ColorModel"

export class client{
    public readonly id: null|number;
    public readonly name: string;
    public readonly color: color;
    public readonly description:string;
    public readonly domain: null|Array<string>;
    constructor(id:null|number,name:string,color:color,description:string,domain:null|Array<string>){
        this.id = id;
        this.name = name;
        this.color = color;
        this.description = description;
        this.domain = domain;
    }
}