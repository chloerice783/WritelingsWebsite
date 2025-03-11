
document.addEventListener("DOMContentLoaded", function () {
    //JAVA SCRIPT PART TOP
    Handlebars.registerPartial('creatureSlot', Handlebars.templates['creatureSlot']);

    //List of all the creature slots
    const creatureSlots = document.querySelectorAll(".creature-slot");
    document.getElementById('close-creature-info').addEventListener('click', hideCreatureInfoModal);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~code for the creature collection page top~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    creatureSlots.forEach(slot => {
        const species = slot.dataset.species;
        const rarity = slot.dataset.rarity;
        const description = slot.dataset.description;

        const slot_button = slot.querySelector('.creature-slot-button');
    
        slot_button.addEventListener('click', () =>  revealCreatureInfoModal(species, rarity, description, slot.dataset.amount));
    });


    function revealCreatureInfoModal(species, rarity, description, amount){
        creatureInfoOverlay = document.getElementById('creature-info-overlay');
        creatureInfoModal = document.getElementById('creature-info-modal');
        creatureInfoOverlay.classList.remove('hidden');
        creatureInfoOverlay.classList.add('flex');

        document.getElementById('info-species').innerText = species;

        const modalContent = document.getElementById('creature-info-body');
        modalContent.innerHTML = `
            <p><strong>Rarity:</strong> ${rarity}</p>
            <p><strong>Amount:</strong> ${amount}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;

    }

    function hideCreatureInfoModal(){
        creatureInfoOverlay = document.getElementById('creature-info-overlay');
        creatureInfoOverlay.classList.remove('flex');
        creatureInfoOverlay.classList.add('hidden');
    }


});