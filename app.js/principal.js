class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        //atribuindo valores aos atributos do objeto despesa
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
}

//recebimento dos dados
function cadastrarDespesa() {

    //busca dos elementos atraves do id no html, trazendo assim seus valores para as variaveis 
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //atribuindo a instancia do objeto despesa
    //recebendo valores
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    console.log(despesa)
}