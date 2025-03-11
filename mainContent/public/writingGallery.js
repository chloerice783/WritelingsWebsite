document.addEventListener("DOMContentLoaded", function () {
    //JAVA SCRIPT PART TOP
    Handlebars.registerPartial('textFileIcon', Handlebars.templates['textFileIcon']);
    //code for the writing gallery page top~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    //Reveal the modal if the plus button is clicked
    document.getElementById('create-text-button').addEventListener('click', revealModal);

    //Hide the modal if the 'x' button is clicked
    document.getElementById('modal-close').addEventListener('click', hideModal);
    document.getElementById('text-info-modal-close').addEventListener('click', hideTextInfoModal);

    //Create the text
    document.getElementById('modal-accept').addEventListener('click', getTextInfo)
    //Check or uncheck the text due date
    document.getElementById('due-date-checkbox').addEventListener('click', checked_due_date)

    //For closing delete modal
    document.getElementById('cancel-delete').addEventListener('click', hideDeleteModal)

    const textFileIcons = document.querySelectorAll(".text-file-icon");

    //Make all the text file icons clickable after they are loaded to the website
    textFileIcons.forEach(text => {

        const text_name = text.dataset.text_title;
        const  word_goal = text.dataset.word_goal;
        const due_date = text.dataset.due_date;
        const reward_rarity = text.dataset.reward_rarity;
        const text_status = text.dataset.text_status;
        const word_count = text.dataset.word_count;
        const text_id = text.dataset.text_id;
    
        text.addEventListener('click', () =>  revealTextInfoModal(text_name, word_goal, due_date, reward_rarity, text_status, word_count, text_id));
    });

    //Function for if the due date option is checked
    function checked_due_date(){
        const checkbox = document.getElementById("due-date-checkbox");
        const  dueDateMenu = document.getElementById("text-due-date-input");
        if (checkbox.checked){
            dueDateMenu.disabled = false
        }

        else {
            dueDateMenu.disabled = true
        }
    }

    //Function for hiding the create text modal
    function hideModal(){
        document.getElementById('create-text-modal-overlay').classList.add('hidden');
    }

    function revealModal(){

        document.getElementById('create-text-modal-overlay').classList.remove('hidden');

    }

    function getTextInfo() {
        var text_name = document.querySelector("#text-name-input").value;
        var word_goal = document.querySelector("#word-count-goal-input").value;
        var due_date = document.querySelector("#text-due-date-input").value;
        const checkbox = document.getElementById("due-date-checkbox");
    
        if (!text_name || !word_goal || (!due_date && checkbox.checked)) {
            alert("One or more fields were left empty. Please fill out all of the fields before submitting.");
            return; 
        }   
        createText(text_name, word_goal, due_date);
    }


    function createText(text_name, word_goal, due_date){

        var text_status = 'incomplete';
        var word_count = 0;
        var reward_rarity;

        if (word_goal >= 500){
            reward_rarity = 'legendary';
        }

        else if (word_goal >= 300){
            reward_rarity = 'rare';
        }

        else if (word_goal >= 100){
            reward_rarity = 'uncommon';
        }

        else if(word_goal >= 50){
            reward_rarity = 'common';
        }

        else{
            reward_rarity = "None"
        }
        

        textData = Handlebars.templates.textFileIcon({
            text_title: text_name,
            text_status: 'incomplete',
            reward_rarity: reward_rarity,
            word_goal: word_goal,
            due_date: due_date,
            word_count: 0
        })

        //Get a reference to the container element where the post will be inserted
        textsContainer = document.getElementById('texts-container'); 

        //Create a temporary div to convert the HTML string into an actual DOM element
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = textData;

        //Get the newly created text element
        const newTextElement = tempDiv.firstElementChild;

        //Insert the new element into the container
        textsContainer.appendChild(newTextElement);

        //Create a new text object to add to the allTexts array
        const newText = {
            text_title: text_name,
            text_status: 'incomplete',
            reward_rarity: reward_rarity,
            word_goal: word_goal,
            due_date: due_date,
            word_count: 0
        };

        fetchText(newText)

        hideModal();
    }

    //Call to add the new text into the database
    function fetchText(newText){
        fetch('http://localhost:9742/update-texts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texts: [newText] })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            //reload the texts data from the server to update the view
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function revealTextInfoModal(text_name, word_goal, due_date, reward_rarity, text_status, word_count, text_id){
        textInfoModal = document.getElementById('text-info-modal-overlay');
        
        document.getElementById('text-name').textContent = text_name;
        document.getElementById('word-count-goal').textContent = word_goal;
        document.getElementById('reward-rarity').textContent = reward_rarity;
        document.getElementById('word-count').textContent = word_count;
        document.getElementById('text-status').textContent = text_status;

        if (due_date){
            document.getElementById('text-due-date').textContent = due_date;
            }
        else{
            document.getElementById('text-due-date').textContent = "None"
        }

        //Open a text file
        document.getElementById('open-text').addEventListener('click', () =>  openTextFile(text_id))
        //Delete a text file
        document.getElementById('delete-text').addEventListener('click', () =>  revealDeleteModal(text_id))

        textInfoModal.classList.remove('hidden');
    }

    function hideTextInfoModal(){
        document.getElementById('text-info-modal-overlay').classList.add('hidden');
    }

    function revealDeleteModal(text_id){
        document.getElementById('delete-modal-overlay').classList.remove('hidden');
        document.getElementById('accept-delete').addEventListener('click', () =>  deleteTextFile(text_id))
    }

    function hideDeleteModal(){
        document.getElementById('delete-modal-overlay').classList.add('hidden');
    }

    //This is the get request for opening the text file and its page when clicking the 'open text' button.
    function openTextFile(text_id) {
        window.location.href = `/text-page?text_id=${text_id}`;
    }

    //This is the get request for opening the text file and its page when clicking the 'open text' button.
    function deleteTextFile(text_id) {
        fetch('http://localhost:9742/delete-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text_id })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            //reload the texts data from the server to update the view
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }
    //code for the writing gallery page bottom~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //JAVA SCRIPT PART BOTTOM

});