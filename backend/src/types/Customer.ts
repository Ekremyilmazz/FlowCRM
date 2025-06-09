export interface Customer {
    id: number;
    name: string;
    company: string;
    contact_info: string;
    segment: string;
};


export interface CreateCustomerInput {
    name: string;
    company: string;
    contact_info: string;
    segment: string;
}