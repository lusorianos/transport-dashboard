import Container from "../components/container"
import Logo from "../assets/images/logo.png"
import { useAuth } from "../context/AuthContext";
import Button from "../components/button";
import Text from "../components/text";
import { Link } from "react-router-dom";

export default function Header() {
  const { logout } = useAuth();

  return (
    <Container
      as="header"
      className="w-full max-w-full! py-3 bg-white border-b border-solid border-gray-300"
    >
      <Container className="flex items-center justify-between gap-12 px-8">
        <Link
          to="/"
        >
          <img src={Logo} alt="Logo" className="h-9 md:h-12 cursor-pointer" />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/relatorios"
            className="hover:underline"
          >
            <Text variant={"body-md-bold"}>Relatórios</Text>
          </Link>

          <Button
            variant={"secondary"}
            className="px-12"
            onClick={logout}
          >
            Sair
          </Button>
        </div>

      </Container>
    </Container>
  )
}