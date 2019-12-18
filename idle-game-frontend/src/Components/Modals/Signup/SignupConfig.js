const formArray = [
    {
        input: {
            type: 'text',
            name: 'username',
            id: 'input-username',
            label: 'Username',
            style: {
                width: '250px',
                marginTop: '15px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'password',
            name: 'password',
            id: 'input-password',
            label: 'password',
            style: {
                width: '250px',
                marginTop: '15px'
            },
            validators: ['required'],
            errorMessages: ['this field is required']
        }
    },
    {
        input: {
            type: 'confirmPassword',
            name: 'confirmPassword',
            id: 'input-confirm-password',
            label: 'confirm-password',
            style: {
                width: '250px',
                marginTop: '15px'
            },
            validators: ['isPasswordMatch', 'required'],
            errorMessages: ['password mismatch', 'this field is required']
        }
    }
];

export default formArray;