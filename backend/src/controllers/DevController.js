const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require ('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require("../websocket");

// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store (request, response) {
        console.log(request.body);
        
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            const sendSocktMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            );

            sendMessage(sendSocktMessageTo, 'new-dev', dev);
        }
        return response.json(dev);
        
    },

    async destroy(request, response) {
        const { id } = request.params;
        console.log(request.params);
        
        const dev = await Dev.findByIdAndDelete(id, (error) => {
            if(error){
                console.log("Erro em deletar o usuario\n\n");
                throw error;
            } else {
                console.log(new Date() + " usuário deletado");
                return response.json({ message:'Usuário removido' });
            }
        });
    },
}