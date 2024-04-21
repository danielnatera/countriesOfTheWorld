import { ref, watchEffect } from "vue";

const darkMode = ref(JSON.parse(localStorage.getItem("darkMode") || "false"));

watchEffect(() => {
  localStorage.setItem("darkMode", darkMode.value);
});

function toggleDarkMode() {
  darkMode.value = !darkMode.value;
}

export function useDarkMode() {
  return { darkMode, toggleDarkMode };
}
