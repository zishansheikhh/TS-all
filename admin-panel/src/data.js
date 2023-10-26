    export const SellerList = [
        {
            id: '01',
            name: 'Random Seller 1',
            location: 'Kathgodam, Haldwani'
        },
        {
            id: '02',
            name: 'Random Seller 2',
            location: 'Naini, Prayagraj'
        },
        {
            id: '03',
            name: 'Random Seller 3',
            location: 'Teen pani, Haldwani'
        },
        {
            id: '04',
            name: 'Random Seller 4',
            location: 'Gomti Nagar, Lucknow'
        },
        {
            id: '05',
            name: 'Random Seller 5',
            location: 'Kareli, Prayagraj'
        }
    ]

    export const Orders = [
        {
            id: '01',
            customerId: 'abcd1234',
            sellerId: '02',
            date: '06 Nov 2022',
            payload: [
                {
                    product: 'Large',
                    quantity: '2'
                },
                {
                    product: 'Small',
                    quantity: '4'
                }
            ],
            status: 'Dispatched'
        },
        {
            id: '02',
            customerId: 'abcd1234',
            sellerId: '03',
            date: '06 Nov 2022',
            payload: [
                {
                    product: 'Large',
                    quantity: '1'
                },
                {
                    product: 'Small',
                    quantity: '5'
                }
            ],
            status: 'Delivered'
        },
        {
            id: '03',
            customerId: 'abcd1234',
            sellerId: '02',
            date: '05 Nov 2022',
            payload: [
                {
                    product: 'Large',
                    quantity: '4'
                },
                {
                    product: 'Small',
                    quantity: '1'
                }
            ],
            status: 'Delivered'
        },
        {
            id: '04',
            customerId: 'abcd1234',
            sellerId: '04',
            date: '01 Nov 2022',
            payload: [
                {
                    product: 'Large',
                    quantity: '3'
                }
            ],
            status: 'Delivered'
        },
        {
            id: '05',
            customerId: 'abcd1234',
            sellerId: '02',
            date: '20 Oct 2022',
            payload: [
                {
                    product: 'Small',
                    quantity: '7'
                }
            ],
            status: 'Delivered'
        }
    ]