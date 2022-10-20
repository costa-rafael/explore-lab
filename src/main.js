import "./css/index.css"

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
globalThis.setCardType = setCardType
