
import { render, screen } from "@testing-library/react";
import Login from "../pages/Login.tsx";


describe("Login Page Unit Test", () => {
  it("deve renderizar o título 'Login'", () => {
    render(<Login />);
    const el = screen.getByText("Login");
    if (!el) throw new Error("Título 'Login' não encontrado");
  });
});

describe("Login Page System Test", () => {
  it("deve renderizar o logo, título, inputs e botões", () => {
    render(<Login />);
    if (!screen.getByAltText("Welcome")) throw new Error("Logo não encontrado");
    if (!screen.getByText("Login")) throw new Error("Título não encontrado");
    if (!screen.getByPlaceholderText(/digite seu email/i)) throw new Error("Input email não encontrado");
    if (!screen.getByPlaceholderText(/digite sua senha/i)) throw new Error("Input senha não encontrado");
    if (!screen.getByRole("button", { name: /entrar/i })) throw new Error("Botão entrar não encontrado");
    if (!screen.getByRole("button", { name: /voltar/i })) throw new Error("Botão voltar não encontrado");
  });
});

