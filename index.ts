import { CookieJar } from "tough-cookie";
import got from "got";
import { HttpProxyAgent } from "http-proxy-agent";
import { HttpsProxyAgent } from "https-proxy-agent";

const url = 'https://www.kleinanzeigen.de'
const proxyUrl = 'http://afcf77dc544a-country-de-city-mosbach:0018797e-4d5a-4b37-ad00-b18c8a5b0e2c@budget.digiproxy.cc:9000'
// console.log(getRandomName())


// const response = await fetch(`${url}/m-benutzer-anmeldung.html`, {
//   proxy: proxyUrl,
// });

// if (!response.ok) {
//   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
// }

// const html = await response.text();

// const tmxSessionId = html.match(
//   /tmxSessionId:\s*["']([^"']+)["']/
// )?.[1];

// console.log(tmxSessionId);

// //
const jar = new CookieJar();

const client = got.extend({
  cookieJar: jar,

  agent: {
    http: new HttpProxyAgent(proxyUrl),
    https: new HttpsProxyAgent(proxyUrl),
  },

  headers: {
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/154.0.0.0 Safari/537.36",
  },

  retry: {
    limit: 0,
  },
});
let response = await client.get(
  "https://www.kleinanzeigen.de/m-benutzer-anmeldung.html",
);

let html = response.body;

let tmxSessionId = html.match(
  /tmxSessionId:\s*["']([^"']+)["']/
)?.[1];

console.log(tmxSessionId);

const csrfToken = (await jar.getCookies(url))
  .find(cookie => cookie.key === "CSRF-TOKEN")
  ?.value;

if (!csrfToken) {
  throw new Error("CSRF-TOKEN не найден среди cookies после GET");
}

// // Это НЕ tmxSessionId. Нужен отдельный registrationWenkseSessionId
// // из предыдущего шага регистрации/ответа API.
// const registrationWenkseSessionId = html.match(
//   /registrationWenkseSessionId\s*[:=]\s*["']([^"']+)["']/,
// )?.[1];

// if (!registrationWenkseSessionId) {
//   throw new Error(
//     "registrationWenkseSessionId не найден. Не подставляйте вместо него tmxSessionId.",
//   );
// }

const form = new FormData();
form.append("email", "industrial.catfish@x-box.in");
form.append("password", "asdasdSAdsadAS12312!");
form.append("accountType", "PRIVATE");
form.append("contactName", "Dmitry Rest");
form.append("marketingOptIn", "false");
form.append("registrationWenkseSessionId", `${tmxSessionId}`);

const test = await client.post(url + "/m-benutzer-anmeldung.html", {
  body: form,
  headers: {
    accept: "application/json",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    "cache-control": "no-cache",
    origin: url,
    pragma: "no-cache",
    referer: url + "/m-benutzer-anmeldung.html",
    "x-csrf-token": csrfToken,
    "x-xsrf-token": csrfToken,
  },
  responseType: "text",
});

html = test.body;



console.log(html);
//
