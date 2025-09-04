// src/data/paymentMethodsData.js

export const groupedPaymentMethods = [
    {
        category: 'Rekening Tabungan',
        methods: [
            {
                id: 1,
                accountNumber: '2342349432',
                name: 'Fathan Gunadi',
                lastDigits: '•••659',
                bgColor: 'bg-purple-800',
                isChecked: true
            },
            {
                id: 2,
                accountNumber: '8800549432',
                name: 'Fathan Gunadi',
                lastDigits: '•••882',
                bgColor: 'bg-stone-800',
                isChecked: false
            },
        ],
    },
    {
        category: 'Kartu Kredit',
        methods: [
            {
                id: 3,
                accountNumber: '8800549432',
                name: 'Fathan Gunadi',
                lastDigits: '•••133',
                bgColor: 'bg-gradient-to-r from-blue-500 to-teal-500',
                isChecked: false
            },
        ],
    },
    {
        category: 'Virtual Account',
        methods: [
            {
                id: 4,
                accountNumber: '8800549432',
                name: 'Fathan Gunadi',
                isChecked: false
            },
        ],
    },
];