document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("modal-close").addEventListener("click", hideModal);
    document.getElementById("save-text-button").addEventListener("click", async function(event) {

        const text_input = document.getElementById("text-input").value;
        const text_id = document.getElementById("text-input").dataset.text_id;
        const word_count = document.getElementById("text-input").dataset.word_count;
        const word_goal = document.getElementById("text-input").dataset.word_goal;
        var text_status = document.getElementById("text-input").dataset.text_status;
        text_content = document.getElementById("text-input").value;

        const wordCounter = text_content.trim().split(/\s+/).filter(Boolean).length;

        if (word_count >= word_goal && text_status.toLowerCase() === "incomplete"){
            console.log("ATTEPNING THE T JING")
            console.log("TEXT STATUS: ", text_status)
            text_status = "complete";
            document.getElementById("text-input").dataset.text_status = text_status;
            rewardUser();
            console.log("TEXT STATUS: ", text_status)
            document.getElementById("word-count-display").innerText = `Word count: ${wordCounter}`;
        }

        fetch('http://localhost:9742/save-text', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            textId: text_id,
            textContent: text_input,
            wordCount: word_count,
            textStatus: text_status
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('Text saved successfully!', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        });

        document.getElementById("text-input").addEventListener("input", function(event) {
            //Add 1 or subtract one from word count
        
            const textContent = event.target.value;
            const wordGoal = document.getElementById("text-input").dataset.word_goal;
            var textStatus = document.getElementById("text-input").dataset.text_status;

            //Count the words by splitting the text based on spaces and filtering out empty strings
            const wordCounter = textContent.trim().split(/\s+/).filter(Boolean).length;
        
            // Update the word count display
            if (textStatus.toLowerCase() === "incomplete"){
                document.getElementById("word-count-display").innerText = `Word count: ${wordCounter} / ${event.target.dataset.word_goal}`;
            }

            else{
                document.getElementById("word-count-display").innerText = `Word count: ${wordCounter}`;
            }
            // Optionally store the word count in the textarea's dataset for further use, like saving
            event.target.dataset.word_count = wordCounter;

        })

        //Reward the user with the correct creature if they meet their word goal. Have them set a new word goal potentially. 
        function rewardUser(){
            const text_input = document.getElementById("text-input").value;
            const text_id = document.getElementById("text-input").dataset.text_id;
            const reward_rarity = document.getElementById("text-input").dataset.reward_rarity;
            egg_rarity = reward_rarity;

            if (reward_rarity == "None"){
                return;
            }
            egg_index = generateRandomNumber(reward_rarity);
            console.log("EGG INDEX: ", egg_index)

            //call the egg service to get the appropriate egg 
            fetch('http://localhost:9744/add-egg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({egg_index, egg_rarity})
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                revealModal(data);
                //reload the texts data from the server to update the view
            })
            .catch(error => {
                console.error('Error:', error);
            });

        }

        function generateRandomNumber(reward_rarity){

            console.log("Reward rarity: ", reward_rarity);

            var max = 0;
            var min = 0;

            if (reward_rarity.toLowerCase() === "common"){
                max = 2;
                min = 1;
            }

            else if (reward_rarity.toLowerCase() === "uncommon"){
                max = 4;
                min = 3;
            }

            else if (reward_rarity.toLowerCase() === "rare"){
                return 5;
            }

            else if (reward_rarity.toLowerCase() === "legendary"){
                return 6;
            }
            result = Math.floor(Math.random() * (max - min + 1)) + min;

            console.log(result);
            return result;

        }

        function hideModal(){
            document.getElementById("modal-overlay").classList.add('hidden');
        }
    
        function revealModal(reward_creature){
    
            reward_container = document.getElementById("reward-container")
            document.getElementById('reward-name').innerText = `${reward_creature.egg_rarity} egg received`;
            document.getElementById('reward-image').innerHTML = `<img src="${reward_creature.egg_image}">`
            document.getElementById("modal-overlay").classList.remove('hidden');
        }
});

