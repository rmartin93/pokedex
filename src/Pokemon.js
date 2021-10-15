import { useState } from "react";
import useFetch from "./useFetch";

const Pokemon = () => {
    const {data, spinner, error } = useFetch('http://localhost:9000/pokemon') 
    const [pokemon, setPokemon] = useState({
        id: 1, 
        name: 'Bulbasaur', 
        type: 'Grass, Poison',
        img: './images/001.png',
        hp: 45,
        attack: 49,
        defense: 49,
        spa: 65,
        spd: 65,
        speed: 45
    }) 
    
    const handlePokeSelect = (e) => {     
        let newPokemon = parseInt(e.target.value)
        let x = 0;
        for(x=0; x<data.length; x++) {
            if(data[x].id === newPokemon) { 
                let t = 0;
                var types = ''
                for(t=0; t< data[x].type.length; t++) {
                    if(t>0) {
                        types += ', '
                    }                   
                    types += data[x].type[t]
                }
                if(data[x].id < 10) { var imageNumber = '00' + data[x].id } else if(data[x].id < 100) { imageNumber = '0' + data[x].id } else { imageNumber =  data[x].id }
                setPokemon({
                    id: data[x].id,
                    name: data[x].name.english,
                    img: './images/' + imageNumber +'.png',
                    type: types,
                    hp: data[x].base.HP,
                    attack: data[x].base.Attack,
                    defense: data[x].base.Defense,
                    spa: data[x].base["Sp. Attack"],
                    spd: data[x].base["Sp. Defense"],
                    speed: data[x].base.Speed
                })                
            }
        }
    }
    return (
        <section>            
            <div className="pokemon">
                <h2>Pokedex - OG 150</h2>                
                { error && <section><div> {error} </div></section> }
                { spinner && 
                    <section>
                        <div className="charmander-spinner">
                            <img src="./charmander-chasing-tail.gif" alt="Charmander Chasing Tail" />
                        </div>
                    </section> 
                }
                { data && 
                    <div>
                        <div className="pokedex">
                            <div className="pokedex-btns">
                                <div className="btn btn-1">
                                    <div className="btn-shine"></div>
                                </div>
                                <div className="btn btn-2">
                                    <div className="btn-shine"></div>
                                </div>
                                <div className="btn btn-3">
                                    <div className="btn-shine"></div>
                                </div>
                            </div>
                            <div className="pokedex-screen">
                                <img src={pokemon.img} alt={pokemon.name} />
                                <h3>{pokemon.name}</h3>
                                <div className="pokemon-types">
                                    <p>{pokemon.type}</p>
                                </div> 
                            </div> 
                            <div className="pokedex-bottom">
                                <div className="pokedex-stats">
                                    <ul>
                                        <li>
                                            <span>HP </span> 
                                            <span>{pokemon.hp}</span>
                                        </li>
                                        <li>
                                            <span>Attack </span> 
                                            <span>{pokemon.attack}</span>
                                        </li>
                                        <li>
                                            <span>Defense </span> 
                                            <span>{pokemon.defense}</span>
                                        </li>
                                        <li>
                                            <span>Spec. Att </span> 
                                            <span>{pokemon.spa}</span>
                                        </li>
                                        <li>
                                            <span>Spec. Def </span> 
                                            <span>{pokemon.spd}</span>
                                        </li>
                                        <li>
                                            <span>Speed </span> 
                                            <span>{pokemon.speed}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="pokedex-controls">
                                    <img src="./pokedex-logo.png" alt="Pokedex" />
                                    <div className="pokedex-toggle">
                                        <select onChange={handlePokeSelect}>
                                            {data && data.map((p) => (                    
                                                <option key={p.id} name={p.name.english} value={p.id}>{p.name.english}</option>                  
                                            ))}
                                        </select> 
                                        <div className="poke-bs"></div>
                                    </div>
                                </div>
                            </div>                          
                        </div>
                    </div>
                }
            </div>
        </section>
    );
}
 
export default Pokemon;