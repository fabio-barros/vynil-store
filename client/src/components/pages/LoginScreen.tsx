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
    LOGIN_MUTATION,
    LoginUserInput,
    UserInfo,
    UserContext,
} from "../../contexts/UserContext";

import { UserInfoActionsKind } from "../../reducers/UserReducer";
import FormContainer from "../FormContainer";
import { Loader } from "../Loader";
import { Message } from "../Message";

interface LoginScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const LoginScreen: FC<LoginScreenProps> = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { userInfo, dispatch } = useContext(UserContext);

    const [login, { data, loading, error }] = useMutation<
        { login: UserInfo },
        { input: LoginUserInput }
    >(LOGIN_MUTATION, {
        variables: { input: { username: email, password: password } },
        onCompleted(data) {
            dispatch({
                type: UserInfoActionsKind.LOGIN,
                payload: data.login,
            });
        },
    });
    let navigate = useNavigate();

    if (userInfo.access_token) {
        navigate("/");
    }

    let location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {
        if (data?.login) {
            // setTimeout(function () {
            navigate(redirect);
            // }, 1500);
        }
    }, [data?.login, navigate, redirect, userInfo]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        email && password && login();
    };
    return (
        <Fragment>
            <FormContainer>
                {data && data.login ? (
                    <Message variant="success">Redirecionando...</Message>
                ) : null}
                {error ? (
                    <Message variant="warning">{error.message}</Message>
                ) : null}
                <h1>Log In</h1>
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
                        Log In
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Novo usuário?{" "}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : "/register"
                            }
                        >
                            cadastre-se aqui
                        </Link>
                    </Col>
                </Row>
            </FormContainer>
        </Fragment>
    );
};
export default LoginScreen;
