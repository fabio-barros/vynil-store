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

interface ProfileScreenProps {}
interface RecordVars {
    id: string | undefined;
}

const ProfileScreen: FC<ProfileScreenProps> = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo, dispatch: userContextDispatch } = useContext(UserContext);

    let navigate = useNavigate();
    let location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/login";
    // useEffect(() => {
    //     if (!userInfo.user) {
    //         navigate("/login");
    //     } else {if(!userInfo.user.username)
    //     }
    // }, [data?.register, navigate, redirect]);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // email && password && register();
    };
    return (
        <Container>
            <Row>
                <Col className="pb-3">
                    <h2>Perfil</h2>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <h3>Atualizar Dados</h3>
                    <Form onSubmit={submitHandler} className="py-2">
                        <Form.Label>Nome</Form.Label>
                        <Form.Group className="mb-2">
                            <Form.Control
                                type="name"
                                placeholder="  Digite o nome"
                                value={""}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Group className="mb-2">
                            <Form.Control
                                type="email"
                                placeholder="  Digite o email"
                                value={""}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="  Digite a senha"
                                value={""}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="my-3"
                        >
                            Update
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h3>Minhas Compras</h3>
                </Col>
            </Row>
        </Container>
    );
};
export default ProfileScreen;
