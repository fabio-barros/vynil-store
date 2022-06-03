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
import FormContainer from "../FormContainer";
import { Loader } from "../Loader";
import { Message } from "../Message";

interface RegisterScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const RegisterScreen: FC<RegisterScreenProps> = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { user, registerDispatch } = useContext(RegisterContext);

    const [register, { data, loading, error }] = useMutation<
        { register: RegisteredUser },
        { input: RegisterUserInput }
    >(REGISTER_MUTATION, {
        variables: { input: { username: email, password: password } },
        onCompleted(data) {
            registerDispatch({
                type: RegisterActionsKind.REGISTER,
                payload: data.register,
            });
        },
    });

    let navigate = useNavigate();
    let location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/login";
    useEffect(() => {
        if (data?.register) {
            setTimeout(function () {
                navigate(redirect);
            }, 1500);
        }
    }, [data?.register, navigate, redirect]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        email && password && register();
    };
    return (
        <Fragment>
            <h6>{email}</h6>
            <h6>{password}</h6>

            <FormContainer>
                {data && data.register ? (
                    <Message variant="success">Redirecionando...</Message>
                ) : null}
                {error ? (
                    <Message variant="warning">{error.message}</Message>
                ) : null}
                <h1>Cadastrar</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Label>Email</Form.Label>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            placeholder="  Digite o email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            placeholder="  Digite a senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Cadastrar
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Já está registrado?
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : "/login"
                            }
                        >
                            faça o login aqui
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </Fragment>
    );
};
export default RegisterScreen;
