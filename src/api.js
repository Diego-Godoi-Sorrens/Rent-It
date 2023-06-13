import axios from "axios";
import { UsuarioLogado, endereco } from "./constants";
import { useState } from "react";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = JSON.parse(sessionStorage.getItem("token"));
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const api = axios.create({
  // baseURL: "https://642ec65b2b883abc6416b7b6.mockapi.io/rent-it",
  // baseURL: "http://localhost:8080"
  baseURL: "http://localhost:4500",
});

export const createSession = async (email, password) => {
  return api.post("/usuarios/login", { email, password });
};

export const putUsuario = (formValues) => {
  return api
    .put(`/usuarios/${UsuarioLogado.userId}`, {
      id: UsuarioLogado.userId,
      nome: formValues.nome,
      apelido: formValues.apelido,
      email: formValues.email,
      telefone: formValues.telefone,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllItem = () => {
  return api.get(`/itens`);
};

export const getItemByNome = async (nome) => {
  return api.get(`/itens/nome/${nome}`);
};

export const getItemById = async (itemId) => {
  return api.get(`/itens/${itemId}`);
};

export const getFotoItemById = (itemId) => {
  return `http://localhost:4500/itens/foto/${itemId}`;
};

export const getFotoUserById = (userId) => {
  return `http://localhost:4500/usuarios/foto/${userId}`;
};

export const patchFotoUserById = async (userId, file) => {
  return api
    .patch(`/usuarios/foto/${userId}`, file, {
      headers: {
        "Content-Type": "image/jpg",
        Accept: "*/*",
      },
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const patchFotoItemById = async (itemId, foto) => {
  return api
    .patch(`/itens/foto/${itemId}`, foto, {
      headers: {
        "Content-Type": "image/jpg",
        Accept: "*/*",
      },
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postPesquisarItem = (nome, formValues) => {
  console.log("pesquisar", {
    nome: nome,
    preco: formValues.preco,
    categorias: [formValues.categoria],
  });
  // let categoria =
  return api
    .get(`/itens/pesquisar`, {
      nome: nome,
      preco: formValues.preco,
      categorias: [formValues.categoria],
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserById = (userId) => {
  return api.get(`/usuarios/${userId}`);
};

export const getUserItem = async (userId) => {
  return api.get(`/itens/usuario?id=${userId}`);
};

export const postUserItem = async (formValues) => {
  return api
    .post(`/itens/cadastrar`, {
      id: formValues.id,
      nome: formValues.nome,
      categoria: formValues.categoria || 5,
      usuario: UsuarioLogado.userId,
      descricao: formValues.descricao,
      valorDia: formValues.valorDia,
      disponivel: 0,
    })
    .then((response) => {
      console.log("sucesso");
      // window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putItem = async (itemId, formValues) => {
  return api
    .put(`/itens/${itemId}`, {
      id: itemId,
      nome: formValues.nome,
      categoria: formValues.categoria || 5,
      usuario: UsuarioLogado.userId,
      disponivel: 0,
      descricao: formValues.descricao,
      valorDia: formValues.valorDia,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteItem = async (itemId) => {
  return api
    .delete(`/itens/${itemId}`)
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postFavoritarItem = async (itemId) => {
  return api
    .post(`/itens/favoritar`, {
      usuario: UsuarioLogado.userId,
      item: itemId,
    })
    .then((response) => {
      console.log("favoritado com sucesso");
      // window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserItensFavoritos = async () => {
  let userId = UsuarioLogado.userId;
  return api.get(`/itens/favoritos?id=${userId}`);
};

export const getUserLogged = async () => {
  try {
    const resposta = await getUserById(UsuarioLogado.userId).then((res) => {
      console.log(res.data);
      return res.data;
    });
    return resposta;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserLoggedItems = async (userId) => {
  try {
    const resposta = await getUserItem(userId).then((res) => {
      console.log(res.data);
      return res.data;
    });
    return resposta;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserCartoes = async () => {
  let userId = UsuarioLogado.userId;
  return api.get(`/cartaos/usuario/{id}?id=${userId}`);
};

export const getUserCartoesById = async (cartaoId) => {
  return api.get(`/cartaos/{id}?id=${cartaoId}`);
};

export const deleteUserCartoes = async (cartaoId) => {
  return api
    .delete(`/cartaos/deletar/{id}?id=${cartaoId}`)
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postUserCartoes = async (formValues) => {
  return api
    .post(`/cartaos/cadastrar`, {
      id: 0,
      numCartao: formValues.numCartao,
      validade: formValues.validade,
      cpfTitular: formValues.cpfTitular,
      usuario: UsuarioLogado.userId,
      nomeImpresso: formValues.nomeImpresso,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const patchUserCartoes = async (id, formValues) => {
  return api
    .patch(`/cartaos/atualizar`, {
      id: id,
      numCartao: formValues.numCartao,
      validade: formValues.validade,
      cpfTitular: formValues.cpfTitular,
      usuario: UsuarioLogado.userId,
      nomeImpresso: formValues.nomeUsuario,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserEndereco = async () => {
  return api.get(`/enderecos/usuario/{id}?id=${UsuarioLogado.userId}`);
};

export const postUserEndereco = async (formValues) => {
  return api
    .post(`/enderecos/cadastrar`, {
      numero: formValues.numero,
      cep: formValues.cep,
      complemento: formValues.complemento,
      cidade: formValues.cidade,
      bairro: formValues.bairro,
      logradouro: formValues.logradouro,
      usuario: UsuarioLogado.userId,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putUserEndereco = async (id, formValues) => {
  return api
    .put(`/enderecos/${id}`, {
      id: id,
      numero: formValues.numero,
      cep: formValues.cep,
      complemento: formValues.complemento,
      cidade: formValues.cidade,
      bairro: formValues.bairro,
      logradouro: formValues.logradouro,
      usuario: UsuarioLogado.userId,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteEndereco = async (id) => {
  return api
    .delete(`/enderecos/${id}`)
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postTXT = async (file) => {
  return api
    .post(`/transacoes/alugar/${UsuarioLogado.userId}`, file, {
      headers: {
        "Content-Type": "image/jpg",
        Accept: "*/*",
      },
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTXT = async () => {
  console.log("txt");
  return `http://localhost:4500/transacoes/alugados/txt/${UsuarioLogado.userId}`;
};

export const getCSV = async () => {
  console.log("csv");
  return `http://localhost:4500/transacoes/csv/${UsuarioLogado.userId}`;
};

export const postAlugarItem = async (formValues) => {
  console.log("post alugar", formValues);
  return api
    .post(`/itens/cadastrar`, {
      cartaoId: formValues.cartaoId,
      cpf: formValues.cpf,
      dtFim: formValues.dtFim,
      dtInicio: formValues.dtInicio,
      enderecoId: endereco.id,
      itemId: formValues.cartaoId,
      idUso: formValues.cartaoId,
      valorFinal: formValues.total,
    })
    .then((response) => {
      console.log("sucesso");
      window.location.reload(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default api;
