
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("modal-close").addEventListener("click", hideModal);
    //JAVA SCRIPT PART TOP
    Handlebars.registerPartial('eggSlot', Handlebars.templates['eggSlot']);

    //List of all the egg slots
    const eggSlots = document.querySelectorAll(".egg-slot");

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~code for the egg collection page top~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    eggSlots.forEach(slot => {
        const rarity = slot.dataset.rarity;
        const creature_index = slot.dataset.index;
        const egg_id = slot.dataset.id;

        console.log("CREATAGH id: ", egg_id);
        console.log("CREATAGH rariyty: ", rarity )

        const hatch_button = slot.querySelector('.hatch-button');
    
        hatch_button.addEventListener('click', () =>  hatch_egg(creature_index, rarity, egg_id));
    });

    function hatch_egg(creature_index, rarity, egg_id){

        //call creature randomizer microservice giving it the rarity as input
        fetch('http://localhost:9743/randomize-creature', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({creature_index})
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            deleteEgg(egg_id)
            revealModal(data);
            //reload the texts data from the server to update the view
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    function deleteEgg(egg_id) {
        fetch('http://localhost:9744/delete-egg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ egg_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            //reload the eggs data from the server to update the view
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }

    function hideModal(){
        document.getElementById("modal-overlay").classList.add('hidden');
    }

    function revealModal(reward_creature){

        reward_container = document.getElementById("reward-container")
        console.log("CREATURE: ", reward_creature.creature_species)
        document.getElementById('reward-name').innerText = `${reward_creature.creature_species}`;
        document.getElementById('reward-image').innerHTML = `<img src="${reward_creature.creature_image}">`
        document.getElementById("modal-overlay").classList.remove('hidden');
    }


});