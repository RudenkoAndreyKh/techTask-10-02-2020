export interface User {
    id: string,
    first_name: string,
    last_name: string,
    gender: string,
    dob: string,
    email: string,
    phone: string,
    website: string,
    address: string,
    status: string,
    _links: {
        self: { href: string }
        edit: { href: string }
        avatar: { href: string }
    }
}