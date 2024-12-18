"use client";

export default function ThemeSwitcher() {
  const switchTheme = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <button onClick={() => switchTheme("light")}>Light</button>
      <button onClick={() => switchTheme("dark")}>Dark</button>
      <button onClick={() => switchTheme("red")}>Red</button>
    </div>
  );
}
