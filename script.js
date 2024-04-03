//lista de cadastros já existentes
let participantes = [
{
    nome: "Cosme Adão",
    email: "cosme@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 0),
    dataCheckIn: new Date(2024, 3, 2, 10,30)

},
{
    nome: "Cosme Marreiros",
    email: "Marreiros@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 0),
    dataCheckIn: new Date(2024, 3, 2, 20,30)

},
{
    nome: "Josué Adão",
    email: "adao@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 0),
    dataCheckIn: null

},
{
    nome: "Josué Marreiros",
    email: "josuemarr@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 7, 20),
    dataCheckIn: new Date(2024, 3, 4, 7, 25)
}
]

const criarNovosParticipantes = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)

    if(participante.dataCheckIn== null){
        dataCheckIn = `<button onclick="fazerCheckIn(event)" data-email=${participante.email}>
        Confirmar Check-in
        </button>`
    }

    return `<tr>
    <td>
       <strong>${participante.nome}</strong>
       <br>
        <small>${participante.email}</small>
   </td>
   <td>${dataInscricao}</td>
   <td>${dataCheckIn}</td>
</tr>`
}
//atualizando cadastros
const atualizarLista = (participantes) =>{
    let output = ""
    for(let participante of participantes){
         
        output += criarNovosParticipantes(participante)

    }
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)
//adicionado participantes
const adicinarParticipante = (event) =>{
event.preventDefault()

const formData = new FormData(event.target)
//Adicionando cadastro
const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
}
//veriicar se ja tem alguem cadastrado com o mesmo email
const participanteExiste = participantes.find((p)=>p.email == participante.email)

if(participanteExiste){
    return alert("Email já cadastrado")
}
//adicionando no array
participantes=[participante, ...participantes]
atualizarLista(participantes)
//limpeza automatica dos campos
event.target.querySelector('[name="nome"]').value=""
event.target.querySelector('[name="email"]').value=""
}
//confirmação do checkin
const fazerCheckIn = (event) =>{
    const resultado = confirm("Tem certeza de qu quer fazer o Check-in?")
  
    if(resultado == true){
        
   const participante = participantes.find((p)=>{  return p.email == event.target.dataset.email})

   participante.dataCheckIn = new Date()
   atualizarLista(participantes)
    }
    else{
        return
    }


 
}
