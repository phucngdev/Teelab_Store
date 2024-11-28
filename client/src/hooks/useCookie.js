import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function useCookie(cookieName, decode) {
  const [cookieValue, setCookieValue] = useState(null);

  useEffect(() => {
    const fetchCookie = () => {
      if (decode) {
        const cookie = Cookies.get(cookieName);
        const decoded = cookie ? jwtDecode(cookie) : null;
        setCookieValue(decoded);
      } else {
        const cookie = Cookies.get(cookieName);
        setCookieValue(cookie ? JSON.parse(cookie) : null);
      }
    };

    fetchCookie();
  }, [cookieName]);

  return cookieValue;
}
