// displays the pokemon's evolutionary line 
export default function EvolutionView(url) {

    const [evolutionData, setEvolutionData] = useState({});

    const fetchData = () => {
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            // recursive function: given the evolution entry, adds to evolutionData 
            const addToLevel = (counter, entry) => {
                if (!counter.toString() in evolutionData) {
                    evolutionData[counter] = []
                }
                evolutionData[counter].push(entry.species.name);
                while (currentData.evolves_to.length > 0) {
                    counter = counter + 1;
                    currentData.evolves_to.forEach(entry => {
                        addToLevel(counter, entry);
                    });
                }

            }
            let counter = 0;
            // evolutionData[counter] = [];
            // let currentData = data.chain;
            addToLevel(counter, data.chain);
            // evolutionData[counter].push(currentData.species.name)
            // while (currentData.evolves_to.length > 0) {
            //     counter = counter + 1;
            //     currentData.evolves_to.forEach(entry => {
            //         addToLevel(counter, entry);
            //     });
            // }

        });
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>

        </div>
    );
}