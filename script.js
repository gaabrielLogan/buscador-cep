function buscarCep() {
    let cep = document.getElementById('cep-input').value.trim();

    document.getElementById('correctResult').innerHTML = '';
    document.getElementById('incorrectResult').innerHTML = '';

    cep = cep.replace('-', '');

    if (!/^\d{8}$/.test(cep)) {
        document.getElementById('incorrectResult').innerHTML = 'CEP inválido. Digite um CEP com 8 dígitos.';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById('incorrectResult').innerHTML = 'CEP não encontrado.';
            } else {
                document.getElementById('correctResult').innerHTML = `
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Cidade: ${data.localidade}</p>
                    <p>Estado: ${data.uf}</p>
                    <p>IBGE: ${data.ibge}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('incorrectResult').innerHTML = 'Erro ao buscar o CEP.';
            console.error('Erro:', error);
        });
};

document.getElementById('cep-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        buscarCep();
    };
});
