document.addEventListener("DOMContentLoaded", function () {
    var element1 = document.getElementById("sidetitulo");
    var element2 = document.getElementById("sidetext1");
    var element3 = document.getElementById("sidetext2");
    var element4 = document.getElementById("sidetext3");
    var image1 = document.getElementById("imageside1");
    var image2 = document.getElementById("imageside2");

    function fade1(el) {
        let opacity = 0;
        let interval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.08;
                el.style.opacity = opacity;

            } else {
                clearInterval(interval);
            }
        }, 50);
    }

    function fade2(el) {
        let opacity = 0;
        let interval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.08;
                el.style.opacity = opacity;

            } else {
                clearInterval(interval);
            }
        }, 35);
    }
    fade1(element1);


    setTimeout(function() {
        fade1(element2);
    }, 1000);

    setTimeout(function() {
        fade2(image1);
    }, 3000);

    setTimeout(function() {
        fade2(image2);
    }, 1000);

    setTimeout(function() {
        fade1(element3);
    }, 2000);

    setTimeout(function() {
        fade1(element4);
    }, 3000);

});

// Função assíncrona para carregar os dados de medalhas
async function loadMedalsData() {
    try {
        // Fazendo a requisição para a API
        const response = await fetch('https://apis.codante.io/olympic-games/countries');
        
        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON: ' + response.statusText);
        }

        // Convertendo a resposta para JSON
        const data = await response.json();

        // Seleciona o corpo da tabela onde os dados serão exibidos
        const tbody = document.getElementById('medals-body');
        if (!tbody) {
            throw new Error('Elemento com ID "medals-body" não encontrado.');
        }
        tbody.innerHTML = ''; // Limpa o conteúdo existente

        // Iterando sobre os resultados e criando as linhas da tabela
        data.data.forEach(result => {  // Assuming data is the correct key from your API response
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img class = "flag" src="${result.flag_url}" style="width: 70px; height: auto;"></td>
                <td>${result.rank}</td>
                <td>${result.name}</td> <!-- Adjust if necessary -->
                <td class = "ouro">${result.gold_medals}</td>
                <td class = "prata">${result.silver_medals}</td>
                <td class = "bronze">${result.bronze_medals}</td>
                <td>${result.total_medals}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        // Captura e exibe erros no console
        console.error('Erro ao carregar dados:', error);
    }
}

// Carregar os dados quando a página for carregada
window.onload = loadMedalsData;
