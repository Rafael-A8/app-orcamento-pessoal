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

    validarDados() {
        for(let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id') // null
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {

        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperando todoas as despesas cadastradas no banco de dados
        for(let i = 1; i <= id; i++) {
            
            //recuperando a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            
            //existe a possibilidade de haver índices que foram pular /removido
            if (despesa === null) {
                continue
            }
            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd()

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
    
    if(despesa.validarDados()) {
        
        bd.gravar(despesa)
        document.getElementById('modal_titulo').innerHTML = 'Registro Inserido com Sucesso!!'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi Cadastrada com Sucesso!'
        document.getElementById('modal_btn').innerHTML ='Voltar'
        document.getElementById('modal_btn').className ='btn btn-success'
        
        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
    } else {
         
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do Registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na Gravação, verifique se todos os campos foram preenchidos corretamente.'
        document.getElementById('modal_btn').innerHTML ='Voltar e corrigir'
        document.getElementById('modal_btn').className ='btn btn-danger'

        //dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
    
}

function carregaListasDespesas() {
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    //Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    /*<tr>
    <td>15/03/2018</td>
    <td>alimentação</td>
    <td>compras</td>
    <td>500</td>
    </tr>
    */

    //percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {


        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas para inserir valores
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}` 

        //ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Trasporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao 
        linha.insertCell(3).innerHTML = d.valor

    })
    
}

