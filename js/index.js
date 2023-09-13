//Load the First 50 Monsters from the API
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/monsters')
        .then(response => response.json())
        .then(monsters => {
            const first50Monsters = monsters.slice(0, 50);
            
            const monsterList = document.getElementById('monster-list');

            first50Monsters.forEach(monster => {
                const monsterItem = document.createElement('li');
                monsterItem.textContent = `Name: ${monster.name}, Age: ${monster.age}, Description: ${monster.description}`;
                monsterList.appendChild(monsterItem);
            });
        })
    .catch(error => {
        console.error('Error', error);
    });
});

//Add Monster to the List
document.addEventListener('DOMContentLoaded', function(){
    const monsterForm = document.getElementById('monster-form');
    monsterForm.addEventListener('submit', function(event){
        event.preventDefault();

        const name = document.getElementById('name-input').value;
        const age = document.getElementById('age-input').value;
        const description = document.getElementById('description-input').value;

        const newMonster = {
            name: name,
            age: age,
            description: description
        };

        const monsterList = document.getElementById('monster-list');
        const newMonsterItem = document.createElement('li');
        newMonsterItem.textContent = `Name: ${newMonster.name}, Age: ${newMonster.age}, Description: ${newMonster.description}`;
        monsterList.appendChild(newMonsterItem);

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMonster)
        })
        .then(response => response.json())
        .then(data => {
            console.log('New Monster Saved:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    monsterForm.reset();
    });
});

//Move to the Next 50 Monsters in the API
document.addEventListener('DOMContentLoaded', function(){
    let currentPage = 1;
    let limit = 50;

    const loadMoreButton = document.getElementById('load-more');
    const monsterList = document.getElementById('monster-list');

    loadMoreButton.addEventListener('click', function(){
        const offset = (currentPage - 1) * limit;

        fetch(`http://localhost:3000/monsters?_limit=${limit}&_offset=${offset}`)
        .then(response => response.json())
        .then(monsters => {
            monsterList.innerHTML = '';
            
            monsters.forEach(monster => {
                const monsterItem = document.createElement('li');
                monsterItem.textContent = `Name: ${monster.name}, Age: ${monster.age}, Description: ${monster.description}`;
                monsterList.appendChild(monsterItem);
            });

            currentPage++;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});