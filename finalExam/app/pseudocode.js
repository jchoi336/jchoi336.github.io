//should use the Mongoose schema defined previously
const db = require("../models");
const Definition = db.definitions;
//should use POST because changing data not just retrieving 
app.post("/checkDB", function (req, res) {
    //make query from searchword
    const searchword = req.params.word;
    const query = { searchword: searchword };
    
    //connect to MongoDB database
    (...)
    //search definitions collection using query
    collection("definitions").find(query).toArray(function(err, result){
        //case where no match, returning result will be an empty array
        if (result == []){
            //make the API call to retrieve JSON and store appropriate parts of 
            //JSON 
            (...)
            var data = JSON file;
            //create new definition object to be put in database
            const definition = new Definition({
                word: data.word,
                def: data.def,
                image: data.image
            });
            // Save Definition in the database
            definition
            .save(definition)
            // process the JSON data for rendering in HTML similar
            //to how it was in search.ejs jQuery code
            .then(data => {
                res.render('dictionary', {
                    word: htmlword,
                    text: htmldef,    
                    image: htmlimage
                })
            })
        }
        // case where the searched word is found in the database
        else{
            //make variable for current time and last updated time from 
            //definition in database
            var current;
            var lastupdated;
            //compare current time with last update time from found entry
            //if difference is too big
            if(current - lastupdated > 10 minutes){
                //delete the existing database entry
                dbo.collection("definitions").deleteOne(query, function(err, obj) {}
                //execute the same code as the above case where no match was 
                //found in database to retrieve JSON and render data
                (...)
            }
            // case where matching word was found in database and entry is fresh 
            //enough to be rendered
            else{
                //process JSON to be rendered in HTML
                //similar to jQuery code in search.ejs
                (...)
                res.render('dictionary', {
                    word: htmlword,
                    text: htmldef,    
                    image: htmlimage
                })
            }
        }
    }
});