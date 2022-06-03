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

interface ShippingScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const ShippingScreen: FC<ShippingScreenProps> = ({}) => {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

    const { user, registerDispatch } = useContext(RegisterContext);
    // const { userInfo, dispatch } = useContext(UserContext);

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
    // if (!userInfo.access_token) {
    //     navigate("/login");
    // }
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
                <CheckoutSteps step1 step2 />
                <h1>Entrega</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Label>Endereço</Form.Label>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="  Digite o endereço"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="  Digite a cidade"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>CEP</Form.Label>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="  Digite o CEP"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Continuar
                    </Button>
                </Form>
            </FormContainer>
        </Fragment>
    );
};
export default ShippingScreen;
