import { render, screen } from "@testing-library/react";
import SignUp from "../pages/SignUp.tsx";


describe("SignUp Page Unit Test", () => {
  it("deve renderizar o título 'Cadastro de Cliente'", () => {
    render(<SignUp />);
    const el = screen.getByText("Cadastro de Cliente");
    if (!el) throw new Error("Elemento não encontrado");
  });
});

describe("SignUp Page System Test", () => {
  it("deve renderizar o logo, título, inputs e botões", () => {
    render(<SignUp />);
    if (!screen.getByAltText("Welcome")) throw new Error("Logo não encontrado");
    if (!screen.getByText("Cadastro de Cliente")) throw new Error("Título não encontrado");
    if (!screen.getByPlaceholderText(/digite seu nome/i)) throw new Error("Input nome não encontrado");
    if (!screen.getByPlaceholderText(/digite seu email/i)) throw new Error("Input email não encontrado");
    if (!screen.getByPlaceholderText(/digite seu cpf/i)) throw new Error("Input cpf não encontrado");
    if (!screen.getByPlaceholderText(/digite sua senha/i)) throw new Error("Input senha não encontrado");
    if (!screen.getByRole("button", { name: /entrar/i })) throw new Error("Botão entrar não encontrado");
    if (!screen.getByRole("button", { name: /voltar/i })) throw new Error("Botão voltar não encontrado");
  });
});
