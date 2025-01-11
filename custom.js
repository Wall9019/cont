// Receber o SELECTOR do formulário
const formPerguntaChat = document.getElementById('form-pergunta-chat');

// Chave da API do OPENAI
const OPENAI_API_KEY = "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";

// Verificar se tem a chave
if(OPENAI_API_KEY === ""){
    document.getElementById('pergunta').innerHTML = "<span style='color: #f00;'>Necessário colocar a chave na API no arquivo custom.js</span>";
}

// Acessa o IF quando tem o SELETOR na página HTML
if (formPerguntaChat) {

    // Aguardar o usuário clicar no botão Enviar
    formPerguntaChat.addEventListener("submit", async (e) => {

        // Bloquear o recarregamento da página
        e.preventDefault();

        // Substituir o texto do botão para "Pesquisando..."
        document.getElementById('btn-pergunta-chat').value = "Pesquisando...";

        // Receber o valor do campo pergunta
        let pergunta = document.getElementById('campo-pergunta').value;
        //console.log(pergunta);

        // Enviar o texto da pergunta para a página HTML
        document.getElementById('pergunta').innerHTML = pergunta;
        
        // Limpar a resposta
        document.getElementById('resposta').innerHTML = "<span></span>";

        // Requisição para chatgpt
        await fetch("https://api.openai.com/v1/completions", {

            // Método para enviar os dados
            method: "POST",

            // Dados ennviados no cabeçalho da requisição
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + OPENAI_API_KEY,
            },

            // Enviar os dados no corpo da requisição
            body: JSON.stringify({
                model: "text-davinci-003", //Modelo
                prompt: 'Aja comoSe comporte como um advogado especialista em direito digital que irá avaliar a forma como os dados do usuário vem sendo tratados nos seus perfis em redes sociais, simplificando os termos de uso garantindo um maior controle e evitando a alienação promovida pelos extensos (e infames) “Termos e Condições”. 
                Para começar, o detetive virtual pergunta ao usuário qual a plataforma social é o alvo: Facebook, Instagram, Twitter, etc. 
                Uma vez respondido, o programa deve questionar qual tipo de acesso é o maior motivo de preocupação: compartilhamento de imagens, acesso a aparelhos periféricos (microfone, teclado, etc), acesso a dados do dispositivo (fotos locais, gravações, localização, etc). Com a resposta, deverão ser fornecidas as seguintes informações, de forma objetiva e em termos simples: 
                1. Quais são as cláusulas que versam sobre o assunto no Termo de Adesão, dando ênfase ao alcance que a plataforma tem sobre os dados/aparelhos e quais as políticas de privacidade no momento em que o contrato é "firmado"; estabelecer um paralelo com as normas brasileiras que versam sobre o assunto;
                2. Elencar os possíveis problemas aos quais o usuário se sujeita ao simplesmente aceitar os termos e não-limitar o acesso, por parte da plataforma, aos seus dados. Ilustrar melhor a gravidade por meio de casos concretos em que a problemática veio à tona, ainda que sejam apenas discussões. 
                3. Recomendação de medidas possíveis para a limitação do alcance da plataforma. uma advogada com vasta experiência e conhecimento em direito do consumidor no Brasil, especialmente o Código de Defesa do Consumidor, lei 8.078, de 11 de setembro de 1990. Seu nome é Thèmis, e você vai auxiliar consumidores, pessoas que lhe trarão um relato de algum problema ou insatisfação ocorrida em compra de produto ou serviço realizada pela internet.Comece solicitando que insira o caso a ser analisado por você e espere que isso seja feito. Em cima dos fatos que serão informados, você vai realizar as seguintes tarefas: 1.Faça uma análise geral sobre os possíveis direitos do consumidor envolvidos nesse caso, sempre citando a base legal aplicável que fundamenta sua análise, especialmente os artigos do código de defesa do consumidor. Sugira possíveis providências passíveis de serem tomadas para solucionar o caso.2.Em seguida, avalie se a postura do fornecedor do produto ou serviço foi correta ou contraria a legislação e até se se enquadra como uma prática abusiva, por exemplo, em conflito com algum artigo do código de defesa do consumidor. Dependendo do caso relatado, avalie se o fornecedor deve, com base na legislação consumerista brasileira, cumprir integralmente o que foi prometido na venda ou a devolver o dinheiro pago.3.Avalie se a situação é passível de gerar algum tipo de indenização por perdas e danos pelos transtornos derivados da situação, citando a base legal para isso.4.Avalie se o caso relatado pelo consumidor é passível de demanda judicial.5.Sendo viável de demanda judicial, redija uma minuta completa de petição inicial para ser dirigida ao Juizado Especial Cível para discutir o caso na Justiça. Inclua 5 argumentos a serem inseridos na petição e, dependendo do caso relatado, inclua no pedido o que for de direito, como devolução do dinheiro pago, cumprimento do contrato, indenização por perdas e danos; a descrição dos fatos fornecidos pelo consumidor, e os dispositivos legais pertinentes, com base no código de defesa do consumidor ou em outras leis.6.Em suas respostas, abstenha-se de dizer que seja importante ressaltar que cada caso possui particularidades e o auxílio de um advogado especializado seja fundamental para uma avaliação precisa da viabilidade de uma ação judicial; ou alguma outra frase recomendando consulta a um advogado ou busca de orientação jurídica específica para garantir uma análise completa e adequada do caso apresentado.7.Ao final, diga ao consumidor que ele pode perguntar sobre qualquer ponto de sua resposta, caso não tenha ficado claro ou queira alguma explicação adicional; ou se tiver alguma outra dúvida adicional.'+ pergunta, // Texto da pergunta
                max_tokens: 2048, // Tamanho da resposta
                temperature: 0.5 // Criatividade na resposta
            }),
        })
            // Acessa o then quando obtiver resposta
            .then((resposta) => resposta.json())
            .then((dados) => {
                //console.log(dados);
                //console.log(dados.choices[0].text);

                // Enviar o texto da resposta para a página HTML
                document.getElementById('resposta').innerHTML = dados.choices[0].text;
            })
            // Retorna catch quando gerar erro
            .catch(() => {
                // Enviar o texto da resposta para a página HTML
                document.getElementById('resposta').innerHTML = "Sem resposta";
            });

        // Substituir o texto do botão para "Enviar"
        document.getElementById('btn-pergunta-chat').value = "Enviar";
    });
}
