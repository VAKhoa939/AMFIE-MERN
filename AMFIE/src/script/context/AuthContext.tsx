import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { User } from "../interfaces/User";
import { checkTokenExpiration } from "../utils/jwt";

export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
  name: string;
}

interface LoggedinUser {
  message: string;
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  register: (registerUser: RegisterUser) => Promise<boolean>;
  login: (loginUser: LoginUser) => Promise<boolean>;
  logout: () => void;
}

export function defaultLoginUser(): LoginUser {
  return { email: "", password: "" };
}

export function defaultRegisterUser(): RegisterUser {
  return { ...defaultLoginUser(), name: "" };
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const isExpired = checkTokenExpiration(token);
      if (isExpired) {
        logout();
      } else {
        fetchUser(token);
      }
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Lấy dữ liệu người dùng thất bại:", error);
    }
  };

  const HANDLE_AUTH_URL = import.meta.env.VITE_API_URL + "/auth";

  async function register(registerUser: RegisterUser): Promise<boolean> {
    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUser),
    };
    try {
      const res = await fetch(`${HANDLE_AUTH_URL}/register`, requestInit);
      const data = (await res.json()) as LoggedinUser;
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return true;
      }
      console.error(data.message);
      return false;
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      return false;
    }
  }

  async function login(loginUser: LoginUser): Promise<boolean> {
    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    };
    try {
      const res = await fetch(`${HANDLE_AUTH_URL}/login`, requestInit);
      const data = (await res.json()) as LoggedinUser;
      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        return true;
      }
      console.error(data.message);
      return false;
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
