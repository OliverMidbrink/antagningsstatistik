import React from "react";

const mean = (array) => {
    if (array.length > 0) {
        return array.reduce((a, b) => a + b) / array.length;
    } else {
        return undefined;
    }
};

function standardDeviation(values){
    if(values.length === 0) {
        return undefined;
    }
    var avg = mean(values);
    
    var squareDiffs = values.map(function(value){
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });
    
    var avgSquareDiff = mean(squareDiffs);
  
    var stdDev = Math.sqrt(avgSquareDiff);

    if(parseFloat(stdDev) === 'NaN') {
        return undefined;
    } else {
        return stdDev;
    }
  }

function calculateAdmissionChances(programData, userBI, userHP, userBII, displayFilter) {
    try {
        var HTData = [];
        var VTData = [];

        var relevantUserMetric = undefined;
        if(userBI !== undefined) relevantUserMetric = userBI;
        if(userHP !== undefined) relevantUserMetric = userHP;
        if(userBII !== undefined) relevantUserMetric = userBII;

        if (programData.length > 0) {
            var year;
            var endYear = new Date().getFullYear() + 1;
            for (year = 2009; year < endYear; year++) {

            var term;
            for (term = 0; term < 2; term++){
                var item = "not found";

                if(term === 0){
                    // VT
                    item = programData[2].find(element => element[0] === year);
                } else {
                    // HT
                    item = programData[1].find(element => element[0] === year);
                }

                console.log(item);

                if(item === "not found" || item === undefined) {
                    continue;
                }

                var data_points = {
                    name:item[1] + " " + item[0],
                };

                if(parseFloat(item[2]) !== 'NaN' && item[2] !== "*") data_points["BI"] = parseFloat(item[2]);
                if(parseFloat(item[3]) !== 'NaN' && item[3] !== "*") data_points["BII"] = parseFloat(item[3]);
                if(parseFloat(item[4]) !== 'NaN' && item[4] !== "*") data_points["HP"] = parseFloat(item[4]);

                if(item[2] === '*') data_points["BI"] = 0;
                if(item[3] === '*') data_points["BII"] = 0;
                if(item[4] === '*') data_points["HP"] = 0;
                
                if(term === 0) {
                    VTData.push(data_points[displayFilter[0]]);
                }
                if(term === 1) {
                    HTData.push(data_points[displayFilter[0]]);
                    console.log(data_points[displayFilter[0]]);
                }
            }
            }
            console.log(HTData);
            console.log(VTData);
            console.log(displayFilter[0]);

            const meanHT = mean(HTData.slice(HTData.length - 3, HTData.length)); // Average of last 3 values
            const meanVT = mean(VTData.slice(VTData.length - 3, VTData.length));

            const stdHT = standardDeviation(HTData);
            const stdVT = standardDeviation(VTData);

            console.log("DATA");
            console.log(meanHT);
            console.log(meanVT);
            console.log(stdHT);
            console.log(stdVT);
            console.log(relevantUserMetric);

            var message = "";

            if(relevantUserMetric === "") {
                return "fyll i rutan ovan för bedömning";
            }

            if (meanHT !== undefined){
                if(relevantUserMetric > meanHT + stdHT) {
                    message += "goda för HT"
                } else if(relevantUserMetric < meanHT - stdHT) {
                    message += "låga för HT"
                } else {
                    message += "medel för HT"
                }
            }

            if (meanVT !== undefined){
                if (meanHT !== undefined){
                    message += " och "
                } 

                if(relevantUserMetric > meanVT + stdVT) {
                    message += "goda för VT"
                } else if(relevantUserMetric < meanVT - stdVT) {
                    message += "låga för VT"
                } else {
                    message += "medel för VT"
                }
            }

            return message;
        } else {
            
        }
    } catch (error) {
        console.log(error);
        return "fyll i dina uppgifter för bedömning";
    }
}

export default function AdmissionChanceIndicator(props) {
  return (
      <div style={{paddingLeft:"2em", paddingRight: "2em", alignItems: "center", justifyContent: "center"}}>
          <p style={{textAlign: "center",}}>Dina antagningschanser med {props.displayFilter} är:</p>
          <p style={{textAlign: "center",}}><b>{calculateAdmissionChances(props.programData, props.userBI, props.userHP, props.userBII, props.displayFilter)}</b></p>
      </div>
  );
}