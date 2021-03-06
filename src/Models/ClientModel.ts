import {Color} from "./ColorModel"

export class Client{
    public readonly id: null|number;
    public readonly name: string;
    public readonly color: Color;
    public readonly description:string;
    public readonly domains: null|Array<string>;
    constructor(id:null|number,name:string,color:Color,description:string,domains:null|Array<string>){
        this.id = id;
        this.name = name;
        this.color = color;
        this.description = description;
        this.domains = domains;
    }
}