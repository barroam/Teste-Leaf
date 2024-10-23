// data.js

// Les données géométriques à afficher
const geoData = {
    "externalId": "6e4c8c24-733e-4fda-af59-92b523b00869__sample__",
    "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
            [
                [
                    [
                        -89.83466864,
                        39.7265806
                    ],
                    [
                        -89.83469009,
                        39.71951688
                    ],
                    [
                        -89.829669,
                        39.7195664
                    ],
                    [
                        -89.8298192,
                        39.72781833
                    ],
                    [
                        -89.83466864,
                        39.7265806
                    ]
                ]
            ]
        ]
    },
    "providers": [],
    "extent": {
        "xmin": -89.83469009399414,
        "xmax": -89.82966899871826,
        "ymin": 39.71951688444436,
        "ymax": 39.7278183260755
    },
    "createdTime": "2024-08-04T10:04:58.218524"
};

// Initialiser la carte Leaflet
const map = L.map('map').setView([39.7235, -89.8325], 14); // Coordonnées centrées sur le polygone

// Ajouter une couche de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Extraire les coordonnées du polygone
const coordinates = geoData.geometry.coordinates[0][0].map(coord => [coord[1], coord[0]]);

// Ajouter le polygone à la carte
L.polygon(coordinates, {color: 'blue', weight: 2}).addTo(map);
//57319f8379c1d0a0e9a7763406810ad5