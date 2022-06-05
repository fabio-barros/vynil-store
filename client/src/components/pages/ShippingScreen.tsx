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
import { useNavigate } from "react-router";

import {
    RegisterContext,
    RegisteredUser,
} from "../../contexts/RegisterContext";
import { ShippingContext } from "../../contexts/ShippingContext";
import { UserContext } from "../../contexts/UserContext";

import { ShippingActionsKind } from "../../reducers/ShippingReducer";

import CheckoutSteps from "../CheckoutSteps";
import FormContainer from "../FormContainer";
import { Loader } from "../Loader";
import { Message } from "../Message";

interface ShippingScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const ShippingScreen: FC<ShippingScreenProps> = ({}) => {
    const { userInfo, dispatch } = useContext(UserContext);

    const { shippingAddress, shippingAddressDispatch } =
        useContext(ShippingContext);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [houseNumber, setHouseNumber] = useState(shippingAddress.number);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [state, setState] = useState(shippingAddress.state);

    const { user, registerDispatch } = useContext(RegisterContext);

    let navigate = useNavigate();
    useEffect(() => {
        if (userInfo.access_token === undefined) {
            navigate("/login");
        }
    }, [navigate, userInfo.access_token]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        shippingAddressDispatch({
            type: ShippingActionsKind.SAVE_SHIPPING_ADDRESS,
            payload: { address, city, number: houseNumber, postalCode, state },
        });
        navigate("/payment");
    };
    return (
        <Container>
            <CheckoutSteps step1 step2 />
            <FormContainer>
                <h1>Entrega</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Label>Endereço</Form.Label>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="  Digite o endereço"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>Cidade</Form.Label>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="  Digite a cidade"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>Número</Form.Label>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="  Digite o número"
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>CEP</Form.Label>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder="  Digite o CEP"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Group>
                        <Form.Control
                            required
                            type="text"
                            placeholder=" Digite o Estado"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Continuar
                    </Button>
                </Form>
            </FormContainer>
        </Container>
    );
};
export default ShippingScreen;
