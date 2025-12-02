import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextProps = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Dados fictícios do usuário
const DEFAULT_EMAIL = "cliente@empresa.com";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth === "true";
  });

  // Carrega senha salva ou usa padrão
  const [password, setPassword] = useState(() => {
    return localStorage.getItem("password") || "123456";
  });

  const login = (email: string, inputPassword: string) => {
    if (email === DEFAULT_EMAIL && inputPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem("auth", "true");
      return true;
    }
    return false;
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    // Verifica se senha atual está correta
    if (oldPassword !== password) {
      return false; // senha incorreta
    }

    // Salva nova senha
    setPassword(newPassword);
    localStorage.setItem("password", newPassword);

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};