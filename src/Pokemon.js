import { useState } from "react";
import useFetch from "./useFetch";

const Pokemon = () => {
	const { data } = useFetch("http://localhost:3000/data/db.json");

	const [pokemon, setPokemon] = useState({
		id: 1,
		name: "Bulbasaur",
		type: "Grass, Poison",
		img: "./images/001.png",
		hp: 45,
		attack: 49,
		defense: 49,
		spa: 65,
		spd: 65,
		speed: 45,
	});

	const handlePokeSelect = (e) => {
		let newPokemon = parseInt(e.target.value);
		let x = 0;
		for (x = 0; x < data.pokemon.length; x++) {
			if (data.pokemon[x].id === newPokemon) {
				let t = 0;
				var types = "";
				for (t = 0; t < data.pokemon[x].type.length; t++) {
					if (t > 0) {
						types += ", ";
					}
					types += data.pokemon[x].type[t];
				}
				if (data.pokemon[x].id < 10) {
					var imageNumber = "00" + data.pokemon[x].id;
				} else if (data.pokemon[x].id < 100) {
					imageNumber = "0" + data.pokemon[x].id;
				} else {
					imageNumber = data.pokemon[x].id;
				}
				setPokemon({
					id: data.pokemon[x].id,
					name: data.pokemon[x].name.english,
					img: "./images/" + imageNumber + ".png",
					type: types,
					hp: data.pokemon[x].base.HP,
					attack: data.pokemon[x].base.Attack,
					defense: data.pokemon[x].base.Defense,
					spa: data.pokemon[x].base["Sp. Attack"],
					spd: data.pokemon[x].base["Sp. Defense"],
					speed: data.pokemon[x].base.Speed,
				});
			}
		}
	};
	if (!data) {
		return (
			<section>
				<div className="charmander-spinner">
					<img
						src="./charmander-chasing-tail.gif"
						alt="Charmander Chasing Tail"
					/>
				</div>
			</section>
		);
	}
	return (
		<section>
			<div className="pokemon">
				<h2>Pokedex - OG 150</h2>
				{data.pokemon && (
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
											{data.pokemon &&
												data.pokemon.map((p) => (
													<option key={p.id} name={p.name.english} value={p.id}>
														{p.name.english}
													</option>
												))}
										</select>
										<div className="poke-bs"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Pokemon;
