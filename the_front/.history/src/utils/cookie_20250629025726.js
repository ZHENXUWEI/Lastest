import Cookies from "js-cookie";

const KEY = "UserInfo";

export function getCookie() {
  if (Cookies.get(KEY)) {
    return JSON.parse(Cookies.get(KEY));
  }
}

export function setCookie(value) {
  Cookies.set(KEY, JSON.stringify(value));
}

export function removeCookie() {
  Cookies.remove(KEY);
}

export function setKeyWordCookie(value) {
  Cookies.set("KW", value);
}

export function getKeyWordCookie() {
  if (Cookies.get("KW")) {
    return Cookies.get("KW");
  }
}

export function removeKeyWordCookie() {
  Cookies.remove("KW");
}

function getTokenFromCookie() {
  const name = "token=";
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith(name)) {
      return cookies[i].substring(name.length);
    }
  }
  return null;
}
