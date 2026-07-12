const Dog = require('../models/Dog');

const all_dogs = async(req, res) =>{
    try{
        const page = req.query.page || 1;
        const dogsPerPage = 5;
        
        const dogs = await Dog.find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * dogsPerPage)
        .limit(dogsPerPage);

        res.render('allDogs', {title: "All Dogs", dogs });
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

const dog_adopted_get = async(req, res) =>{
    
    try{
        const page = req.query.page || 1;
        const adoptedDogsPerPage = 5;
        const dogs = await Dog.find({adopted:true})
        .skip((page - 1) * adoptedDogsPerPage)
        .limit(adoptedDogsPerPage);
        res.render('adoptedDogs', {title: "Adopted Dogs", dogs: dogs})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}
const dog_register_get = (req, res)=>{
    res.render('registerDog', {title: "register a dog"})
}
const dog_register_post = async(req, res) =>{
    
    try{
        await Dog.create({
            ...req.body,
            owner: req.user._id  //I must store owner, otherwise owners checks won't work.
        }); 
        console.log("dog created and saved", req.body);
        //create means instance of new Dog + save()
        res.redirect('/dog/dogs')
}
    catch(err){
        res.status(500).json({error: err.message})
    }
}
// const dog_adopt_get = (req, res) =>{

//     res.render('adoptDogForm', {title: "Adopt a Dog"} )
// }
const dog_adopt_post = async (req, res) => {
    try {
        const dogId = req.params.id;
        const dog = await Dog.findById(dogId);

        if (!dog) {
            res.render('response', {message: "Dog not found"});
            return;
        }

        if (!req.user) {
            res.render('response', {message: "You must be logged in to adopt a dog."});
            return;
        }

        const userId = req.user._id;

        if (!dog.owner) {
            res.render('response', {message: "Dog owner missing in DB"});
            return;
        }

        if (dog.owner.toString() === userId.toString()) {
            res.render('response', {message: "You cannot adopt your own dog."});
            return;
        }

        if (dog.adopted) {
            res.render('response', {message: "This dog has already been adopted."});
            return;
        }

        dog.adopted = true;
        dog.adoptedBy = userId;

        await dog.save();

        return res.render('response', { message: `Thank you for adopting ${dog.dog_name}! We hope you have a wonderful time together!` });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const my_dogs_get = async(req, res) =>{
    try{
        const myDogs = await Dog.find({owner: req.user._id});
        res.render('myDogs', {title: "My Dogs", dogs: myDogs})
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

const delete_dog = async (req, res) => {
    debugger;
  try {
        const dogId = req.params.id;

        const dog = await Dog.findById(dogId);
        if (!dog) {
            res.status(404).json({ error: "Dog not found" });
            return;
        }
        if(dog.adopted){
            return res.status(400).json({ error: "You cannot delete an adopted dog" });
            
        }

        if (dog.owner.toString() !== req.user._id.toString()) {
            res.status(403).json({ error: "Not allowed" });
            return;
        }
        await Dog.findByIdAndDelete(dogId);

        res.status(200).json({ message: "Dog deleted successfully" });

  } catch (err) {
        return res.status(500).json({ error: err.message });
  }
};
module.exports = {all_dogs,
                dog_adopted_get,
                dog_register_get,
                dog_register_post,
                //dog_adopt_get,
                dog_adopt_post,
                my_dogs_get,
                delete_dog
};