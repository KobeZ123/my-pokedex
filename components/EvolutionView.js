import { useState, useEffect } from "react";

import { BASE_API_URL } from "../utils/constants";

// displays the pokemon's evolutionary line 
// props: url, selected
export default function EvolutionView(props) {

    // stores pokemon evolution names in arrays [0: basic, 1: stage 1, 2: stage 2]
    const [evolutionNames, setEvolutionNames] = useState({});
    const [evolutionData, setEvolutionData] = useState({});

    // fetches the evolution data
    const fetchData = () => {
        fetch(props.url).then(response => {
            return response.json();
        }).then(data => {
            // recursive function: given the evolution entry, adds to evolutionData 
            const addToLevel = (counter, evolutionEntry) => {
                if ((counter in evolutionNames) == false) {
                    evolutionNames[counter] = []
                }
                evolutionNames[counter].push({name: evolutionEntry.species.name});
                if (evolutionEntry.evolves_to.length > 0) {
                    counter = counter + 1;
                    evolutionEntry.evolves_to.forEach(entry => {
                        addToLevel(counter, entry);
                    });
                }
            }
            let counter = 0;
            addToLevel(counter, data.chain);
            setEvolutionNames({ ...evolutionNames});
        });
    };

    // maps pokemon id and image data for evolutions  
    const fetchEvolutionData = () => {
        let evolutionDataTemp = evolutionNames
        Object.keys(evolutionDataTemp).forEach(key => {
            evolutionDataTemp[key].forEach(entry => {
                fetch(`${BASE_API_URL}/pokemon/${entry.name}`).then(response => {
                    return response.json();
                }).then(data => {
                    entry["image_url"] 
                        = data.sprites.other["official-artwork"].front_default;
                    entry["id"] = data.id;
                    setEvolutionData({...evolutionDataTemp});
                });
            });
            
        });
    }

    // fetches evolution data 
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchEvolutionData();
    }, [evolutionNames])

    return (
        <div className="stages_container">
            <p className="subsection_heading">Evolutions</p>
            <div className="evolutions_container">     
                {Object.values(evolutionData).map((stage, index) =>
                    <div key={index} className="evolution_container">
                        {stage.map((entry) => 
                            <div key={entry.name} className="evolution_container">
                                <img className="evolution_img" src={entry.image_url}/> 
                                <p className="text">{entry.name}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}