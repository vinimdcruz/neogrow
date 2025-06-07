// contexts/authContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
interface UserData {
  uid: string;
  name: string;
  email: string;
}
interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  login: (token: string, user: UserData, callback?: () => void) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        setSigned(true);
        setUser(parsedUser);
      } catch {
        setSigned(false);
        setUser(null);
      }
    } else {
      setSigned(false);
      setUser(null);
    }

    setLoading(false);
  }, []);

  function login(token: string, userData: UserData, callback?: () => void) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    setSigned(true);
    setUser(userData);

    setTimeout(() => {
      if (callback) callback();
    }, 0);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setSigned(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
