import { FC, Fragment } from "react";
import { Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './LoginStyles.css';



interface Signin{};

export const Signin: React.FC = () => {

    return (
        
          <div className="login-screen">
            <div className="user-login">
            <h1 className="title-store">Scratch Discos</h1>
            <form autoComplete="nope">
                <div className="user-login__form-control-usuario">
                <label htmlFor="email">Usuário</label>
                <input id="email" type="text" name="email" autoComplete="off" />
                </div>
                <div className="user-login__form-control-senha">
                <label htmlFor="password">Senha</label>
                <input id="password" type="password" name="password" />
                </div>
                <button id="botao">ENTRAR</button>
                
            </form>
            </div>
          </div>
            
          
      );
    };
    

