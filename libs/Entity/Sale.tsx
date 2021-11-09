export interface Sale {
    createdAt:Date;
    updatedAt:Date;
    id:number;
    batches:number;
    price:number;
    earnings:number;
    paidAmount:number;
    studentAmount:number;
    paidIds:number[];
}