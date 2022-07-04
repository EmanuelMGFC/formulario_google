const formulario = FormApp.openById("1FTDAl1Bf_lrgHLY5VjJOCyc-yGdz5dz_XfPlNP9Iaz4")
const planilha_estados = SpreadsheetApp.openById("1zfMY_JEjTuh8LbYwbhEXeSUoXBwoIRgXzXZcHZTC27o").getSheetByName("todos_os_estados")
const planilha_cidades = SpreadsheetApp.openById("1zfMY_JEjTuh8LbYwbhEXeSUoXBwoIRgXzXZcHZTC27o").getSheetByName("estados_e_cidades")
const planilhas_respostas = SpreadsheetApp.openById("1_nKSWfEM5mvkhlXak09do2cOiNXgaDW8kwgL7SuLLC0").getSheetByName("Respostas ao formulário ")
const planilha_final = SpreadsheetApp.openById("1_nKSWfEM5mvkhlXak09do2cOiNXgaDW8kwgL7SuLLC0").getSheetByName("representantes")
function addListaEstados() {
  const range_estados = planilha_estados.getRange("A2:B28").getValues()
  var items = formulario.getItems(FormApp.ItemType.PAGE_BREAK);
  const chek = formulario.addListItem()
  let values = []
  for (let contador_estado = 0; contador_estado < range_estados.length; contador_estado++) {
    values.push(chek.createChoice(range_estados[contador_estado]))
  }
  chek.setTitle("Selecione o estado que atua")
  chek.setChoices(values)
}
function addRepresentantes() {
  const range_estados = planilha_estados.getRange("A2:B28").getValues()
  const range_cidades = planilha_cidades.getRange("A2:B").getValues()
  for (let contador_estado = 0; contador_estado < range_estados.length; contador_estado++) {
    let addSection = formulario.addPageBreakItem().setTitle("Selecione as cidades do " + range_estados[contador_estado][0] + " que você atua")
    let contador_cidade_estado = 0
    let item = formulario.addCheckboxItem()
    let range_atual_estado = []
    item.setTitle(range_estados[contador_estado][0])
    for (let contador_cidade = 0; contador_cidade < range_cidades.length; contador_cidade++) {
      if (range_estados[contador_estado][1] == range_cidades[contador_cidade][0]) {
        range_atual_estado[contador_cidade_estado] = range_cidades[contador_cidade]
        contador_cidade_estado++
      }
    }
    item.setChoiceValues(range_atual_estado)
    addSection.setGoToPage(FormApp.PageNavigationType.SUBMIT)
  }
}
function verificar_se_ha_duplicado() {

try{
  const respostas_formulario = formulario.getResponses()
  //ultima resposta
  let ultima_linha_resposta = planilhas_respostas.getLastRow()
  const ultima_resposta = respostas_formulario[ultima_linha_resposta]
  Logger.log(respostas_formulario[0].getItemResponses()[2].getResponse())
  //se indefinido um campo da resposta e tentar acessar da erro
  //se ja existe na planilha resposta buscar na final um nome igual da resposta guardar na constante nome_resposta
  //buscar posição e guardar na variavel posicao_do_revendedor que foi encontrado o nome
  //senão criar no va linha
  //se em toda planilha final tiver alguma pessoa diferente que já tenha alguma cidade da resposta
  //avisar o usuario que já existe alguem com essa cidade e pedir para refazer o formulario ou editar
  //excluir resposta
  //senao mandar respostas para planilha final segundo a variavel posicao_revendedor 

}catch(err){
  Logger.log(err)
}

}