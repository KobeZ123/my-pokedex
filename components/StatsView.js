import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native";

// this components displays the stats of the Pokemon 
function PokemonStatsDisplay(props) {
    // // a stat is an array where the first index is the stat name and the second index is the stat value 
    const [statsList, setStatsList] = useState([]);

    useEffect(() => {
        props.stats.forEach((element) => {
            setStatsList(statsList => [...statsList, [element.stat.name, element.base_stat]]);
            console.log([element.stat.name, element.base_stat]);
            console.log(statsList);
        });
        console.log(statsList.length);
    }, [])

    useEffect(() => {
        console.log(statsList);
        console.log(statsList.length);
    }, [statsList])

    
    return (
        <View style={styles.centered_container}>
            <Text style={styles.statistic_font}>Stats:</Text>
            {statsList.length == 0 ? <Text style={styles.loading}>Empty</Text> :
                <View>
                    {statsList.map((stat_line) => 
                        <View style={styles.stat_line_container}>
                            <Text style={styles.ability_text}>{stat_line[0]}</Text>
                            <Text style={styles.ability_text}>{stat_line[1]}</Text>
                        </View>
                    )}
                </View>
            }
        </View>
    )
}