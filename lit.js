// script.js
const services = [
    { name: "Chirurgie", totalBeds: 20, availableBeds: 8 },
    { name: "Réanimation", totalBeds: 15, availableBeds: 5 },
    { name: "Médecine Générale", totalBeds: 30, availableBeds: 12 }
];

const rooms = [
    { id: "Chambre A1", status: "available" },
    { id: "Chambre A2", status: "occupied" },
    { id: "Chambre A3", status: "available" },
    { id: "Chambre A4", status: "occupied" },
    { id: "Chambre A5", status: "available" }
];

// Remplir le tableau des services
const tableBody = document.getElementById("services-table");
services.forEach(service => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${service.name}</td>
        <td>${service.totalBeds}</td>
        <td class="available">${service.availableBeds}</td>
        <td class="occupied">${service.totalBeds - service.availableBeds}</td>
    `;
    tableBody.appendChild(row);
});

// Générer la carte interactive
const roomMap = document.getElementById("room-map");
rooms.forEach(room => {
    const bedDiv = document.createElement("div");
    bedDiv.className = `bed ${room.status}`;
    bedDiv.innerText = room.id;
    roomMap.appendChild(bedDiv);
});
