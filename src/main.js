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

//Visa
//Inica com 4 seguido de + 15 digitos
//412345 12345 12345 
//^4/{0-15}

//master
// inicia com 5, seguido de um digito entre 1 e 5, seguido de 0 ou 2 digitos
//ou
// inicia com 22, seguido de um digito entre 2 e 9, seguido de 0 ou 1 digito
//ou
//inicia com 2, seguido de um digito entre 3 e7, seguido de 0 ou 2 digitos
// seguido de mais 12 digitos


const cardNumber = document.querySelector("#card-number")

const cardNumerPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "master",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "nubank",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMask.find(function(item{
      return number.match(item.regex)
    }))
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumerPattern)