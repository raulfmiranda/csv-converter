const CSVToJson = require('csvtojson');
const fileName = "project_data.csv";

CSVToJson({delimiter: "auto"}).fromFile(`./${fileName}`).then(source => {
    let tasks = [];
    let groups = [];
    let requirementNames = [];

    source.map(s => {
        const requirementName = s['REQUIREMENT NAME'];
        const hrs = s['Hrs'];
        
        tasks.push( { requirementName, hrs } );

        if(!requirementNames.includes(requirementName)) {
            requirementNames.push(requirementName);
        }
    });

    requirementNames.map(reqName => {
        groups.push(tasks.filter(task => (task.requirementName === reqName)));
    });

    const prediction = makePrediction(groups);
    console.log(prediction);
});

const makePrediction = (groups) => {

    let predictionGroups = [];

    for(let i = 0; i < groups.length; i++) {
        let gi = groups[i]; 
        let mean = Math.round(gi.reduce((total, g) => total + parseFloat(g.hrs), 0) / gi.length);
        predictionGroups.push([gi[0].requirementName, mean]);
    }
    return predictionGroups;
}