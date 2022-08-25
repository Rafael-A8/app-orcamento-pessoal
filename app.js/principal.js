

//recebimento dos dados
function cadastrarDespesa() {

    //busca dos elementos atraves do id no html, trazendo assim seus valores para as variaveis 
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //recuperando o valor do elemento html
    console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
}