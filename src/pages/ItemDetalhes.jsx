import React, { useContext, useEffect, useState } from "react";
import { Footer, Header } from "../components";
import { ItemContext } from "../contexts/ItemContext";
import {
  getAvaliacao,
  getFotoItemById,
  getFotoUserById,
  getItemById,
  postFavoritarItem,
} from "../api";
import { styles } from "../styles";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Rating } from "@mui/material";
import { categorias } from "../constants";

const ItemDetalhes = () => {
  const navigate = useNavigate();
  const { itemId, item, foto, linkWhats, getItem, userFoto } = useContext(ItemContext);
  const [value, setValue] = useState(0);

  const favoritarItem = async () => {
    
await
 postFavoritarItem(itemId);
  };

  const backImage = {
    backgroundImage: `url(${foto})`,
  };

  const categoria = () => {
    const selectedCategoryObject = categorias.find(
      (categoria) => categoria.value === item.categoria
    );
  
    if (selectedCategoryObject) {
      return selectedCategoryObject.title;
    }
  
    return "Categoria não encontrada";
  };

  useEffect(() => {
    getItem();
    getAvaliacao(itemId).then((res) => {
      // console.log("ava", res.data);
      setValue(res.data);
    })
  }, []);

  return (
    <>
      <Header />
      <main className={`${styles.mainConfig}`}>
        <div className="py-2">
          <button
            onClick={() => navigate(-1)}
            to={"/filtros"}
            className="text-md flex items-center text-gray-400"
          >
            <i className="mdi mdi-arrow-left text-[25px]" />
            Voltar
          </button>
        </div>

        <div className="flex justify-center flex-wrap sm:justify-between">
          <div className="w-full flex flex-col gap-10 lg:w-[70%]">
            <div
              className="aspect-video max-w-full min-w-full bg-no-repeat bg-contain bg-black bg-center"
              style={backImage}
            ></div>

            <div className={`${styles.cardWhite}`}>
              <h2 className="text-xl font-bold pb-10">Detalhes</h2>
              <p>{item.descricao}</p>
            </div>
          </div>

          <div
            className={`${styles.cardWhite} flex flex-col mt-10 gap-10 p-8 lg:bg-transparent lg:shadow-none lg:mt-0`}
          >
            <div>
              <h1 className="text-2xl font-bold">{item.nomeItem}</h1>
              <p className="text-lg text-gray-400">{categoria()}</p>
            </div>

            <div className="flex">
              <Link to={`/locador/${item.idUsuario}`}>
                <Avatar
                  alt={`${item.apelidoUsario}`}
                  src={`${userFoto}`}
                  sx={{ width: 56, height: 56 }}
                />
              </Link>
              <div className="px-3">
                <Link to={`/locador/${item.idUsuario}`}>
                  <h3 className="text-xl font-bold">{item.apelidoUsario}</h3>
                </Link>
                <Rating name="read-only" value={value} readOnly precision={0.5} />
              </div>
            </div>

            <a href={linkWhats} target="_blank">
              <button
                className={`w-full rounded-lg flex items-center justify-evenly border-[1px]
              border-gray-400 p-1 px-3 ${styles.hoverPadraoPrimary}`}
              >
                <i className="mdi mdi-chat text-[22px]"></i>
                Conversar com o locador
              </button>
            </a>

            <div className="">
              <div className="flex items-end">
                <h2 className="text-4xl font-bold">R$ {item.valorDia} </h2>
                <span className="text-sm">/dia</span>
              </div>
              <p className="text-xs text-gray-400">
                Cobrança recorrente no cartão de crédito
              </p>
            </div>

            <div className="w-full flex gap-2">
              <Link
                to={`/item/alugar/${item.id}`}
                className={`w-5/6 ${styles.botaoPadraoPrimary} ${styles.hoverPadraoPrimary}`}
              >
                Alugar
              </Link>

              <button
                className={`${styles.botaoPadraoSecondary} text-gray-300 ${styles.hoverPadraoPrimary}`}
              >
                <i
                  className="mdi mdi-heart cursor-pointer text-[22px]"
                  onClick={favoritarItem}
                />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ItemDetalhes;
