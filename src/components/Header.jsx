import React, { useContext } from "react";
import { styles } from "../styles";
import { AuthContext } from "../contexts/Auth";
import { Link, useNavigate } from "react-router-dom";
import { Categorias, InputBuscar, Menu } from "./index";
import Logo from "../images/logo-vazado-04.png"

const Header = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <section
      className={`py-5 w-full fixed z-50 border-b-[1px] border-t-0 bg-gradient-to-t to-complementPrimary from-primary sm:px-20`}
    >
      <div className="flex gap-5">
        <i className="mdi mdi-magnify text-white text-[30px] sm:hidden"></i>

        <a href="/">
          <img src={Logo} alt="home" className="sm:w-40" />
        </a>

        <div className="w-3/5 flex flex-col">
          <InputBuscar/>
          <Categorias/>
        </div>
        <div className="flex gap-2 justify-end items-start">
          {!authenticated && <ButtonsNoAuth/>}
          {authenticated && <Menu/>}

          <h2 className="hidden h-10 w-[0.1px] bg-white sm:block"></h2>
          <Link to={'/perfil/favoritos'} className="hidden sm:block">
            <i className="mdi mdi-heart text-[35px] text-white hover:text-rentBlue"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ButtonsNoAuth = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };

  const toCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <>
      <button
        onClick={toLogin}
        className="rounded-full border-2 border-white text-white py-2 px-8 hover:text-rentBlue hover:border-rentBlue"
      >
        Entrar
      </button>
      <button
        onClick={toCadastro}
        className="w-fit rounded-full border-2 border-white bg-white text-primary py-2 px-8 hover:bg-rentBlue hover:border-rentBlue"
      >
        Cadastro
      </button>
    </>
  );
};

export default Header;
