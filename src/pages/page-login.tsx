import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import BackgroundVideo from "../assets/images/video.mp4";
import InputText from "../components/input";
import Button from "../components/button";
import Card from "../components/card";
import Text from "../components/text";
import Container from "../components/container";
import EyeClose from "../assets/icons/eye-closed.svg?react";
import EyeOpen from "../assets/icons/eye.svg?react";
import Logo from "../assets/images/logo.png";

import PasswordChecklist from "react-password-checklist";

export default function Login() {
  const { login, changePassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const toggleSenha = () => setShowSenha(!showSenha);
  const toggleNewPass = () => setShowNewPass(!showNewPass);
  const toggleConfirmPass = () => setShowConfirmPass(!showConfirmPass);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ok = login(email, senha);

    if (ok) {
      toast.success("Login realizado com sucesso!");
      setTimeout(() => navigate("/"), 500);
    } else {
      toast.error("Usuário ou senha inválidos.");
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      toast.error("A confirmação da nova senha não confere.");
      return;
    }

    const ok = changePassword(oldPass, newPass);

    if (ok) {
      toast.success("Senha alterada com sucesso!");
      setOldPass("");
      setNewPass("");
      setConfirmPass("");
      setIsChangePassword(false);
    } else {
      toast.error("Senha atual incorreta.");
    }
  };

  return (
    <div className="flex items-stretch">
      <div className="flex-1 bg-cover bg-center max-[1100px]:hidden relative">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={BackgroundVideo} type="video/mp4" />
        </video>
      </div>

      <div className="flex-[560px_1_0] min-[1101px]:max-w-[560px] max-[1100px]:flex-1">
        <div className="h-dvh bg-gray-100 p-12 max-[1100px]:p-7">
          <Card className="flex flex-col gap-6 bg-white rounded p-8">
            <img src={Logo} alt="Logo" className="h-9 md:h-14 mx-auto mb-8" />

            {isChangePassword ? (
              <>
                <Text as="h1" variant="body-xl" className="text-gray-400 text-2xl!">
                  Alterar Senha
                </Text>

                <Container
                  as="form"
                  onSubmit={handlePasswordChange}
                  className="flex flex-col gap-4 w-full p-0!"
                >
                  <InputText
                    type="password"
                    placeholder="Senha atual"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    required
                  />
                  <div className="flex w-full items-center gap-2 rounded-sm border border-gray-300 bg-gray-900">
                    <InputText
                      type={showNewPass ? "text" : "password"}
                      placeholder="Nova senha"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                      className="border-none!"
                    />
                    <Button
                      type="button"
                      variant="tertiary"
                      icon={showNewPass ? EyeOpen : EyeClose}
                      onClick={toggleNewPass}
                      className="p-0! w-auto h-auto"
                    />
                  </div>
                  <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital"]}
                    minLength={6}
                    value={newPass}
                    valueAgain={confirmPass}
                    className="text-gray-500 text-sm"
                    messages={{
                      minLength: "Pelo menos 6 caracteres",
                      specialChar: "Inclua um caractere especial",
                      number: "Inclua um número",
                      capital: "Inclua uma letra maiúscula",
                    }}
                  />
                  <div className="flex w-full items-center gap-2 rounded-sm border border-gray-300 bg-gray-900">
                    <InputText
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Confirmar nova senha"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                      className="border-none!"
                    />
                    <Button
                      type="button"
                      variant="tertiary"
                      icon={showConfirmPass ? EyeOpen : EyeClose}
                      onClick={toggleConfirmPass}
                      className="p-0! w-auto h-auto"
                    />
                  </div>

                  <Button variant="secondary" className="w-full h-12" type="submit">
                    Salvar nova senha
                  </Button>

                  <Button
                    type="button"
                    variant="tertiary"
                    onClick={() => setIsChangePassword(false)}
                    className="w-full mt-2"
                  >
                    Voltar ao login
                  </Button>
                </Container>
              </>
            ) : (
              <>
                <Text as="h1" variant="body-xl" className="text-gray-400 text-2xl!">
                  Acessar a Plataforma
                </Text>

                <Container
                  as="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full p-0!"
                >
                  <InputText
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="flex w-full items-center gap-2 rounded-sm border border-gray-300 bg-gray-900">
                    <InputText
                      type={showSenha ? "text" : "password"}
                      placeholder="Senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      required
                      className="border-none!"
                    />
                    <Button
                      type="button"
                      variant="tertiary"
                      icon={showSenha ? EyeOpen : EyeClose}
                      onClick={toggleSenha}
                      className="p-0! w-auto h-auto"
                    />
                  </div>

                  <Button variant="secondary" className="w-full h-12" type="submit">
                    Entrar
                  </Button>

                  <Button
                    variant="tertiary"
                    className="text-red-base cursor-pointer hover:brightness-125"
                    onClick={() => setIsChangePassword(true)}
                  >
                    Alterar senha
                  </Button>
                </Container>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}