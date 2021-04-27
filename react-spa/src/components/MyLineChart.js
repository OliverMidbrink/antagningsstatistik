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

function processData(inputData) {
  var outputData = [];
  console.log(inputData);

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

        console.log(item);

        if(item === "not found" || item === undefined) {
          continue;
        }

        var data_points = {
          name:item[1] + " " + item[0],
        };
  
        if(parseFloat(item[2]) !== 'NaN') data_points["BI"] = parseFloat(item[2]);
        if(parseFloat(item[3]) !== 'NaN') data_points["BII"] = parseFloat(item[3]);
        if(parseFloat(item[4]) !== 'NaN') data_points["HP"] = parseFloat(item[4]);
  
        outputData.push(data_points);
      }
    }

    return outputData;
  } else {
    return inputData;
  }
}




export default function MyLineChart(props) {
  return (
    <LineChart
      width={props.width}
      height={320}
      data={processData(props.programData)}
      margin={{
        top: 15,
        right: 15,
        left: 0,
        bottom: 15
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" interval={2} angle={40} height={70} dx={23} dy={20}/>
      <YAxis yAxisId="left" domain={['auto', 'auto']}/>
      <YAxis yAxisId="right" orientation="right" domain={['dataMin-0.2', 'auto']} />
      <Tooltip />
      <Legend />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="BI"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line yAxisId="left" type="monotone" dataKey="BII" stroke="#82ca9d" />
      <Line yAxisId="right" type="monotone" dataKey="HP" stroke="orange" />
    </LineChart>
  );
}