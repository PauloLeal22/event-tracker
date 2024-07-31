import { selector } from "recoil";
import { filtroDeEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        const filtro = get(filtroDeEventos);
        const todosOsEventos = get(listaDeEventosState);

        const eventos = todosOsEventos.filter(evento => {
            if (!filtro.data) {
                if (filtro.status === 'ambos') {
                    return true;
                } else {
                    if ((filtro.status === 'completos' && evento.completo) || (filtro.status === 'incompletos' && !evento.completo)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        
            const mesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);

            let mesmoStatus;
            if (filtro.status === 'ambos') {
                mesmoStatus = true;
            } else {
                if ((filtro.status === 'completos' && evento.completo) || (filtro.status === 'incompletos' && !evento.completo)) {
                    mesmoStatus = true;
                } else {
                    mesmoStatus = false;
                }
            }
            
            return mesmoDia && mesmoStatus;
        });

        return eventos;
    }
});

export const eventosAsync = selector({
    key: 'eventosAsync',
    get: async () => {
        const respostaHttp = await fetch('http://localhost:8080/eventos');

        const eventosJson: IEvento[] = await respostaHttp.json();

        return eventosJson.map(evento => ({
            ...evento,
            inicio: new Date(evento.inicio),
            fim: new Date(evento.fim)
        }));
    }
});
