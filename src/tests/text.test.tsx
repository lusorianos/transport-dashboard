// src/components/text.test.tsx
import { render, screen } from "@testing-library/react";
import Text, { textVariants } from "../components/text";

describe("Text component", () => {
  it("deve renderizar o texto passado como children", () => {
    render(<Text>Olá Mundo</Text>);
    expect(screen.getByText("Olá Mundo")).toBeInTheDocument();
  });

  it("deve aplicar a variante padrão (body-md)", () => {
    render(<Text>Teste Padrão</Text>);
    const element = screen.getByText("Teste Padrão");
    expect(element).toHaveClass(textVariants()); // textVariants() retorna a classe padrão
  });

  it("deve aplicar a variante body-sm-bold", () => {
    render(<Text variant="body-sm-bold">Texto Pequeno Negrito</Text>);
    const element = screen.getByText("Texto Pequeno Negrito");
    expect(element).toHaveClass("text-sm leading-5 font-semibold");
  });

  it("deve renderizar como uma tag HTML diferente quando passado 'as'", () => {
    render(<Text as="p">Parágrafo</Text>);
    const element = screen.getByText("Parágrafo");
    expect(element.tagName.toLowerCase()).toBe("p");
  });

  it("deve mesclar className adicional passada via props", () => {
    render(<Text className="text-red-500">Com Classe Extra</Text>);
    const element = screen.getByText("Com Classe Extra");
    expect(element).toHaveClass("text-red-500");
    expect(element).toHaveClass(textVariants()); // ainda mantém a classe padrão
  });
});