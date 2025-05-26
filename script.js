let currentCombination = [];
let savedCombinations = JSON.parse(localStorage.getItem('combinations')) || [];

const currentCombinationDiv = document.getElementById('current-combination');
const saveButton = document.getElementById('save-combination');

function updateCombinationBar() {
    currentCombinationDiv.innerHTML = '';
    currentCombination.forEach(fruit => {
        const fruitDiv = document.createElement('div');
        fruitDiv.className = 'fruit';

        const img = document.createElement('img');
        img.src = fruit.image;
        img.alt = fruit.name;
        img.className = 'fruit-img';

        fruitDiv.appendChild(img);
        currentCombinationDiv.appendChild(fruitDiv);
    });
}

document.querySelectorAll('.fruit').forEach(fruit => {
    fruit.addEventListener('click', () => {
        const blender = document.querySelector('.blender');
        const clone = fruit.cloneNode(true);
        clone.style.position = 'absolute';

        const rect = fruit.getBoundingClientRect();
        clone.style.left = rect.left + 'px';
        clone.style.top = rect.top + 'px';
        clone.style.zIndex = '1000';
        document.body.appendChild(clone);

        const blenderRect = blender.getBoundingClientRect();

        clone.style.transition = 'all 1s ease-in-out';
        requestAnimationFrame(() => {
            clone.style.left = blenderRect.left + blenderRect.width / 2 + 'px';
            clone.style.top = blenderRect.top + blenderRect.height / 2 + 'px';
            clone.style.opacity = '0';
            clone.style.transform = 'scale(0.5)';
        });

        setTimeout(() => {
            clone.remove();

            const fruitName = fruit.dataset.fruit;
            const image = `img/${fruitName}.png`;

            if (fruitName) {
                currentCombination.push({ name: fruitName, image });
                updateCombinationBar();
                animateBlender();
            } else {
                console.warn('Fruta sem data-fruit definida:', fruit);
            }
        }, 1000);
    });
});

function animateBlender() {
    const blender = document.querySelector('.blender');
    blender.style.transform = 'rotate(5deg)';
    setTimeout(() => {
        blender.style.transform = 'rotate(-5deg)';
        setTimeout(() => {
            blender.style.transform = 'rotate(0deg)';
        }, 100);
    }, 100);
}

saveButton.addEventListener('click', () => {
    if (currentCombination.length === 0) {
        alert('Adicione frutas antes de salvar!');
        return;
    }

    savedCombinations.push([...currentCombination]);
    localStorage.setItem('combinations', JSON.stringify(savedCombinations));
    alert('Combinação salva!');
    currentCombination = [];
    updateCombinationBar();
});

