import { useEffect, useState } from "react"
import { StyleSheet, View, Text } from 'react-native';

// this components displays the stats of the Pokemon 
export default function StatsDisplay(props) {
    // // a stat is an array where the first index is the stat name and the second index is the stat value 
    const [statsList, setStatsList] = useState([]);

    useEffect(() => {
        props.stats.forEach((element) => {
            setStatsList(statsList => 
                [...statsList, [element.stat.name, element.base_stat]])});  
    }, [])

    // return (
    //     <View style={styles.stats_container}>
    //         <Text style={[styles.text, styles.subsection_heading]}>Stats:</Text>
    //         {statsList.length == 0 ? <p style={styles.loading}>Loading</p> :
    //             <View style={styles.stats_container}>
    //                 {statsList.map((stat_line) => 
    //                     <StatBar key={stat_line[0]} stat_line={stat_line} />
    //                 )}
    //             </View>
    //         }
    //     </View>
    // )

    return (
        <div className="stats_container">
            <p className="text">Stats:</p>
            {statsList.length == 0 ? <p className="loading">Loading</p> :
                <div className="stats_container">
                    {statsList.map((stat_line) => 
                        <StatBar key={stat_line[0]} stat_line={stat_line} />
                    )}
                </div>
            }
        </div>
    )
}

// props: stat_line
// displays the statistic bar
function StatBar(props) {
    // return ( 
    //     <View style={styles.stat_bar_div}>
    //         <View style={styles.progress_div}> 
    //             <View style={[styles.stat_text_div, {width: `${(props.stat_line[1] / 255) * 100}%` }]}>
    //                 <Text style={[styles.text, styles.stat_text]}>{props.stat_line[0]}</Text>
    //             </View> 
    //         </View>
    //         <Text style={[styles.text, styles.stat_text]}>{props.stat_line[1]}</Text>
    //     </View>
    // )

    return ( 
        <div className="stat_bar_div">
            <div className="progress_div" style={{width: `${(props.stat_line[1] / 255) * 100}%` }}> 
                <div className="stat_text_div">
                    <p className="text stat_text">{props.stat_line[0]}</p>
                    
                </div> 
            </div>
            <p className="text stat_text">{props.stat_line[1]}</p>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "Verdana",
        fontSize: 14,
    },
    image: {
        aspectRatio: 1 / 1,
        maxWidth: 300,
        maxHeight: 300,
        mixBlendMode: "multiply",
        backgroundColor: "gainsboro",
        borderRadius: 15,
    },
    text_info_container: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    stats_container: {
        display: "flex",
        flexDirection: "column",
    },
    stat_line_container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    subsection_heading: {
        fontFamily: "Verdana",
        fontWeight: "600",
        fontSize: 28,
        margin: 5,
    },
    stat_bar_div: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 5, 
        borderColor: "grey",
        padding: 5,
        margin: 3,
    },
    progress_div: {
        backgroundColor: "lightgreen",
        width: "100%",
        paddingVertical: 3,
    },
    stat_text: {
        marginVertical: 1,
        marginHorizontal: 3,
        fontSize: 20,
    },
    stat_text_div: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    "@media (max-width: 700px)": {
        pokedex_details: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
        },
    },
});