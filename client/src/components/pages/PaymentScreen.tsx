import {
    ApolloError,
    QueryResult,
    useLazyQuery,
    useMutation,
    useQuery,
} from "@apollo/client";

import {
    FC,
    FormEvent,
    Fragment,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    ListGroup,
    Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { PaymentMethodContext } from "../../contexts/PaymentMethodContext";

import {
    GET_RECORD_QUERY,
    Record,
    RecordInventoryData,
    RecordsInventoryData,
} from "../../contexts/ProductsContext";
import {
    RegisterContext,
    RegisteredUser,
} from "../../contexts/RegisterContext";
import { ShippingContext } from "../../contexts/ShippingContext";
import {
    LOGIN_MUTATION,
    LoginUserInput,
    UserInfo,
    UserContext,
    User,
    RegisterUserInput,
    REGISTER_MUTATION,
} from "../../contexts/UserContext";
import { PaymentMethodActionsKind } from "../../reducers/PaymentMethodReducer";

import {
    RegisterActionsKind,
    UserInfoActionsKind,
} from "../../reducers/UserReducer";
import CheckoutSteps from "../CheckoutSteps";
import FormContainer from "../FormContainer";
import { Loader } from "../Loader";
import { Message } from "../Message";

interface PaymentScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const PaymentScreen: FC<PaymentScreenProps> = ({}) => {
    let location = useLocation();
    const { shippingAddress, shippingAddressDispatch } =
        useContext(ShippingContext);
    const { paymentMethod, paymentMethodDispatch } =
        useContext(PaymentMethodContext);

    const [payment, setPaymentMethod] = useState("PayPal");

    const { user, registerDispatch } = useContext(RegisterContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (shippingAddress.postalCode === undefined) {
            console.log(shippingAddress.postalCode);
            navigate("/shipping");
        }
    }, [navigate, shippingAddress.postalCode]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        paymentMethodDispatch({
            type: PaymentMethodActionsKind.SAVE_PAYMENT_METHOD,
            payload: { method: payment },
        });
        navigate("/placeorder");
    };
    return (
        <Container>
            <CheckoutSteps step1 step2 step3 />
            <FormContainer>
                <h1>Pagamento</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as="legend">Selecionar método</Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="PayPal ou Cartão de Crédito"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            ></Form.Check>
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Continuar
                    </Button>
                </Form>
            </FormContainer>
        </Container>
    );
};
export default PaymentScreen;
