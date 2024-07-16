import {isCreditCard, isMobilePhone} from '../validators';
import {asDollarsAndCents, months, sleep, years} from '../utils';
import {object, string, number, ValidationError} from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import {SelectInput} from "../components/form/SelectInput"
import {TextInput} from "../components/form/TextInput"
import {useCart} from "../contexts/CartContext";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {useCategoryContext} from "../contexts/CategoryContext.tsx";
import "./CheckoutPage.css";

interface FormValues {
    name: string;
    address: string;
    phone: string;
    email: string;
    ccNumber: string;
    ccExpiryMonth: number;
    ccExpiryYear: number;
}

const initialValues: FormValues = {
    name: '',
    address: '',
    phone: '',
    email: '',
    ccNumber: '',
    ccExpiryMonth: new Date().getMonth(),
    ccExpiryYear: new Date().getFullYear(),
};

const yearsArray = years();

const validationSchema = object({
    name: string()
        .required('Please provide a name.')
        .min(4, 'Name must have at least 4 letters.')
        .max(45, 'Name can have at most 45 letters.'),
    address: string()
        .required('Please provide an address.')
        .min(4, "Your address must have at least 4 letters.")
        .max(45, "Your address can have at most 45 letters."),
    phone: string()
        .required('Please provide a phone number.')
        .test('isMobilePhone', 'Please provide a valid phone number.', value => isMobilePhone(value || '')),
    email: string()
        .required("Please provide an email.")
        .email("Your email must contain @xxx.xxx."),
    ccNumber: string()
        .required("Please provide a credit card number.")
        .test('isCreditCard', 'Please provide a valid credit card number.', value => isCreditCard(value || '')),
    ccExpiryMonth: number(),
    ccExpiryYear: number(),
});

export default function CheckoutPage() {
    const {cart} = useCart()
    const {lastSelectedCategoryName} = useCategoryContext();
    const navigate = useNavigate();
    const [checkoutStatus, setCheckoutStatus] = useState<string>("");

    const handleSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {

        console.log("Submit order");
        await sleep(1000);
        const result = await validationSchema.validate(values, {abortEarly: false}).catch((err) => err);
        if (result instanceof ValidationError) {
            setCheckoutStatus('ERROR');
            actions.setSubmitting(false);
        } else {
            setCheckoutStatus('PENDING');
            await sleep(1000);
            setCheckoutStatus('OK');
            await sleep(1000);
            navigate('/confirmation');
        }
    };

    return (
        <div className="checkout-page hero-area">
            {cart.empty && (
                <>
                    <h1>There's nothing to checkout if there's no items in your cart!</h1>
                    <Link to={`/category/${lastSelectedCategoryName}`}>
                        <button className="start-shopping call-to-action-button">Back to Shopping</button>
                    </Link>
                </>
            )}
            {!cart.empty && (
                <section className="checkout-page-body">
                    <section className="checkout-page-form-and-details">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            validateOnChange={false}
                            validateOnBlur={true}
                        >
                            {({isSubmitting}) => (
                                <Form>
                                    <TextInput label="Name" name="name"/>
                                    <TextInput label="Address" name="address"/>
                                    <TextInput label="Phone" name="phone"/>
                                    <TextInput label="Email" name="email"/>
                                    <TextInput label="Credit Card" name="ccNumber"/>
                                    <div className='expiration-div'>
                                        <SelectInput label="Exp Date: " name="ccExpiryMonth" options={months()}/>
                                        <SelectInput label="" name="ccExpiryYear" options={yearsArray}/>
                                    </div>
                                    <div className="complete-purchase">
                                        <button type="submit" className="call-to-action-button-skinny"
                                                disabled={isSubmitting || checkoutStatus === 'PENDING'}>
                                            {isSubmitting ?
                                                <FontAwesomeIcon icon={faSpinner} spin/> : 'Complete Purchase'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="charges-div">
                            <p>Your credit card will be charged {asDollarsAndCents(cart.total)}</p>
                            <p>({asDollarsAndCents(cart.subtotal)} + {asDollarsAndCents(cart.surcharge)} shipping)</p>
                        </div>
                    </section>
                    {checkoutStatus != '' && (
                        <section className="checkoutStatusBox">
                            {checkoutStatus === 'ERROR' &&
                                <div>Error: Please fix the problems above and try again.</div>}
                            {checkoutStatus === 'PENDING' && <div>Processing...</div>}
                            {checkoutStatus === 'OK' && <div>Order placed...</div>}
                            {checkoutStatus === 'SERVER_ERROR' &&
                                <div>An unexpected error occurred, please try again.</div>}
                        </section>
                    )}
                </section>
            )}
        </div>
    );
}