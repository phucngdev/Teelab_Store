import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Hàm kiểm tra thời gian và đặt theme tương ứng
  const setThemeBasedOnTime = () => {
    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 18 || currentHour < 6;
    const newTheme = isNightTime ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Kiểm tra và đặt theme khi load trang
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setThemeBasedOnTime(); // Đặt theme theo thời gian nếu không có lưu trữ
    }

    // Đặt interval để cập nhật theme mỗi giờ
    const interval = setInterval(setThemeBasedOnTime, 3600000); // 1 giờ
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Áp dụng class `dark` khi theme là `dark`
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Hàm để người dùng tự đổi theme nếu muốn
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Lưu vào localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng ThemeContext
export const useTheme = () => useContext(ThemeContext);
