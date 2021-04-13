
export class Student {
    name: string;
    studentId: number;
    citizenId: number;
    age: number;
    address: string;
    phoneNumber: number;

    constructor( name:string, studentId:number, citizenId:number, age:number, address:string, phoneNumber:number ){
        this.name = name;
        this.studentId = studentId;
        this.citizenId = citizenId;
        this.age = age;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
  }