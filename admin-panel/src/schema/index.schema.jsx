import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    PhoneNumber: Yup.string().min(10).max(25).required("Please enter your phone number"),
    Password: Yup.string().min(6).required("please enter your password")
})

export const RegistrationSchema = Yup.object({
    PhoneNumber: Yup.string().min(10).max(12).required("Please enter you phone number"),
    FirstName: Yup.string().min(2).max(25).required('please enter your first name'),
    LastName: Yup.string().min(2).max(25).required('please enter your last name'),
    Password: Yup.string().min(6).required("please enter your password"),
    Confirm_Password: Yup.string().required().oneOf([Yup.ref("Password"), null], "Password must match"),
});

export const CreateSellerAccountSchema = Yup.object({
    FirmName: Yup.string().min(2).max(25).required('please enter Firm name'),
    FirstName: Yup.string().min(2).max(25).required('please enter first name'),
    LastName: Yup.string().min(2).max(25).required('please enter last name'),
    PhoneNumber: Yup.string().min(10).max(12).required("Please enter phone number"),
    AltNumber: Yup.string().min(10).max(12),
    Address: Yup.string().min(5).max(50).required("please enter the address"),
    City: Yup.string().min(3).max(20).required("please enter city name"),
    State: Yup.string().required("please enter the state"),
    Password: Yup.string().min(6).required("please enter your password"),
    ConfirmPassword: Yup.string().required().oneOf([Yup.ref("Password"), null], "Password must match"),
})