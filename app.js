const express=require('express');
const app =express();
   app.use(express.json());



   const Joi =require('joi');
const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Crime"},
    {id: 4, name: "Sci-Fi"},
    {id: 5, name: "Anime"}
];
//validate function to check input from user sebt to backend 
async function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    try {
        return await schema.validateAsync(genre);
    } catch (error) {
        return { error };
    }
}
//get req for getting homepage
app.get('/',(req,res)=>{

res.send('This is home page for Vidly API service');

});
app.get('/api/genres',(req,res)=>{

    res.send(genres);
});
//get request to get the genre info in html webpage 
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Genre Not Found');
    res.send(genre);
  });
//post request to post new genre 

app.post('/api/genres',(req,res)=>{
    const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);
      const genre ={
        id: genres.length +1,
        name: req.body.name
      };
      genres.push(genre);
      res.send(genre);
  });



// PUT Requests to update a genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Genre Not Found');
    
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error);
  
    genre.name = req.body.name;
    res.send(genre);
  });
  // Delete Request to delete a genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Genre Not Found');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
  })
app.listen(3000,()=> {console.log('server listening')});