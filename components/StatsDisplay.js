import { useEffect, useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native";

// this components displays the stats of the Pokemon 
export default function StatsDisplay(props) {
    // // a stat is an array where the first index is the stat name and the second index is the stat value 
    const [statsList, setStatsList] = useState([]);

    useEffect(() => {
        props.stats.forEach((element) => {
            setStatsList(statsList => 
                [...statsList, [element.stat.name, element.base_stat]])});  
        console.log(statsList.length);
    }, [])

    useEffect(() => {
        console.log(statsList);
        console.log(statsList.length);
    }, [statsList])

    
    return (
        <div className="stats_container">
            <p className="text">Stats:</p>
            {statsList.length == 0 ? <p className="loading">Loading</p> :
                <div className="stats_container">
                    {statsList.map((stat_line) => 
                        // <div key={stat_line[0]} className="stat_line_container">
                        //     <p className="text stat_text">{stat_line[0]}</p>
                        //     <p className="text stat_text">{stat_line[1]}</p>
                        // </div>
                        <StatBar stat_line={stat_line} />
                    )}
                </div>
            }
        </div>
    )
}

// props: stat_line
// displays the statistic bar
function StatBar(props) {
    return ( 
        <div className="stat_bar_div">
            {/* <div className="stat_text_div"> */}
                
                <div className="progress_div" style={{width: `${(props.stat_line[1] / 255) * 100}%` }}> 
                    <div className="stat_text_div">
                        <p className="text stat_text">{props.stat_line[0]}</p>
                        
                    </div> 
                </div>
                <p className="text stat_text">{props.stat_line[1]}</p>
            {/* </div> */}
            
        </div>
    )
}