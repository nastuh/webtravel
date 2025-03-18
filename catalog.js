const destinations = {
    Summer: [
        {
            image: "https://public.readdy.ai/ai/img_res/906504ed51f379d5755c2c6ab68d1aeb.jpg",
            name: "Maldives",
            duration: "7 days / 6 nights",
            price: 1200
        },
        {
            image: "https://public.readdy.ai/ai/img_res/d89e3583d88d4e7edbc082804263a523.jpg",
            name: "Santorini",
            duration: "6 days / 5 nights",
            price: 1500
        },
        {
            image: "https://public.readdy.ai/ai/img_res/5f3d3aa6c8be57324c0ff5a62b8fd5e8.jpg",
            name: "Bora Bora",
            duration: "8 days / 7 nights",
            price: 2800
        },
        {
            image: "https://public.readdy.ai/ai/img_res/5f3d3aa6c8be57324c0ff5a62b8fd5e8.jpg",
            name: "Bora Bora",
            duration: "8 days / 7 nights",
            price: 2800
        },
        {
            image: "https://public.readdy.ai/ai/img_res/5f3d3aa6c8be57324c0ff5a62b8fd5e8.jpg",
            name: "Bora Bora",
            duration: "8 days / 7 nights",
            price: 2800
        }
    ],
    Winter: [
        {
            image: "https://public.readdy.ai/ai/img_res/f5fe38827ad5aa4dfa26d6be3dc7a7d8.jpg",
            name: "Alps",
            duration: "10 days / 9 nights",
            price: 950
        },
        {
            image: "https://public.readdy.ai/ai/img_res/2836ac8f2c1209a91a240403adbfe978.jpg",
            name: "Iceland",
            duration: "5 days / 4 nights",
            price: 1800
        },
        {
            image: "https://public.readdy.ai/ai/img_res/d69a4ba3c4c9c553b84a819db743b28d.jpg",
            name: "Japan",
            duration: "12 days / 11 nights",
            price: 2200
        }
    ],
    Spring: [
        {
            image: "https://public.readdy.ai/ai/img_res/b07ebcd21fdda1b6d6a3ee78c871bb3a.jpg",
            name: "Kyoto",
            duration: "8 days / 7 nights",
            price: 1600
        },
        {
            image: "https://public.readdy.ai/ai/img_res/44ee39a6e96b10957f9cca98739fc862.jpg",
            name: "Netherlands",
            duration: "5 days / 4 nights",
            price: 900
        },
        {
            image: "https://public.readdy.ai/ai/img_res/b2071de9c470027a9ef217964b3d9350.jpg",
            name: "Provence",
            duration: "6 days / 5 nights",
            price: 1100
        }
    ],
    Autumn: [
        {
            image: "https://public.readdy.ai/ai/img_res/eea78d3a6fe38cb1b91b9868453ebecf.jpg",
            name: "New England",
            duration: "7 days / 6 nights",
            price: 1400
        },
        {
            image: "https://public.readdy.ai/ai/img_res/5092536b13c7d218b5a6c1596895a041.jpg",
            name: "Prague",
            duration: "5 days / 4 nights",
            price: 750
        },
        {
            image: "https://public.readdy.ai/ai/img_res/c2b828aecadd9a9daa0e23a0404f093a.jpg",
            name: "Scotland",
            duration: "9 days / 8 nights",
            price: 1700
        }
    ]
};

function updateDestinations() {
    const selectedSeasons = Array.from(document.querySelectorAll('.season-filter:checked')).map(cb => cb.value);
    const destinationsGrid = document.getElementById('destinations-grid');
    destinationsGrid.innerHTML = '';

    let displayDestinations = [];
    if (selectedSeasons.length === 0) {
        Object.values(destinations).forEach(seasonDestinations => {
            displayDestinations.push(seasonDestinations[0]);
        });
    } else {
        selectedSeasons.forEach(season => {
            displayDestinations = displayDestinations.concat(destinations[season]);
        });
    }

    displayDestinations.slice(0, 3).forEach(destination => {
        const destinationCard = document.createElement('div');
        destinationCard.className = 'bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition';
        destinationCard.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}" class="w-full h-[250px] object-cover">
            <div class="p-4">
                <h3 class="font-medium mb-2">${destination.name}</h3>
                <p class="text-gray-600 text-sm mb-3">${destination.duration}</p>
                <p class="text-primary font-medium">From $${destination.price}</p>
            </div>
        `;
        destinationsGrid.appendChild(destinationCard);
    });
}

document.querySelectorAll('.season-filter').forEach(checkbox => {
    checkbox.addEventListener('change', updateDestinations);
});

// Initial load
updateDestinations();

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
});
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        const message = document.createElement('div');
        message.className = 'mb-4 text-right';
        message.innerHTML = `
            <div class="inline-block bg-primary text-white px-4 py-2 rounded-lg">
                ${chatInput.value}
            </div>
        `;
        chatMessages.appendChild(message);
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'mb-4';
            response.innerHTML = `
                <div class="inline-block bg-gray-100 px-4 py-2 rounded-lg">
                    Thank you for your message! Our consultant will contact you soon.
                </div>
            `;
            chatMessages.appendChild(response);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

const priceRange = document.querySelector('.price-range');
const priceMin = document.querySelector('.price-min');
const priceMax = document.querySelector('.price-max');
priceRange.addEventListener('input', (e) => {
    const currentValue = parseInt(e.target.value);
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(currentValue);
    priceMin.textContent = formattedValue;
    priceMax.textContent = '$100,000';
});