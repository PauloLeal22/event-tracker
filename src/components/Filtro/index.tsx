import React, { useState } from 'react';
import style from './Filtro.module.scss';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';

const Filtro: React.FC = () => {

  const [data, setData] = useState('');
  const [estado, setEstado] = useState<'completos' | 'incompletos' | 'ambos'>('ambos');
  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos);

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const filtro: IFiltroDeEventos = {
      status: estado
    };

    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }

    setFiltroDeEvento(filtro);
  }

  return (
    <form className={style.Filtro} onSubmit={submeterForm}>
      <h3 className={style.titulo}>Filtrar por data</h3>
      <input
        type="date"
        name="data"
        className={style.input}
        onChange={evento => setData(evento.target.value)}
        placeholder="Por data"
        value={data} />

      <div className={style.areaEstados}>
        <input type="radio" name='estado' id='completos' value='completos' onChange={() => setEstado('completos')} />
        <label htmlFor="completos">Completos</label>

        <input type="radio" name='estado' id='incompletos' value='incompletos' onChange={() => setEstado('incompletos')} />
        <label htmlFor="incompletos">Incompletos </label>

        <input type="radio" name='estado' id='ambos' defaultChecked value='ambos' onChange={() => setEstado('ambos')} />
        <label htmlFor="ambos">Ambos</label>
      </div>

      <button className={style.botao}>
        Filtrar
      </button>

    </form>
  )
}

export default Filtro