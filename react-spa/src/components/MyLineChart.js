import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function processData(inputData, displayFilter, userHP, userBI, userBII) {
  try {
    var outputData = [];
    console.log(inputData);

    var startMyLinesLaid = false;

    if (inputData.length > 0) {

      var year;
      var endYear = new Date().getFullYear() + 1;
      for (year = 2009; year < endYear; year++) {

        var term;
        for (term = 0; term < 2; term++){
          var item = "not found";

          if(term === 0){
            // VT
            item = inputData[2].find(element => element[0] === year);
          } else {
            // HT
            item = inputData[1].find(element => element[0] === year);
          }

          //console.log(item);

          if(item === "not found" || item === undefined) {
            continue;
          }

          var data_points = {
            name:item[1] + " " + item[0],
          };
    
          if(parseFloat(item[2]) !== 'NaN' && displayFilter.includes("BI")) data_points["BI"] = parseFloat(item[2]);
          if(parseFloat(item[3]) !== 'NaN' && displayFilter.includes("BII")) data_points["BII"] = parseFloat(item[3]);
          if(parseFloat(item[4]) !== 'NaN' && displayFilter.includes("HP")) data_points["HP"] = parseFloat(item[4]);

          // Add user values if they are valid
          if(startMyLinesLaid === false) {
            startMyLinesLaid = true;
            if(userHP !== undefined) {
              console.log(userHP.replace(',', '.'));
              data_points["Ditt HP"] = parseFloat(userHP.replace(',', '.'));
            }
            if(userBI !== undefined) {
              data_points["Ditt BI"] = parseFloat(userBI.replace(',', '.'));
            }
            if(userBII !== undefined) {
              data_points["Ditt BII"] = parseFloat(userBII.replace(',', '.'));
            }
          }
          
          console.log(data_points);
          outputData.push(data_points);
        }
      }
      
      // Add user values if they are valid
      if(userHP !== undefined) {
        outputData[outputData.length - 1]["Ditt HP"] = parseFloat(userHP.replace(',', '.'));
      }
      if(userBI !== undefined) {
        outputData[outputData.length - 1]["Ditt BI"] = parseFloat(userBI.replace(',', '.'));
      }
      if(userBII !== undefined) {
        outputData[outputData.length - 1]["Ditt BII"] = parseFloat(userBII.replace(',', '.'));
      }

      return outputData;
    } else {
      
    }
  } catch (error) {
    console.log(error);
    return inputData;
  }
  
}




export default function MyLineChart(props) {
  return (
    <LineChart
      width={props.width}
      height={320}
      data={processData(props.programData, props.displayFilter, props.userHP, props.userBI, props.userBII)}
      margin={{
        top: 10,
        right: 15,
        left: 0,
        bottom: 15
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={0} angle={-26} height={70} dx={-15} dy={10} fontSize={10}/>
      <YAxis yAxisId="left" domain={['auto', 'auto']}/>
      <Tooltip />
      <Legend />
      {props.displayFilter.includes("BI") &&
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="BI"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      }
      {props.displayFilter.includes("BII") &&
        <Line yAxisId="left" type="monotone" dataKey="BII" stroke="#82ca9d" />
      }
      
      {props.displayFilter.includes("HP") &&
        <Line yAxisId="left" type="monotone" dataKey="HP" stroke="orange" />
      }
      {props.displayFilter.includes("HP") &&
        <Line connectNulls yAxisId="left" type="monotone" dataKey="Ditt HP" stroke="red" dot={{r: 3}} strokeWidth="6"/>
      }
      {props.displayFilter.includes("BI") &&
        <Line connectNulls yAxisId="left" type="monotone" dataKey="Ditt BI" stroke="red" dot={{r: 3}} strokeWidth="6"/>
      }
      {props.displayFilter.includes("BII") &&
        <Line connectNulls yAxisId="left" type="monotone" dataKey="Ditt BII" stroke="red" dot={{r: 3}} strokeWidth="6"/>
      }
    </LineChart>
  );
}