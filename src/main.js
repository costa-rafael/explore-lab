import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

ccBgColor01.setAttribute("fill", "gold")
ccBgColor02.setAttribute("fill", "chocolate")

function setCardType(type) {
  //Criando os arrais (estrutura de dados) para ser trocado conforme o cliente
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    nubank: ["#8A05BE", "#732A8F"],
    default: ["black", "whitesmoke"],
  }

  //
  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
// Para conseguirmos testar no Console >> globalThis.setCardType("nubank");
globalThis.setCardType = setCardType;

//Codigo de segurança (securityCode)
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}

// aqui pegamos a const 
// (securityCode) que vem do html pelo ID + 
// (securityCodePattern) que tem a mascara de 4 digitos
const securityCodeMasked = IMask(securityCode, securityCodePattern);

//Data de expiração do cartao

//(YY) dentro do blocs >> usei o date para pegar o dia completo e corto em 2 com .slice dentro do from e no (to) pego o ANO atual + 10 dando o valor limite também
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

