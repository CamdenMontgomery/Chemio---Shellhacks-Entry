const stats = {
    1: { name: "Hydrogen", type: "NONMETAL", speed: 90, defense: 30, attack: 70, electronegativity: 2.20, color: "#f74949" }, // Pastel Red
    2: { name: "Helium", type: "NOBLE_GAS", speed: 80, defense: 90, attack: 10, electronegativity: 0, color: "#e0f7fa" }, // Pastel Cyan
    3: { name: "Lithium", type: "METAL", speed: 70, defense: 30, attack: 60, electronegativity: 0.98, color: "#f4c3b2" }, // Pastel Pink
    4: { name: "Beryllium", type: "METAL", speed: 50, defense: 50, attack: 40, electronegativity: 1.57, color: "#b2dfdb" }, // Pastel Teal
    5: { name: "Boron", type: "METAL", speed: 40, defense: 60, attack: 50, electronegativity: 2.04, color: "#c4e1e1" }, // Pastel Aqua
    6: { name: "Carbon", type: "NONMETAL", speed: 60, defense: 40, attack: 40, electronegativity: 2.55, color: "#333333" }, // Black
    7: { name: "Nitrogen", type: "NONMETAL", speed: 70, defense: 50, attack: 30, electronegativity: 3.04, color: "#8cc4e1" }, // Light Blue
    8: { name: "Oxygen", type: "NONMETAL", speed: 70, defense: 60, attack: 20, electronegativity: 3.44, color: "#b2e0f4" }, // Pale Blue
    9: { name: "Fluorine", type: "NONMETAL", speed: 80, defense: 70, attack: 90, electronegativity: 3.98, color: "#ffb3cc" }, // Pastel Pink
    10: { name: "Neon", type: "NOBLE_GAS", speed: 60, defense: 90, attack: 10, electronegativity: 0, color: "#ffcccb" }, // Pastel Coral
    11: { name: "Sodium", type: "METAL", speed: 60, defense: 30, attack: 70, electronegativity: 0.93, color: "#c4c4c4" }, // Light Gray
    12: { name: "Magnesium", type: "METAL", speed: 55, defense: 40, attack: 60, electronegativity: 1.31, color: "#b2c2d6" }, // Pastel Blue-Gray
    13: { name: "Aluminum", type: "METAL", speed: 45, defense: 50, attack: 55, electronegativity: 1.61, color: "#cfd7e6" }, // Light Blue-Gray
    14: { name: "Silicon", type: "METAL", speed: 40, defense: 60, attack: 50, electronegativity: 1.90, color: "#e6e0d4" }, // Pale Gray
    15: { name: "Phosphorus", type: "NONMETAL", speed: 30, defense: 60, attack: 20, electronegativity: 2.19, color: "#f6b7a3" }, // Pastel Peach
    16: { name: "Sulfur", type: "NONMETAL", speed: 35, defense: 70, attack: 20, electronegativity: 2.58, color: "#fff8c4" }, // Light Yellow
    17: { name: "Chlorine", type: "NONMETAL", speed: 50, defense: 70, attack: 40, electronegativity: 3.16, color: "#b2e0b2" }, // Pastel Green
    18: { name: "Argon", type: "NOBLE_GAS", speed: 40, defense: 90, attack: 10, electronegativity: 0, color: "#d4e5e6" }, // Pale Cyan
    19: { name: "Potassium", type: "METAL", speed: 70, defense: 30, attack: 80, electronegativity: 0.82, color: "#d6d0d5" }, // Pastel Gray
    20: { name: "Calcium", type: "METAL", speed: 65, defense: 40, attack: 70, electronegativity: 1.00, color: "#f2e0d4" }, // Light Peach
    21: { name: "Scandium", type: "METAL", speed: 50, defense: 50, attack: 60, electronegativity: 1.36, color: "#b0c4d6" }, // Pastel Blue
    22: { name: "Titanium", type: "METAL", speed: 45, defense: 60, attack: 50, electronegativity: 1.54, color: "#a2b8c4" }, // Pastel Steel Blue
    23: { name: "Vanadium", type: "METAL", speed: 40, defense: 60, attack: 55, electronegativity: 1.63, color: "#b0b3c4" }, // Light Blue-Gray
    24: { name: "Chromium", type: "METAL", speed: 35, defense: 70, attack: 60, electronegativity: 1.66, color: "#c0c0d6" }, // Light Silver
    25: { name: "Manganese", type: "METAL", speed: 30, defense: 60, attack: 65, electronegativity: 1.55, color: "#d3c0d3" }, // Light Lavender
    26: { name: "Iron", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.83, color: "#a3a3a3" }, // Gray
    27: { name: "Cobalt", type: "METAL", speed: 30, defense: 50, attack: 75, electronegativity: 1.88, color: "#8cb3e1" }, // Light Sky Blue
    28: { name: "Nickel", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.91, color: "#b2c2c4" }, // Light Silver-Gray
    29: { name: "Copper", type: "METAL", speed: 30, defense: 45, attack: 85, electronegativity: 1.90, color: "#e08e45" }, // Pastel Orange
    30: { name: "Zinc", type: "METAL", speed: 35, defense: 60, attack: 50, electronegativity: 1.65, color: "#d1d1d1" }, // Light Gray
    31: { name: "Gallium", type: "METAL", speed: 40, defense: 50, attack: 60, electronegativity: 1.81, color: "#a2c3c7" }, // Pastel Aqua
    32: { name: "Germanium", type: "METAL", speed: 35, defense: 60, attack: 50, electronegativity: 2.01, color: "#b3c1c4" }, // Light Blue-Gray
    33: { name: "Arsenic", type: "METAL", speed: 30, defense: 60, attack: 40, electronegativity: 2.18, color: "#c8d1c4" }, // Pastel Gray
    34: { name: "Selenium", type: "NONMETAL", speed: 25, defense: 70, attack: 30, electronegativity: 2.55, color: "#ffe6a7" }, // Light Yellow
    35: { name: "Bromine", type: "NONMETAL", speed: 20, defense: 60, attack: 40, electronegativity: 2.96, color: "#ffb3cc" }, // Pastel Pink
    36: { name: "Krypton", type: "NOBLE_GAS", speed: 20, defense: 90, attack: 10, electronegativity: 0, color: "#ffccff" }, // Light Lavender
    37: { name: "Rubidium", type: "METAL", speed: 60, defense: 30, attack: 85, electronegativity: 0.82, color: "#d4d0d5" }, // Light Gray
    38: { name: "Strontium", type: "METAL", speed: 55, defense: 40, attack: 80, electronegativity: 0.95, color: "#e0a6a8" }, // Pastel Pink
    39: { name: "Yttrium", type: "METAL", speed: 50, defense: 50, attack: 60, electronegativity: 1.22, color: "#b0c4d6" }, // Pastel Blue
    40: { name: "Zirconium", type: "METAL", speed: 45, defense: 60, attack: 55, electronegativity: 1.33, color: "#a2b8c4" }, // Pastel Steel Blue
    41: { name: "Niobium", type: "METAL", speed: 40, defense: 60, attack: 60, electronegativity: 1.57, color: "#b0b3c4" }, // Light Blue-Gray
    42: { name: "Molybdenum", type: "METAL", speed: 35, defense: 70, attack: 65, electronegativity: 1.76, color: "#c0c0d6" }, // Light Silver
    43: { name: "Technetium", type: "METAL", speed: 30, defense: 60, attack: 70, electronegativity: 1.90, color: "#d3c0d3",radioactive: true }, // Light Lavender
    44: { name: "Ruthenium", type: "METAL", speed: 30, defense: 60, attack: 75, electronegativity: 2.20, color: "#a3a3a3" }, // Gray
    45: { name: "Rhodium", type: "METAL", speed: 30, defense: 50, attack: 80, electronegativity: 2.28, color: "#8cb3e1" }, // Light Sky Blue
    46: { name: "Palladium", type: "METAL", speed: 30, defense: 50, attack: 75, electronegativity: 2.20, color: "#b2c2c4" }, // Light Silver-Gray
    47: { name: "Silver", type: "METAL", speed: 30, defense: 45, attack: 90, electronegativity: 1.93, color: "#e08e45" }, // Pastel Orange
    48: { name: "Cadmium", type: "METAL", speed: 35, defense: 60, attack: 50, electronegativity: 1.69, color: "#d1d1d1" }, // Light Gray
    49: { name: "Indium", type: "METAL", speed: 40, defense: 50, attack: 60, electronegativity: 1.78, color: "#a2c3c7" }, // Pastel Aqua
    50: { name: "Tin", type: "METAL", speed: 35, defense: 60, attack: 50, electronegativity: 1.96, color: "#b3c1c4" }, // Light Blue-Gray
    51: { name: "Antimony", type: "METAL", speed: 30, defense: 60, attack: 40, electronegativity: 2.05, color: "#c8d1c4" }, // Pastel Gray
    52: { name: "Tellurium", type: "NONMETAL", speed: 25, defense: 70, attack: 30, electronegativity: 2.10, color: "#ffe6a7" }, // Light Yellow
    53: { name: "Iodine", type: "NONMETAL", speed: 20, defense: 60, attack: 40, electronegativity: 2.66, color: "#ffb3cc" }, // Pastel Pink
    54: { name: "Xenon", type: "NOBLE_GAS", speed: 20, defense: 90, attack: 10, electronegativity: 0, color: "#ffccff" }, // Light Lavender
    55: { name: "Cesium", type: "METAL", speed: 60, defense: 30, attack: 85, electronegativity: 0.79, color: "#d4d0d5" }, // Light Gray
    56: { name: "Barium", type: "METAL", speed: 55, defense: 40, attack: 80, electronegativity: 0.89, color: "#e0a6a8" }, // Pastel Pink
    57: { name: "Lanthanum", type: "METAL", speed: 50, defense: 50, attack: 60, electronegativity: 1.10, color: "#b0c4d6" }, // Pastel Blue
    58: { name: "Cerium", type: "METAL", speed: 45, defense: 60, attack: 55, electronegativity: 1.12, color: "#a2b8c4" }, // Pastel Steel Blue
    59: { name: "Praseodymium", type: "METAL", speed: 40, defense: 60, attack: 60, electronegativity: 1.13, color: "#b0b3c4" }, // Light Blue-Gray
    60: { name: "Neodymium", type: "METAL", speed: 35, defense: 70, attack: 65, electronegativity: 1.14, color: "#c0c0d6" }, // Light Silver
    61: { name: "Promethium", type: "METAL", speed: 30, defense: 60, attack: 70, electronegativity: 1.13, color: "#FFB86C", radioactive: true }, // Light Orange
    62: { name: "Samarium", type: "METAL", speed: 30, defense: 60, attack: 75, electronegativity: 1.17, color: "#a3a3a3" }, // Gray
    63: { name: "Europium", type: "METAL", speed: 30, defense: 50, attack: 80, electronegativity: 1.20, color: "#8cb3e1" }, // Light Sky Blue
    64: { name: "Gadolinium", type: "METAL", speed: 30, defense: 50, attack: 75, electronegativity: 1.20, color: "#b2c2c4" }, // Light Silver-Gray
    65: { name: "Terbium", type: "METAL", speed: 30, defense: 45, attack: 85, electronegativity: 1.20, color: "#e08e45" }, // Pastel Orange
    66: { name: "Dysprosium", type: "METAL", speed: 35, defense: 60, attack: 50, electronegativity: 1.22, color: "#d1d1d1" }, // Light Gray
    67: { name: "Holmium", type: "METAL", speed: 40, defense: 50, attack: 60, electronegativity: 1.23, color: "#a2c3c7" }, // Pastel Aqua
    68: { name: "Erbium", type: "METAL", speed: 35, defense: 60, attack: 50, electronegativity: 1.57, color: "#b3c1c4" }, // Light Blue-Gray
    69: { name: "Thulium", type: "METAL", speed: 30, defense: 60, attack: 40, electronegativity: 1.54, color: "#c8d1c4" }, // Pastel Gray
    71: { name: "Lutetium", type: "METAL", speed: 30, defense: 55, attack: 60, electronegativity: 1.27, color: "#b4c4c4" }, // pastel gray
    72: { name: "Hafnium", type: "METAL", speed: 30, defense: 60, attack: 70, electronegativity: 1.30, color: "#b2b2c4" }, // pastel blue-gray
    73: { name: "Tantalum", type: "METAL", speed: 30, defense: 60, attack: 70, electronegativity: 1.50, color: "#c0c2d4" }, // pastel gray
    74: { name: "Tungsten", type: "METAL", speed: 30, defense: 60, attack: 80, electronegativity: 2.36, color: "#c4c4d6" }, // pastel silver-gray
    75: { name: "Rhenium", type: "METAL", speed: 30, defense: 55, attack: 75, electronegativity: 1.90, color: "#c4b3d6" }, // pastel lavender
    76: { name: "Osmium", type: "METAL", speed: 30, defense: 65, attack: 80, electronegativity: 2.20, color: "#b0b0b0" }, // pastel gray
    77: { name: "Iridium", type: "METAL", speed: 30, defense: 70, attack: 85, electronegativity: 2.20, color: "#a9a9a9" }, // pastel silver
    78: { name: "Platinum", type: "METAL", speed: 30, defense: 75, attack: 80, electronegativity: 2.28, color: "#d9d9d9" }, // pastel silver-gray
    79: { name: "Gold", type: "METAL", speed: 30, defense: 70, attack: 90, electronegativity: 2.54, color: "#ffd700" }, // pastel gold
    80: { name: "Mercury", type: "METAL", speed: 30, defense: 60, attack: 75, electronegativity: 2.00, color: "#c0c0c0" }, // pastel silver
    81: { name: "Thallium", type: "METAL", speed: 30, defense: 50, attack: 75, electronegativity: 1.62, color: "#c4d1e0" }, // pastel light blue
    82: { name: "Lead", type: "METAL", speed: 30, defense: 50, attack: 60, electronegativity: 1.87, color: "#b0b0b0" }, // pastel gray
    83: { name: "Bismuth", type: "METAL", speed: 30, defense: 50, attack: 65, electronegativity: 2.02, color: "#e0a3c4" }, // pastel pink
    84: { name: "Polonium", type: "METAL", speed: 30, defense: 50, attack: 60, electronegativity: 2.00, color: "#a2d5a2" }, // pastel green
    85: { name: "Astatine", type: "NONMETAL", speed: 30, defense: 60, attack: 50, electronegativity: 2.2, color: "#b3c0c4" }, // pastel blue-gray
    86: { name: "Radon", type: "NOBLE_GAS", speed: 30, defense: 90, attack: 10, electronegativity: 0, color: "#d4e4f2" }, // pastel light blue
    87: { name: "Francium", type: "METAL", speed: 60, defense: 30, attack: 100, electronegativity: 0.70, color: "#c4c4d4", radioactive: true }, // pastel gray
    88: { name: "Radium", type: "METAL", speed: 55, defense: 35, attack: 85, electronegativity: 0.90, color: "#99cc99", radioactive: true }, // pastel green
    89: { name: "Actinium", type: "METAL", speed: 50, defense: 40, attack: 80, electronegativity: 1.1, color: "#b3c4e1", radioactive: true }, // pastel blue
    90: { name: "Thorium", type: "METAL", speed: 45, defense: 50, attack: 75, electronegativity: 1.30, color: "#d4c4b2", radioactive: true }, // pastel cream
    91: { name: "Protactinium", type: "METAL", speed: 40, defense: 55, attack: 70, electronegativity: 1.50, color: "#c4c4b2", radioactive: true }, // pastel beige
    92: { name: "Uranium", type: "METAL", speed: 35, defense: 60, attack: 85, electronegativity: 1.38, color: "#5f9ea0", radioactive: true }, // pastel sea green
    93: { name: "Neptunium", type: "METAL", speed: 30, defense: 50, attack: 75, electronegativity: 1.36, color: "#99cc33", radioactive: true }, // vibrant green
    94: { name: "Plutonium", type: "METAL", speed: 30, defense: 50, attack: 85, electronegativity: 1.28, color: "#4e4e4e", radioactive: true }, // pastel dark gray
    95: { name: "Americium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.13, color: "#5bd75b", radioactive: true }, // vibrant green
    96: { name: "Curium", type: "METAL", speed: 30, defense: 55, attack: 70, electronegativity: 1.28, color: "#99cc33", radioactive: true }, // vibrant green
    97: { name: "Berkelium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b2b2d4", radioactive: true }, // pastel blue
    98: { name: "Californium", type: "METAL", speed: 30, defense: 55, attack: 75, electronegativity: 1.30, color: "#5bd75b", radioactive: true }, // vibrant green
    99: { name: "Einsteinium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#d1d4d4", radioactive: true }, // pastel light gray
    100: { name: "Fermium", type: "METAL", speed: 30, defense: 50, attack: 75, electronegativity: 1.30, color: "#b4d4e0", radioactive: true }, // pastel blue
    101: { name: "Mendelevium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#c4d4d4", radioactive: true }, // pastel gray
    102: { name: "Nobelium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b2c4e1", radioactive: true }, // pastel light blue
    103: { name: "Lawrencium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#d1c2d4", radioactive: true }, // pastel lavender
    104: { name: "Rutherfordium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#c4c2e0", radioactive: true }, // pastel light blue
    105: { name: "Dubnium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b2b2d4", radioactive: true }, // pastel gray
    106: { name: "Seaborgium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#c4c4d4", radioactive: true }, // pastel gray
    107: { name: "Bohrium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b2b2d4", radioactive: true }, // pastel gray
    108: { name: "Hassium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#d4c2d4", radioactive: true }, // pastel lavender
    109: { name: "Meitnerium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b3b3d4", radioactive: true }, // pastel gray
    110: { name: "Darmstadtium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#c4c2c4", radioactive: true }, // pastel light gray
    111: { name: "Roentgenium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b4b4d4", radioactive: true }, // pastel blue
    112: { name: "Copernicium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#c4d4d4", radioactive: true }, // pastel gray
    113: { name: "Nihonium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b2c4e1, radioactive: true" }, // pastel light blue
    114: { name: "Flerovium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#d4c2d4", radioactive: true }, // pastel lavender
    115: { name: "Moscovium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#c4c2e0", radioactive: true }, // pastel light blue
    116: { name: "Livermorium", type: "METAL", speed: 30, defense: 50, attack: 70, electronegativity: 1.30, color: "#b2b2d4", radioactive: true }, // pastel blue
    117: { name: "Tennessine", type: "NONMETAL", speed: 30, defense: 50, attack: 60, electronegativity: 2.2, color: "#b3c0c4", radioactive: true }, // pastel blue-gray
    118: { name: "Oganesson", type: "NOBLE_GAS", speed: 30, defense: 90, attack: 10, electronegativity: 0, color: "#d4e4f2", radioactive: true } // pastel light blue
}

export default stats;