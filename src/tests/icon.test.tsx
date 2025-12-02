import { render } from "@testing-library/react";
import Icon from "../components/icon";

const MockSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="mock-svg" {...props} />
);

describe("Icon component", () => {
  it("renderiza o SVG", () => {
    const { getByTestId } = render(<Icon svg={MockSvg} />);
    expect(getByTestId("mock-svg")).toBeInTheDocument();
  });

  it("usa o tamanho padrão (md)", () => {
    const { getByTestId } = render(<Icon svg={MockSvg} />);
    const svg = getByTestId("mock-svg");
    expect(svg.getAttribute("class")).toContain("w-5 h-5");
  });

  it("aplica size=sm", () => {
    const { getByTestId } = render(<Icon svg={MockSvg} size="sm" />);
    const svg = getByTestId("mock-svg");
    expect(svg.getAttribute("class")).toContain("w-4 h-4");
  });

  it("aplica animação quando animate=true", () => {
    const { getByTestId } = render(<Icon svg={MockSvg} animate />);
    const svg = getByTestId("mock-svg");
    expect(svg.getAttribute("class")).toContain("animate-spin");
  });

  it("aceita className extra e props pass-through", () => {
    const { getByTestId } = render(
      <Icon svg={MockSvg} className="extra" aria-label="icone" />
    );
    const svg = getByTestId("mock-svg");

    expect(svg.getAttribute("class")).toContain("extra");
    expect(svg.getAttribute("aria-label")).toBe("icone");
  });
});