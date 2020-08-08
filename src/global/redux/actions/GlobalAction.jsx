//export const SALVAR_PESSOA = 'SALVAR_PESSOA'
export const ATUALIZAR_CAMPO = 'ATUALIZAR_CAMPO';

export const onChangeField = (ev, id) =>(        
    {
        type: ATUALIZAR_CAMPO,
        payload: ev.target.value,
        id
    }
);

// export const salvarPessoa = pessoa =>({
//     type: SALVAR_PESSOA,
//     payload: pessoa
// })