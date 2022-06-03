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
    Form,
    Image,
    ListGroup,
    Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

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
import {
    LOGIN_MUTATION,
    LoginUserInput,
    UserInfo,
    UserContext,
    User,
    RegisterUserInput,
    REGISTER_MUTATION,
} from "../../contexts/UserContext";

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
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const { user, registerDispatch } = useContext(RegisterContext);

    // const [register, { data, loading, error }] = useMutation<
    //     { register: RegisteredUser },
    //     { input: RegisterUserInput }
    // >(REGISTER_MUTATION, {
    //     variables: { input: { username: email, password: password } },
    //     onCompleted(data) {
    //         registerDispatch({
    //             type: RegisterActionsKind.REGISTER,
    //             payload: data.register,
    //         });
    //     },
    // });

    let navigate = useNavigate();
    let location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/login";
    // useEffect(() => {
    //     if (data?.register) {
    //         setTimeout(function () {
    //             navigate(redirect);
    //         }, 1500);
    //     }
    // }, [data?.register, navigate, redirect]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <Fragment>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
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
        </Fragment>
    );
};
export default PaymentScreen;
