import { FC, useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { UserInfoActionsKind } from "../reducers/UserReducer";
interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
    const [counter, setCounter] = useState<number>(0);

    const { cartItems, dispatch } = useContext(CartContext);
    const { userInfo, dispatch: userContextDispatch } = useContext(UserContext);

    console.log(cartItems);
    const logoutHandler = () => {
        userContextDispatch({ type: UserInfoActionsKind.LOGOFF });
    };
    useEffect(() => {
        const initialValue = 0;
        const c = cartItems.reduce(
            (prev, current) => prev + current.qty,
            initialValue
        );
        setCounter(c);
    }, [cartItems, cartItems.length]);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>Scratch Discos</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i
                                    className="fas fa-shopping-cart"
                                    style={{ fontSize: "20px" }}
                                />
                                {counter > 0 ? (
                                    <span
                                        className="badge badge-warning"
                                        id="lblCartCount"
                                    >
                                        {counter}
                                    </span>
                                ) : (
                                    ""
                                )}

                                {/* Carrinho */}
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo.user ? (
                            <NavDropdown title={userInfo.user.username}>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i
                                        className="fas fa-user"
                                        style={{ fontSize: "20px" }}
                                    />
                                </Nav.Link>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
