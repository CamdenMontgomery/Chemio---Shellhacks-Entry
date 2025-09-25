
//---------------------------------Globals--------------------------------//


var player;
var context;
var center;
var mouseX;
var mouseY;
var renderer;
var enemies = [];
var scale = 0.5;
var speed = 0;
var xspeed = 0;
var yspeed = 0;
var acceleration = 2;
var showStats = true
var keyStates = {
    w: 0,
    s: 0,
    a: 0,
    d: 0,
}
var frame = 0;
var socket;
var mapSize = 30000;




//---------------------------------Constants--------------------------------//



//Ultimately Unused
const AtomTypes = {
    NONMETAL: 1,
    NOBLEGAS: 2,
    ALKALIMETAL: 3,
    ALKALINEEARTHMETAL: 4,
    METALLOID: 5,
    HALOGEN: 6,
    POSTTRANSITIONMETAL: 7
}

const statistics = {
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

const periodicTableElements = [
    'H', 'He', 
    'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
    'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
    'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
    'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr',
    'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd',
    'In', 'Sn', 'Sb', 'Te', 'I', 'Xe',
    'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu',
    'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
    'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn',
    'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr',
    'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'
];

const statistis = {
    1: {
        name: "Hydrogen",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 20,
        attack: 50,
        electronegativity: 2.20,
        color: "#f6b93b", // pastel yellow
    },
    2: {
        name: "Helium",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#a3d9ff", // pastel light blue
    },
    3: {
        name: "Lithium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 20,
        attack: 70,
        electronegativity: 0.98,
        color: "#b0b8c4", // pastel grayish blue
    },
    4: {
        name: "Beryllium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 30,
        attack: 60,
        electronegativity: 1.57,
        color: "#b0b8c4", // pastel grayish blue
    },
    5: {
        name: "Boron",
        type: AtomTypes.METALLOID,
        speed: 30,
        defense: 50,
        attack: 45,
        electronegativity: 2.04,
        color: "#c2d6e3", // pastel blue
    },
    6: {
        name: "Carbon",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 40,
        attack: 70,
        electronegativity: 2.55,
        color: "#808080", // pastel gray
    },
    7: {
        name: "Nitrogen",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 30,
        attack: 60,
        electronegativity: 3.04,
        color: "#add8e6", // pastel light blue
    },
    8: {
        name: "Oxygen",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 40,
        attack: 50,
        electronegativity: 3.44,
        color: "#a8d0e6", // pastel bluish
    },
    9: {
        name: "Fluorine",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 30,
        attack: 90,
        electronegativity: 3.98,
        color: "#c2f0c2", // pastel green
    },
    10: {
        name: "Neon",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#ffb3cc", // pastel pink
    },
    11: {
        name: "Sodium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 20,
        attack: 75,
        electronegativity: 0.93,
        color: "#a6a7a8", // pastel grayish
    },
    12: {
        name: "Magnesium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 30,
        attack: 60,
        electronegativity: 1.31,
        color: "#a6a7a8", // pastel grayish
    },
    13: {
        name: "Aluminum",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 35,
        attack: 65,
        electronegativity: 1.61,
        color: "#b0b8c4", // pastel grayish blue
    },
    14: {
        name: "Silicon",
        type: AtomTypes.METALLOID,
        speed: 30,
        defense: 40,
        attack: 55,
        electronegativity: 1.90,
        color: "#c4c4c4", // pastel gray
    },
    15: {
        name: "Phosphorus",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 40,
        attack: 50,
        electronegativity: 2.19,
        color: "#f2c94c", // pastel yellow
    },
    16: {
        name: "Sulfur",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 50,
        attack: 50,
        electronegativity: 2.58,
        color: "#f6e58d", // pastel yellow
    },
    17: {
        name: "Chlorine",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 30,
        attack: 90,
        electronegativity: 3.16,
        color: "#b9fbc0", // pastel green
    },
    18: {
        name: "Argon",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#ffb3cc", // pastel pink
    },
    19: {
        name: "Potassium",
        type: AtomTypes.METAL,
        speed: 50,
        defense: 20,
        attack: 80,
        electronegativity: 0.82,
        color: "#a6a7a8", // pastel grayish
    },
    20: {
        name: "Calcium",
        type: AtomTypes.METAL,
        speed: 50,
        defense: 25,
        attack: 75,
        electronegativity: 1.00,
        color: "#a6a7a8", // pastel grayish
    },
    21: {
        name: "Scandium",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 35,
        attack: 70,
        electronegativity: 1.36,
        color: "#b0b8c4", // pastel grayish blue
    },
    22: {
        name: "Titanium",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 40,
        attack: 65,
        electronegativity: 1.54,
        color: "#b0b8c4", // pastel grayish blue
    },
    23: {
        name: "Vanadium",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 40,
        attack: 65,
        electronegativity: 1.63,
        color: "#a6a7a8", // pastel grayish
    },
    24: {
        name: "Chromium",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 40,
        attack: 75,
        electronegativity: 1.66,
        color: "#a6a7a8", // pastel grayish
    },
    25: {
        name: "Manganese",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 40,
        attack: 75,
        electronegativity: 1.55,
        color: "#a6a7a8", // pastel grayish
    },
    26: {
        name: "Iron",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 50,
        attack: 80,
        electronegativity: 1.83,
        color: "#a6a7a8", // pastel grayish
    },
    27: {
        name: "Cobalt",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 50,
        attack: 80,
        electronegativity: 1.88,
        color: "#a6a7a8", // pastel grayish
    },
    28: {
        name: "Nickel",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 50,
        attack: 80,
        electronegativity: 1.91,
        color: "#a6a7a8", // pastel grayish
    },
    29: {
        name: "Copper",
        type: AtomTypes.METAL,
        speed: 45,
        defense: 50,
        attack: 75,
        electronegativity: 1.90,
        color: "#d49b3a", // pastel orangish
    },
    30: {
        name: "Zinc",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 50,
        attack: 70,
        electronegativity: 1.65,
        color: "#cfd8dc", // pastel grey
    },
    31: {
        name: "Gallium",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 30,
        attack: 65,
        electronegativity: 1.81,
        color: "#ffab91", // pastel coral
    },
    32: {
        name: "Germanium",
        type: AtomTypes.METALLOID,
        speed: 40,
        defense: 50,
        attack: 60,
        electronegativity: 2.01,
        color: "#d1c4e9", // pastel lavender
    },
    33: {
        name: "Arsenic",
        type: AtomTypes.METALLOID,
        speed: 40,
        defense: 50,
        attack: 65,
        electronegativity: 2.18,
        color: "#ffccbc", // pastel peach
    },
    34: {
        name: "Selenium",
        type: AtomTypes.NONMETAL,
        speed: 45,
        defense: 60,
        attack: 60,
        electronegativity: 2.55,
        color: "#ffecb3", // pastel cream
    },
    35: {
        name: "Bromine",
        type: AtomTypes.NONMETAL,
        speed: 50,
        defense: 55,
        attack: 70,
        electronegativity: 2.96,
        color: "#ffb3cc", // pastel coral
    },
    36: {
        name: "Krypton",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#e0f7fa", // pastel cyan
    },
    37: {
        name: "Rubidium",
        type: AtomTypes.METAL,
        speed: 55,
        defense: 20,
        attack: 90,
        electronegativity: 0.82,
        color: "#ffdb99", // pastel yellow-orange
    },
    38: {
        name: "Strontium",
        type: AtomTypes.METAL,
        speed: 50,
        defense: 45,
        attack: 80,
        electronegativity: 0.95,
        color: "#ffecb3", // pastel cream
    },
    39: {
        name: "Yttrium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.22,
        color: "#cfd8dc", // pastel grey
    },
    40: {
        name: "Zirconium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.33,
        color: "#b2ebf2", // pastel cyan
    },
    41: {
        name: "Niobium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 45,
        attack: 80,
        electronegativity: 1.60,
        color: "#e1bee7", // pastel purple
    },
    42: {
        name: "Molybdenum",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 45,
        attack: 75,
        electronegativity: 2.16,
        color: "#ffe0b2", // pastel beige
    },
    43: {
        name: "Technetium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 40,
        attack: 75,
        electronegativity: 1.9,
        color: "#ffccbc", // pastel peach
        radioactive: true
    },
    44: {
        name: "Ruthenium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 40,
        attack: 75,
        electronegativity: 2.2,
        color: "#b2dfdb", // pastel teal
    },
    45: {
        name: "Rhodium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 40,
        attack: 75,
        electronegativity: 2.28,
        color: "#f8bbd0", // pastel pink
    },
    46: {
        name: "Palladium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 40,
        attack: 75,
        electronegativity: 2.20,
        color: "#ffccbc", // pastel peach
    },
    47: {
        name: "Silver",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 40,
        attack: 80,
        electronegativity: 1.93,
        color: "#d1c4e9", // pastel lavender
    },
    48: {
        name: "Cadmium",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 40,
        attack: 75,
        electronegativity: 1.69,
        color: "#ffe0b2", // pastel beige
    },
    49: {
        name: "Indium",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 35,
        attack: 70,
        electronegativity: 1.78,
        color: "#ffab91", // pastel coral
    },
    50: {
        name: "Tin",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 40,
        attack: 70,
        electronegativity: 1.96,
        color: "#ffdb99", // pastel yellow-orange
    },
    51: {
        name: "Antimony",
        type: AtomTypes.METALLOID,
        speed: 40,
        defense: 50,
        attack: 65,
        electronegativity: 2.05,
        color: "#d1c4e9", // pastel lavender
    },
    52: {
        name: "Tellurium",
        type: AtomTypes.METALLOID,
        speed: 40,
        defense: 55,
        attack: 60,
        electronegativity: 2.1,
        color: "#ffe0b2", // pastel beige
    },
    53: {
        name: "Iodine",
        type: AtomTypes.NONMETAL,
        speed: 45,
        defense: 55,
        attack: 65,
        electronegativity: 2.66,
        color: "#ffb3cc", // pastel coral
    },
    54: {
        name: "Xenon",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#e0f7fa", // pastel cyan
    },
    55: {
        name: "Cesium",
        type: AtomTypes.METAL,
        speed: 55,
        defense: 20,
        attack: 90,
        electronegativity: 0.79,
        color: "#ffdb99", // pastel yellow-orange
    },
    56: {
        name: "Barium",
        type: AtomTypes.METAL,
        speed: 50,
        defense: 45,
        attack: 80,
        electronegativity: 0.89,
        color: "#ffecb3", // pastel cream
    },
    57: {
        name: "Lanthanum",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.10,
        color: "#b2dfdb", // pastel teal
    },
    58: {
        name: "Cerium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.12,
        color: "#e1bee7", // pastel purple
    },
    59: {
        name: "Praseodymium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.13,
        color: "#ffe0b2", // pastel beige
    },
    60: {
        name: "Neodymium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.14,
        color: "#ffccbc", // pastel peach
    },
    61: {
        name: "Promethium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.13,
        color: "#d1c4e9", // pastel lavender
    },
    62: {
        name: "Samarium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.17,
        color: "#ffe0b2", // pastel beige
    },
    63: {
        name: "Europium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.20,
        color: "#b2dfdb", // pastel teal
    },
    64: {
        name: "Gadolinium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.20,
        color: "#e1bee7", // pastel purple
    },
    65: {
        name: "Terbium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.10,
        color: "#ffdb99", // pastel yellow-orange
    },
    66: {
        name: "Dysprosium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.22,
        color: "#ffccbc", // pastel peach
    },
    67: {
        name: "Holmium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.23,
        color: "#ffe0b2", // pastel beige
    },
    68: {
        name: "Erbium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.24,
        color: "#ffab91", // pastel coral
    },
    69: {
        name: "Thulium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.25,
        color: "#cfd8dc", // pastel grey
    },
    70: {
        name: "Ytterbium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.10,
        color: "#d1c4e9", // pastel lavender
    },
    71: {
        name: "Lutetium",
        type: AtomTypes.LANTHANIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.27,
        color: "#ffccbc", // pastel peach
    },
    72: {
        name: "Hafnium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 55,
        attack: 70,
        electronegativity: 1.30,
        color: "#cfd8dc", // pastel grey
    },
    73: {
        name: "Tantalum",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 55,
        attack: 70,
        electronegativity: 1.50,
        color: "#d1c4e9", // pastel lavender
    },
    74: {
        name: "Tungsten",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 55,
        attack: 75,
        electronegativity: 2.36,
        color: "#ffb3cc", // pastel coral
    },
    75: {
        name: "Rhenium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 55,
        attack: 75,
        electronegativity: 1.9,
        color: "#ffe0b2", // pastel beige
    },
    76: {
        name: "Osmium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 55,
        attack: 70,
        electronegativity: 2.20,
        color: "#b2dfdb", // pastel teal
    },
    77: {
        name: "Iridium",
        type: AtomTypes.METAL,
        speed: 40,
        defense: 55,
        attack: 75,
        electronegativity: 2.20,
        color: "#d1c4e9", // pastel lavender
    },
    78: {
        name: "Platinum",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 60,
        attack: 70,
        electronegativity: 2.28,
        color: "#ffccbc", // pastel peach
    },
    79: {
        name: "Gold",
        type: AtomTypes.METAL,
        speed: 35,
        defense: 60,
        attack: 70,
        electronegativity: 2.54,
        color: "#ffdb99", // pastel yellow-orange
    },
    80: {
        name: "Mercury",
        type: AtomTypes.METAL,
        speed: 30,
        defense: 55,
        attack: 65,
        electronegativity: 2.00,
        color: "#cfd8dc", // pastel grey
    },
    81: {
        name: "Thallium",
        type: AtomTypes.METAL,
        speed: 30,
        defense: 50,
        attack: 60,
        electronegativity: 1.62,
        color: "#ffb3cc", // pastel coral
    },
    82: {
        name: "Lead",
        type: AtomTypes.METAL,
        speed: 30,
        defense: 50,
        attack: 60,
        electronegativity: 1.87,
        color: "#d1c4e9", // pastel lavender
    },
    83: {
        name: "Bismuth",
        type: AtomTypes.METAL,
        speed: 30,
        defense: 50,
        attack: 60,
        electronegativity: 2.02,
        color: "#ffe0b2", // pastel beige
    },
    84: {
        name: "Polonium",
        type: AtomTypes.METALLOID,
        speed: 30,
        defense: 50,
        attack: 60,
        electronegativity: 2.00,
        color: "#ffab91", // pastel coral
    },
    85: {
        name: "Astatine",
        type: AtomTypes.NONMETAL,
        speed: 30,
        defense: 50,
        attack: 60,
        electronegativity: 2.2,
        color: "#ffccbc", // pastel peach
    },
    86: {
        name: "Radon",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#e0f7fa", // pastel cyan
    },
    87: {
        name: "Francium",
        type: AtomTypes.METAL,
        speed: 55,
        defense: 15,
        attack: 95,
        electronegativity: 0.7,
        color: "#ffdb99", // pastel yellow-orange
    },
    88: {
        name: "Radium",
        type: AtomTypes.METAL,
        speed: 50,
        defense: 35,
        attack: 80,
        electronegativity: 0.9,
        color: "#ffecb3", // pastel cream
    },
    89: {
        name: "Actinium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.1,
        color: "#cfd8dc", // pastel grey
    },
    90: {
        name: "Thorium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.3,
        color: "#e1bee7", // pastel purple
    },
    91: {
        name: "Protactinium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.5,
        color: "#ffe0b2", // pastel beige
    },
    92: {
        name: "Uranium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.38,
        color: "#ffab91", // pastel coral
    },
    93: {
        name: "Neptunium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.36,
        color: "#d1c4e9", // pastel lavender
    },
    94: {
        name: "Plutonium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.28,
        color: "#ffe0b2", // pastel beige
    },
    95: {
        name: "Americium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.13,
        color: "#b2dfdb", // pastel teal
    },
    96: {
        name: "Curium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.28,
        color: "#e1bee7", // pastel purple
    },
    97: {
        name: "Berkelium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.5,
        color: "#ffe0b2", // pastel beige
    },
    98: {
        name: "Californium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.5,
        color: "#d1c4e9", // pastel lavender
    },
    99: {
        name: "Einsteinium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffccbc", // pastel peach
    },
    100: {
        name: "Fermium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#b2dfdb", // pastel teal
    },
    101: {
        name: "Mendelevium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.5,
        color: "#ffe0b2", // pastel beige
    },
    102: {
        name: "Nobelium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.5,
        color: "#e1bee7", // pastel purple
    },
    103: {
        name: "Lawrencium",
        type: AtomTypes.ACTINIDE,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#d1c4e9", // pastel lavender
    },
    104: {
        name: "Rutherfordium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffe0b2", // pastel beige
    },
    105: {
        name: "Dubnium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#d1c4e9", // pastel lavender
    },
    106: {
        name: "Seaborgium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffe0b2", // pastel beige
    },
    107: {
        name: "Bohrium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#b2dfdb", // pastel teal
    },
    108: {
        name: "Hassium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffccbc", // pastel peach
    },
    109: {
        name: "Meitnerium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#cfd8dc", // pastel grey
    },
    110: {
        name: "Darmstadtium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#d1c4e9", // pastel lavender
    },
    111: {
        name: "Roentgenium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffe0b2", // pastel beige
    },
    112: {
        name: "Copernicium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#b2dfdb", // pastel teal
    },
    113: {
        name: "Nihonium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffb3cc", // pastel coral
    },
    114: {
        name: "Flerovium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#ffccbc", // pastel peach
    },
    115: {
        name: "Moscovium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#d1c4e9", // pastel lavender
    },
    116: {
        name: "Livermorium",
        type: AtomTypes.TRANSACTION_METAL,
        speed: 40,
        defense: 50,
        attack: 75,
        electronegativity: 1.6,
        color: "#cfd8dc", // pastel grey
    },
    117: {
        name: "Tennessine",
        type: AtomTypes.NONMETAL,
        speed: 40,
        defense: 50,
        attack: 70,
        electronegativity: 2.2,
        color: "#ffb3cc", // pastel coral
    },
    118: {
        name: "Oganesson",
        type: AtomTypes.NOBLE_GAS,
        speed: 50,
        defense: 90,
        attack: 10,
        electronegativity: 0,
        color: "#e0f7fa", // pastel cyan
    },
};


const statistic = {
    1: {
        name : "Hydrogen",
        type : AtomTypes.NONMETAL, 
        speed: 30,
        defense : 20, 
        attack : 50, 
        electronegativity : 2.20, 
        color: "#f74949",
    }, 
    2: {
        name : "Helium",
        type : AtomTypes.NOBLEGAS, 
        speed: 30,
        defense : 90, 
        attack : 50, 
        electronegativity : 0.0, 
        color: "#FFD700",
    }, 
    3: {
        name : "Lithium",
        type : AtomTypes.ALKALIMETAL, 
        speed: 30,
        defense : 30, 
        attack : 90, 
        electronegativity : 0.98, 
        color: "#C0C0C0",
    }, 
    4: {
        name : "Beryllium",
        type : AtomTypes.ALKALINEEARTHMETAL, 
        speed: 28,
        defense : 50, 
        attack : 50, 
        electronegativity : 1.57, 
        color: "#D9E4E6",
    }, 
    5: {
        name : "Boron",
        type : AtomTypes.METALLOID, 
        speed: 27,
        defense : 60, 
        attack : 50, 
        electronegativity : 2.04, 
        color: "#FFB300",
    },
    6: {
        name : "Carbon",
        type : AtomTypes.NONMETAL, 
        speed: 28,
        defense : 60, 
        attack : 50, 
        electronegativity : 2.55, 
        color: "#4C4C4C",
    },
    7: {
        name : "Nitrogen",
        type : AtomTypes.NONMETAL, 
        speed: 25,
        defense : 60, 
        attack : 50, 
        electronegativity : 3.04, 
        color: "#4682B4",
    }, 
    8: {
        name : "Oxygen",
        type : AtomTypes.NONMETAL, 
        speed: 20,
        defense : 60, 
        attack : 50, 
        electronegativity : 3.44, 
        color: "#ADD8E6",
    }, 
    9: {
        name : "Fluorine",
        type : AtomTypes.HALOGEN, 
        speed: 18,
        defense : 50, 
        attack : 90, 
        electronegativity : 3.98, 
        color: "#00FFFF",
    }, 
    10 : {
        name : "Neon",
        type : AtomTypes.NOBLEGAS, 
        speed: 25,
        defense : 90, 
        attack : 50, 
        electronegativity : 0.0, 
        color: "#FF4500",
    }, 
    11 : {
        name : "Sodium",
        type : AtomTypes.ALKALIMETAL, 
        speed: 10,
        defense : 30, 
        attack : 90, 
        electronegativity : 3.98, 
        color: "#DAA520",
    },
    12 : {
        name : "Magnesium",
        type : AtomTypes.ALKALINEEARTHMETAL, 
        speed: 20,
        defense : 50, 
        attack : 50, 
        electronegativity : 1.31, 
        color: "#B0E0E6",
    }, 
    13 : {
        name : "Aluminium",
        type : AtomTypes.POSTTRANSITIONMETAL, 
        speed: 18,
        defense : 60, 
        attack : 50, 
        electronegativity : 1.61, 
        color: "#C0C0C0",
    }, 
    14 : {
        name : "Silicon",
        type : AtomTypes.METALLOID, 
        speed: 20,
        defense : 60, 
        attack : 50, 
        electronegativity : 1.90, 
        color: "#F4A460", 
    }, 
    15 : {
        name : "Phosphorus",
        type : AtomTypes.NONMETAL, 
        speed: 15,
        defense : 60, 
        attack : 40, 
        electronegativity : 2.19, 
        color: "#FFFFE0",
    }, 
    16 : {
        name : "Sulfur",
        type : AtomTypes.NONMETAL, 
        speed: 12,
        defense : 40, 
        attack : 70, 
        electronegativity : 2.58, 
        color: "#FFFF00",
    }, 
    17 : {
        name : "Chlorine",
        type : AtomTypes.HALOGEN, 
        speed: 10,
        defense : 45, 
        attack : 80, 
        electronegativity : 3.16, 
        color: "#32CD32",
    }, 
    18 : {
        name : "Argon",
        type : AtomTypes.NOBLEGAS, 
        speed: 30,
        defense : 70, 
        attack : 30, 
        electronegativity : 0.0, 
        color: "#D3D3D3",
    }, 
    19 : {
        name : "Potassium",
        type : AtomTypes.ALKALIMETAL, 
        speed: 30,
        defense : 50, 
        attack : 50, 
        electronegativity : 0.82, 
        color: "#9370DB",
    }, 
    20 : {
        name : "Calcium",
        type : AtomTypes.ALKALINEEARTHMETAL, 
        speed: 50,
        defense : 50, 
        attack : 50, 
        electronegativity : 1.00, 
        color: "#FFFACD",
    }, 
  21:{
    name: "Unknownium",
    type : AtomTypes.ALKALINEEARTHMETAL, 
        speed: 10,
        defense : 10, 
        attack : 10, 
        electronegativity : 1.00, 
        color: "black",
  }
    
}; 


const ParticleStates = {
    ALIVE: 1,
    DEAD: 2
}

const ParticleTypes = {
    ELECTRON: 1,
    PROTON: 2,
    NEUTRON: 3
}





//---------------------------------Classes--------------------------------//





class Player {
    constructor (x,y,renderer){
        this.particles = [ParticleTypes.PROTON];
        this.valenceelectrons = []
        //Damage to particles should permeate by assigning a damage value to the hit particle. When the particle is hit again that particle transfers its damage value to all neighboring particles and updates its damage value higher. this continues until the damage permeates to the center where the player is at risk of instability
        //Create a second smaller electron ring which's main purpose is bonding [maximum of 8 electrons]
        this.x = x;
        this.y = y;
        this.electronRotation = 0;
        this.renderer = renderer
        this.ammunition = 0
        this.size = 0
        this.numParticles = 1
        this.maxAmmunition = 1
        this.atomicNmbr = 1
        this.color = "#f74949"
        this.maxHealth = 100
        this.health = 100
        this.damage = 10
        this.name = "Unknown"
        this.alive = true
        this.TOB = Date.now()
        this.radioactive = false
        this.previousColor = this.color
        this.colorShift = 1
      this.lastColorShift = 0
      this.speed = 10
    }

    fireToward(x,y){
        if (player.alive == false) return
        if (this.ammunition < 1) return
        var X, Y, velX, velY
        var e = new Electron( 
            X = -Math.sign(this.x-x) * this.size * Math.abs(Math.cos(this.angleTo(x,y))) + this.x,
            Y = -Math.sign(this.y-y) * this.size * Math.abs(Math.sin(this.angleTo(x,y))) + this.y,
            velX = -Math.sign(this.x-x) * 20 * Math.abs(Math.cos(this.angleTo(x,y))),
            velY = -Math.sign(this.y-y) * 20 * Math.abs(Math.sin(this.angleTo(x,y))),
            ParticleStates.ALIVE,
            this.damage
        )
        this.renderer.electrons.push(e)
        this.ammunition -= 1
        socket.emit("fire",X, Y, velX, velY,this.damage)
    }

    angleTo(x,y){
        var diffx = this.x - x
        var diffy = this.y - y
        return Math.atan(diffy/diffx)
    }
  
    changeColor(color){
      this.previousColor = this.color
      this.color = color
      this.colorShift = 0
    }

    move(dx,dy){
        if (player.alive == false) return
        this.x += dx
        this.y += dy
        socket.emit('moveto',this.x,this.y);

        //Check For Collisions
        for (var i = 0; i < this.renderer.deadProtons.length; i++){
            var p = this.renderer.deadProtons[i]
            if ( this.distTo(p.relx,p.rely) < this.size ){
                this.renderer.deadProtons.splice(i,1)
                this.particles.push(ParticleTypes.PROTON)
                this.atomicNmbr = ++this.maxAmmunition
                this.recalculateStats()
                
                socket.emit("eat",p.relx,p.rely,ParticleTypes.PROTON,this.getInfo())
                break;
            }
        } 
        for (var i = 0; i < this.renderer.deadNeutrons.length; i++){
            var n = this.renderer.deadNeutrons[i]
            if ( this.distTo(n.relx,n.rely) < this.size ){
                this.renderer.deadNeutrons.splice(i,1)
                this.particles.push(ParticleTypes.NEUTRON)
                this.recalculateStats()
                socket.emit("eat",n.relx,n.rely,ParticleTypes.NEUTRON,this.getInfo())
                break;
            }
        } 
        if (this.ammunition >= this.maxAmmunition) return
        for (var i = 0; i < this.renderer.deadElectrons.length; i++){
            var e = this.renderer.deadElectrons[i]
            if ( this.distTo(e.x,e.y) < this.size ){
                this.renderer.deadElectrons.splice(i,1)
                this.ammunition++
                socket.emit("eat",e.x,e.y,ParticleTypes.ELECTRON,this.getInfo())
                break;
            }
        } 

    }

    distTo(x,y){
        var dx = this.x - x
        var dy = this.y - y
        return Math.sqrt(dx * dx + dy * dy)
    }

    draw( ctx ){
        if (player.alive == false) return
      
        if (player.radioactive == true){
                    
                  ctx.setTransform()
        ctx.scale(scale,scale)
        ctx.translate(center.x * 1/scale,center.y * 1/scale)
              
    ctx.fillStyle = "black";
          var padding = 30

        var radg = ctx.createRadialGradient(
        0,0,0,
        0,0,this.size * 2
      )
      
      radg.addColorStop(0, this.color);
      radg.addColorStop(1, "rgb(255,255,255,0)");
      
      ctx.beginPath()
      ctx.fillStyle = radg
    
      ctx.fillRect(-this.size * 2 - padding,-this.size * 2 - padding,4 * (this.size + padding),4 * (this.size + padding))
    

          var resolution = this.size
          ctx.fillStyle="" + this.color
          ctx.moveTo(1.6 * this.size  + this.size * Math.cos((i*i + frame/10) % Math.PI - Math.PI),0)

          for (var i = 0; i < resolution - 1; i++){
            ctx.rotate(2 * Math.PI/resolution)
            ctx.beginPath()
            ctx.strokeStyle = "" + i % 2 == 0 ? this.color : "black"
            ctx.arc(2 * this.size  + this.size * Math.cos((i*i + frame/10) % Math.PI - Math.PI), 0, 4 - 3 * Math.cos((i*i + frame/10)), 0, 2 * Math.PI);
            ctx.stroke();
          }
          ctx.fill()
        }
      
      
        //Particles
        var p = this.particles.length
        ctx.setTransform()
        ctx.scale(scale,scale)
        ctx.translate(center.x * 1/scale,center.y * 1/scale)

        ctx.rotate(this.angleTo(mouseX,mouseY))

        var n = 0;
        var s = 6;
        var l = 0;
        var d = 0;
        var r = 0;
        var instability =  this.health/this.maxHealth - 1 + 0.2 + (this.radioactive == true ? 1 : 0)
        
        while (n < p){
            n++;
            if (n == 1){
                
                Drawing.drawProton(ctx, 30 * (Math.random() - 0.5) * (instability),10 * (Math.random() - 0.5) * ( instability),this.color)
                d = 0;
                continue;
            }
            else if (n <= 7){
                
                var c = 40 > this.size * this.colorShift + this.size * Math.random() ? this.previousColor : this.color
                ctx.rotate(2 * Math.PI / 6);
                r += 2 * Math.PI / 6
 
                D = 40 + 30 * (Math.random() - 0.5) * ( instability )
                if (this.particles[n-1] == ParticleTypes.NEUTRON){ Drawing.drawNeutron(ctx,D,0,"grey") }
                else { Drawing.drawProton(ctx,D,0,c) }
                d = 50;
            }
            else{
                if (l <= 0 ){ 
                    s += 5; 
                    l = s; 
                    d = (100) / (4*Math.cos(Math.PI/2 - Math.PI/s))
                    ctx.rotate(50 * Math.PI / 180);
                    r += 50 * Math.PI / 180
                    d = 0.8 * d
                }
                ctx.rotate(2 * Math.PI / s);

                var c = d > this.size * this.colorShift ? this.previousColor : this.color
                var D = d + 30 * (Math.random() - 0.5) * ( instability )
                if (this.particles[n-1] == ParticleTypes.NEUTRON){ Drawing.drawNeutron(ctx,D,0,"grey") }
                else { Drawing.drawProton(ctx,D,0,c) }
                l--;
            }
        }
        this.size = d + 150
        if (this.colorShift < 1) this.colorShift += Math.pow(Math.sin(Math.PI * this.colorShift /2 + Math.PI/2),2)/(this.size/20)

        //ctx.translate(-center.x,-center.y)
        ctx.setTransform()


        
        //Valence
        ctx.scale(scale,scale)
        ctx.translate(center.x* 1/scale,center.y* 1/scale)
        ctx.rotate(-0.5 * this.electronRotation * Math.PI / 180);
      
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 3;
        ctx.setLineDash([25,25])
      
        ctx.beginPath();
        ctx.arc(0, 0, d + 60, 0, 2 * Math.PI);
        ctx.stroke()
      
        ctx.rotate(0.5 * this.electronRotation * Math.PI / 180);

        
        ctx.rotate(this.electronRotation * Math.PI / 180);
        var e = this.maxAmmunition;
        var rot = this.electronRotation * Math.PI / 180;
        for (var i = 0; i < e; i++){
            ctx.fillStyle = i >= this.ammunition ? "gray" : "mediumaquamarine";
            ctx.rotate(2 * Math.PI / e);
            rot += 2 * Math.PI / e;
            Drawing.drawCircle(ctx,i >= this.ammunition ? d + 100: (d + 100 + (this.bodyDamage * Math.PI/2) + (10 + this.bodyDamage/2) * Math.cos((this.damage) * rot)),0,5)
        }
        ctx.rotate(-this.electronRotation * Math.PI / 180);
        ctx.translate(-center.x* 1/scale,-center.y* 1/scale)
        this.electronRotation += 20/(e)
      
      
      
      
    }

    getInfo(){
        return {
            particles: this.particles,
            ammunition: this.ammunition
        }
    }

    countProtons(){
        return ( this.particles.filter((p) => p == ParticleTypes.PROTON) ).length
    }

    countNeutrons(){
        return ( this.particles.filter((p) => p == ParticleTypes.NEUTRON) ).length
    }
  
    takeDamage(amount, chance){
      
      this.health -= amount
      if (this.health < 0 && this.alive)
      { this.pop(chance) }
      document.getElementById("tst-health").style.width = `${ Math.min(100 - 100 * this.health/this.maxHealth,100)}%`
    }

    recalculateStats(){

        if (player.alive == false) return
        this.atomicNmbr = this.countProtons()
        this.maxAmmunition = this.atomicNmbr
        var info = statistics[this.atomicNmbr]
        var numNeutrons = this.countNeutrons()
        var numProtons = this.atomicNmbr
        
        if (this.atomicNmbr > 118) return
        
        //Calculate Scaled Stats Based On Atomic Number
        var ss = (stat,atmN) => {return Math.floor(stat * (1 + atmN/20) / 2)}
        var dmg = ss(info.attack,this.atomicNmbr)
        var def = ss(info.defense,this.atomicNmbr)
        var spd = info.speed
        
        
        
        if (info.color !== this.color) this.changeColor(info.color)
        this.speed = spd/Math.sqrt(numNeutrons + numProtons) + 3//Atomic Weight
        this.maxHealth = def * (numNeutrons * 2 + numProtons)/3
        this.health = this.maxHealth
        this.damage = 4 * dmg * numProtons/(numNeutrons+numProtons)
        this.bodyDamage = info.electronegativity * Math.sqrt(numNeutrons) * 10
        this.radioactive = info.radioactive == true ? true : false
      console.log(info.radioactive)

        document.getElementById("currentAtomHeader").innerText = `${this.atomicNmbr} - ${info.name}`
        document.getElementById("speedStat").innerText = `Mobility → ${spd}`
        document.getElementById("defenseStat").innerText = `Stability → ${def}`
        document.getElementById("attackStat").innerText = `Entropy → ${dmg}`
        document.getElementById("bodyDamageStat").innerText = `Electronegativity → ${info.electronegativity}`
        
        
        document.getElementById("tst-health").style.width = `${100 - 100 * this.health/this.maxHealth}%`

        
        document.getElementById("atomType").innerText = statistics[this.maxAmmunition].name
        document.getElementById("namePlate").innerText = `Unique Chemical Compound ${this.name}.`
        document.getElementById("atomInfo").innerText = `Isotope ${numNeutrons}     |     Atomic Number ${this.atomicNmbr}    |     Atomic Weight ${numNeutrons + numProtons}`
        
        
        document.getElementById("pst-def").innerText = `${Math.floor(this.maxHealth * 10) / 10}`
        document.getElementById("pst-dmg").innerText = `${Math.floor(this.damage * 10) / 10}`
        document.getElementById("pst-spd").innerText = `${Math.floor(this.speed * 10) / 10}`
        document.getElementById("pst-frc").innerText = `${Math.floor(this.bodyDamage * 10) / 10}`
    
        
        var nextinfo = this.atomicNmbr == 118 ? {name:"None",speed:0,defense:0,attack:0,electronegativity:0}: statistics[this.atomicNmbr + 1];
        var nextdmg = ss(nextinfo.attack,this.atomicNmbr+1)
        var nextdef = ss(nextinfo.defense,this.atomicNmbr+1)
        var nextspd = nextinfo.speed
      
        function getSymbol(prev, current){
          if (prev < current) return "↑"
          else if (prev > current) return "↓"
          else return "="
        }
        
        document.getElementById("nextAtomHeader").innerText = `${this.atomicNmbr + 1} - ${nextinfo.name}`
        document.getElementById("nextSpeedStat").innerText = `${getSymbol(spd,nextspd)} ${nextspd}`
        document.getElementById("nextDefenseStat").innerText = `${getSymbol(def,nextdef)} ${nextdef}`
        document.getElementById("nextAttackStat").innerText = `${getSymbol(dmg,nextdmg)} ${nextdmg}`
        document.getElementById("nextBodyDamageStat").innerText = `${getSymbol(info.electronegativity,nextinfo.electronegativity)} ${nextinfo.electronegativity}`
    
        function getColor(prev, current){
          if (prev < current) return "mediumaquamarine"
          else if (prev > current) return "tomato"
          else return "orange"
        }
    
        document.getElementById("nextSpeedStat").style.color = getColor(spd,nextspd)
        document.getElementById("nextDefenseStat").style.color = getColor(def,nextdef)
        document.getElementById("nextAttackStat").style.color = getColor(dmg,nextdmg)
        document.getElementById("nextBodyDamageStat").style.color = getColor(info.electronegativity,nextinfo.electronegativity)
    
    }

    pop(dropRate){
        var collection = []
        this.alive = false
        for (var i = 0; i < this.particles.length;i++){
          
            if (i/this.particles.length >= dropRate){break;}
          
            //Randomize position around where the player was killed
            var r = 2 * Math.PI * Math.random()
            var d = this.size * Math.random()
            var x = this.x + d * Math.cos(r)
            var y = this.y + d * Math.sin(r)

            if (this.particles[i] == ParticleTypes.PROTON){
                var p = new Proton(x,y,null,ParticleStates.DEAD)
                this.renderer.deadProtons.push(p)
                collection.push(p)
            }
            else{
                var n = new Neutron(x,y,null,ParticleStates.DEAD)
                this.renderer.deadNeutrons.push(n)
                collection.push(n)
            }

        }
        for(var i = 0; i < this.maxAmmunition; i++){
          if (i/this.maxAmmunition >= dropRate){break;}
            var r = 2 * Math.PI * Math.random()
            var d = this.size + 50 * Math.random()
            var x = this.x + d * Math.cos(r)
            var y = this.y + d * Math.sin(r)

            var e = new Electron(x,y,0,0,ParticleStates.DEAD)
            this.renderer.deadNeutrons.push(e)
            collection.push(e)
        }
        socket.emit("death",collection)

        //Revive after a few seconds
        setTimeout(() => {
            this.particles = [ParticleTypes.PROTON];
            this.x = 0;
            this.y = 0;
            this.electronRotation = 0;
            this.ammunition = 0
            this.size = 0
            this.numParticles = 1
            this.maxAmmunition = 1
            this.atomicNmbr = 1
            this.color = "#f74949"
            this.maxHealth = 100
            this.health = 100
            this.damage = 10
            this.alive = true
            this.TOB = Date.now()
            this.recalculateStats()
            socket.emit("revive")
        }, 1000)
    }

    get electronCount(){
        return this.electrons.length
    }


}








class Enemy extends Player {
    constructor(ID,renderer){
        super (0,0,renderer)
        this.ID = ID

    }

    draw( ctx ){

        if (this.alive == false) return
        //Particles
        var p = this.particles.length
        ctx.setTransform()
        ctx.scale(scale,scale)
        ctx.translate(-player.x + this.x + center.x* 1/scale,-player.y + this.y+ center.y* 1/scale)
            
        ctx.rotate(this.angleTo(mouseX,mouseY))
        ctx.fillStyle = "#131313"
        this.color = statistics[this.countProtons()].color

        var n = 0;
        var s = 6;
        var l = 0;
        var d = 0;
        var r = 0;
        
        while (n < p){
            n++;
            if (n == 1){
              ctx.fillStyle = this.color
                Drawing.drawCircle(ctx,10 * Math.random() * ( this.maxHealth/this.health - 1),10 * Math.random() * ( this.maxHealth/this.health - 1),22)
                d = 0;
                continue;
            }
            else if (n <= 7){
                ctx.rotate(2 * Math.PI / 6);
                var D = 40 + 10 * Math.random() * ( this.maxHealth/this.health - 1)
                if (this.particles[n-1] == ParticleTypes.NEUTRON){ ctx.fillStyle = "#131313"; Drawing.drawCircle(ctx,D,0,25) }
                else { ctx.fillStyle = this.color; Drawing.drawCircle(ctx,D,0,22) }
                //ctx.stroke()
                d = 50;
            }
            else{
                if (l <= 0 ){ 
                    s += 5; 
                    l = s; 
                    d = (100) / (4*Math.cos(Math.PI/2 - Math.PI/s))
                    ctx.rotate(50 * Math.PI / 180);
                    r += 50 * Math.PI / 180
                    d = 0.8 * d
                }
                ctx.rotate(2 * Math.PI / s);
                var D = d + 10 * Math.random() * ( this.maxHealth/this.health - 1)
                if (this.particles[n-1] == ParticleTypes.NEUTRON){ Drawing.drawNeutron(ctx,D,0,"grey") }
                else { Drawing.drawProton(ctx,D,0,this.color) }
                l--;
            }
        }
        this.size = d + 150

        //ctx.translate(-center.x,-center.y)
        ctx.setTransform()


        
        //Valence
        ctx.scale(scale,scale)
        ctx.translate(-player.x + this.x + center.x* 1/scale,-player.y + this.y+ center.y* 1/scale)
        ctx.rotate(-0.5 * this.electronRotation * Math.PI / 180);
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 3;
        ctx.setLineDash([25,25])
        ctx.beginPath();
        ctx.arc(0, 0, d + 60, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.rotate(0.5 * this.electronRotation * Math.PI / 180);

        
        ctx.rotate(this.electronRotation * Math.PI / 180);
        var e = this.maxAmmunition;
        var rot = this.electronRotation * Math.PI / 180;
        for (var i = 0; i < e; i++){
            ctx.fillStyle = i >= this.ammunition ? "gray" : "mediumaquamarine";
            ctx.rotate(2 * Math.PI / e);
            rot += 2 * Math.PI / e;
            Drawing.drawCircle(ctx,d + 100 + 10 * Math.cos(30 * rot),0,5)
        }
        ctx.rotate(-this.electronRotation * Math.PI / 180);
        this.electronRotation += 20/e
      
        //Element Name
        let size = 0.4 * (this.size - 120)
        ctx.font = `${size}px Arial`;
        ctx.fillStyle = "white"
        ctx.strokeStyle = "#131313"
        ctx.lineWidth = "20px"
        ctx.setLineDash([])
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

         
        
        ctx.strokeText(`${periodicTableElements[this.countProtons() - 1]}`, 0, 0); 
      ctx.fillText(`${periodicTableElements[this.countProtons() - 1]}`, 0, 0); 

      
      ctx.font = `${size/3}px Arial`;
      ctx.strokeText(`${this.countProtons()}`, -size * 1.1, size/2 - size/5); 
      ctx.fillText(`${this.countProtons()}`, -size * 1.1, size/2 - size/5);
      
      ctx.strokeText(`${this.countProtons() + this.countNeutrons()}`, -size * 1.1, -size/2 + size/5); 
      ctx.fillText(`${this.countProtons() + this.countNeutrons()}`, -size * 1.1, -size/2 + size/5); 
        ctx.translate(player.x - this.x - center.x* 1/scale,player.y - this.y - center.y* 1/scale)
    }

    static byID(ID){
        return enemies.find((element) => element.ID == ID);
    }

}








class Proton {
    //Null parent indicates world space parent
    constructor(relx,rely,parent,state){
        this.relx = relx 
        this.rely = rely
        this.parent = parent
        this.state = state
        this.type = ParticleTypes.PROTON
    }

    draw(ctx){
        if (this.state == ParticleStates.ALIVE){

        }
        else{
            ctx.setTransform()
            ctx.scale(scale,scale)
            ctx.translate(-player.x + center.x* 1/scale,-player.y + center.y* 1/scale)
            ctx.fillStyle = "#f74949";
            Drawing.drawCircle(ctx,this.relx,this.rely,30)
            
            ctx.fillStyle = "white";

            ctx.beginPath()
            ctx.rect(this.relx-8,this.rely-2,16,4)
            ctx.fill()

            ctx.beginPath()
            ctx.rect(this.relx-2,this.rely-8,4,16)
            ctx.fill()

        }
    }
}







class Neutron {
    constructor(relx,rely,parent,state){
        this.relx = relx 
        this.rely = rely
        this.parent = parent
        this.state = state
        this.type = ParticleTypes.NEUTRON
    }

    draw(ctx){
        if (this.state == ParticleStates.ALIVE){

        }
        else{
            ctx.setTransform()
            ctx.scale(scale,scale)
            ctx.translate(-player.x + center.x* 1/scale,-player.y + center.y* 1/scale)
            ctx.fillStyle = "darkslategrey";
            Drawing.drawCircle(ctx,this.relx,this.rely,22)

            ctx.strokeStyle = "white";
            ctx.lineWidth = 3
            ctx.setLineDash([])

            ctx.beginPath();
            ctx.arc(this.relx, this.rely, 6, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
}






class Electron {
    constructor (x,y,velx,vely,state,dmg){
        this.x = x
        this.y = y
        this.velx = velx
        this.vely = vely
        this.state = state
        this.type = ParticleTypes.ELECTRON
        this.damage = dmg
    }

    draw(ctx){

        if (this.state == ParticleStates.ALIVE){
            var magnitude = this.damage
            ctx.setTransform()
            ctx.translate(-player.x*scale + center.x,-player.y*scale + center.y)
            ctx.scale(scale,scale)
          
            ctx.translate(this.x,this.y)

            ctx.fillStyle = "mediumaquamarine";
            ctx.rotate(2 * Math.PI * Math.random())
            Drawing.drawCircle(ctx,magnitude * Math.random(),0,5)
          
            ctx.fillStyle = "mediumaquamarine";
            ctx.rotate(2 * Math.PI * Math.random())
            Drawing.drawCircle(ctx,magnitude * Math.random(),0,5)
          
          ctx.fillStyle = "mediumaquamarine";
            
            ctx.rotate(2 * Math.PI * Math.random())
            Drawing.drawCircle(ctx,magnitude * Math.random(),0,8)
            
            
            
        }
        else{
            ctx.setTransform()
            ctx.scale(scale,scale)
            ctx.translate(-player.x + center.x* 1/scale,-player.y + center.y* 1/scale)
            ctx.fillStyle = "black";
            Drawing.drawCircle(ctx,this.x,this.y,8)
            
            ctx.fillStyle = "white";
            ctx.beginPath()
            ctx.rect(this.x-4,this.y-2,8,4)
            ctx.fill()

        }
    }

    get velocity(){return Math.sqrt(this.velx * this.velx + this.vely * this.vely)}
    
}


class Point2D {
    constructor (x = 0,y = 0){
        this.x = x;
        this.y = y;
    }
}

class BlackHole{
  constructor(x,y,size){
    this.x = x
    this.y = y
    this.size = size
  }
  
    
  draw(ctx){
    
    //Dont Draw If Player Is Not Near
    if (player.distTo(this.x,this.y) > 7000) return
    
    ctx.setTransform()
    ctx.scale(scale,scale)
    ctx.translate(-player.x + this.x + center.x* 1/scale,-player.y + this.y + center.y* 1/scale)
    
    //this.size += 10 * Math.sin(frame/100) | AMAZING CHAOS AND DESTRUCTION
    
    let padding = 30
    var radg = ctx.createRadialGradient(
        0,0,this.size,
        0,0,this.size + padding
      )
      
      radg.addColorStop(0, "white");
      radg.addColorStop(0.1, "#FF4500");
      radg.addColorStop(0.2, "#FFA500");
    radg.addColorStop(1, "rgb(250,250,250,0)");
      
      ctx.beginPath()
      ctx.fillStyle = radg
    
      ctx.fillRect(-this.size - padding,-this.size - padding,2 * (this.size + padding),2 * (this.size + padding))
    
    
    
    ctx.fillStyle="white"
    Drawing.drawCircle(ctx,0,0,this.size + 1 + 1 * Math.sin(frame/10))
    
    
    
    ctx.fillStyle = "black";
    Drawing.drawCircle(ctx,0,0,this.size)
    
        padding = 30
        radg = ctx.createRadialGradient(
        0,0,0,
        0,0,this.size
      )
      
      radg.addColorStop(0, "black");
    radg.addColorStop(0.9, "black");
      radg.addColorStop(0.99, "orange");
      radg.addColorStop(0.991, "rgb(255,255,255,0)");
      
      ctx.beginPath()
      ctx.fillStyle = radg
    
      ctx.fillRect(-this.size - padding,-this.size - padding,2 * (this.size + padding),2 * (this.size + padding))
    
    
    ctx.fillStyle="white"
    ctx.beginPath()
    
    let resolution = this.size/2
    
        
    ctx.fillStyle="black"
    
    ctx.rotate(0.1 * Math.PI/resolution * frame)
    ctx.moveTo(this.size + 30 + 3 * (Math.cos(i + frame/30) + Math.cos(i/5 + frame/20) + Math.cos(i/2 + frame/10)),0)
    
    for (var i = 0; i < resolution - 1; i++){
      ctx.rotate(2 * Math.PI/resolution)
      Drawing.drawCircle(ctx, this.size  + this.size/10 * Math.cos((i*i + frame/50) % Math.PI + Math.PI),0, (this.size/30 + 1) - (this.size/30) * Math.cos((i*i + frame/50) % Math.PI + Math.PI))
    }
    ctx.fill()
    
    ctx.fillStyle="whitesmoke"
    
    ctx.rotate(-2.1 * Math.PI/resolution * frame)
    ctx.moveTo(this.size + 30 + 3 * (Math.cos(i + frame/30) + Math.cos(i/5 + frame/20) + Math.cos(i/2 + frame/10)),0)
    for (var i = 0; i < resolution - 1; i++){
      ctx.rotate(2 * Math.PI/resolution)
      Drawing.drawCircle(ctx, this.size + 30/(this.size/100) + 60 * Math.cos((i*i + frame/7) % Math.PI),0,15 + 15 * Math.cos((i*i + frame/7) % Math.PI))
    }
    ctx.fill()
    
    ctx.fillStyle="black"
    
    ctx.rotate(2.2 * Math.PI/resolution * frame)
    ctx.moveTo(this.size + 30 + 3 * (Math.cos(i + frame/30) + Math.cos(i/5 + frame/20) + Math.cos(i/2 + frame/10)),0)
    
    for (var i = 0; i < resolution - 1; i++){
      ctx.rotate(2 * Math.PI/resolution)
      Drawing.drawCircle(ctx, this.size  + this.size * Math.cos((i*i + frame/50) % Math.PI),0, (this.size/30 + 1) - (this.size/30) * Math.cos((i*i + frame/50) % Math.PI))
    }
    ctx.fill()


    /*ctx.moveTo(this.size + 30 + 3 * (Math.cos(i + frame/30) + Math.cos(i/5 + frame/20) + Math.cos(i/2 + frame/10)),0)
    for (var i = 0; i < resolution - 1; i++){
      ctx.rotate(2 * Math.PI/resolution)
      ctx.lineTo( this.size + 30 + 3 * (Math.cos(i + frame/30) + Math.cos(i/5 + frame/20) + Math.cos(i/2 + frame/10)),0)
    }
    ctx.fill()*/
    
    
  
  }
}




class Drawing {
    
    static drawCircle(ctx,x,y,radius){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
    }


    static drawProton(ctx,x,y,color){
        ctx.fillStyle = color
        Drawing.drawCircle(ctx,x,y,22)
        ctx.fillStyle = "white"

        ctx.beginPath()
        ctx.rect(x-8,y-2,16,4)
        ctx.fill()

        ctx.beginPath()
        ctx.rect(x-2,y-8,4,16)
        ctx.fill()
    }

    static drawNeutron(ctx,x,y,color){
        ctx.fillStyle = "#121212"
        Drawing.drawCircle(ctx,x,y,25)

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3
        ctx.setLineDash([])

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.stroke();
    }

    static drawBackground(ctx){
      var spacing = 100
      var size = 2 * center.x * 1 / scale
      var lines = (1/4) * size/spacing;
      
      var offsetx = player.x * scale * 0.6 % spacing * 1 / scale
      var offsety = player.y * scale * 0.6 % spacing * 1 / scale
      
      ctx.setLineDash([1 * 1 / scale,5* 1 / scale])
      ctx.lineWidth = 0.5 * 1 / scale
      ctx.strokeStyle = "grey"
      
      ctx.setTransform()
      ctx.scale(scale,scale)
      ctx.translate(-offsetx + center.x* 1/scale,center.y* 1/scale)
      
      for (var i = 0; i < lines;i++){
        var x = i * size/(lines) - size/2
        ctx.beginPath()
        ctx.moveTo(x,size/2)
        ctx.lineTo(x,-size/2)
        ctx.stroke()
      }
      
      ctx.setTransform()
      ctx.scale(scale,scale)
      ctx.translate(center.x* 1/scale,-offsety + center.y* 1/scale)
      for (var i = 0; i < lines;i++){
        var y = i * size/(lines) - size/2
        ctx.beginPath()
        ctx.moveTo(size/2,y)
        ctx.lineTo(-size/2,y)
        ctx.stroke()
      }
    }
  
    static drawDeadzone(ctx){
      var points = 7000
      var radius = mapSize
      var magnitude = 2+  Math.cos(frame/100)/2
      
      ctx.setTransform()
      ctx.scale(scale,scale)
      ctx.translate(-player.x + center.x* 1/scale,-player.y + center.y* 1/scale)

      

      
      ctx.fillStyle = "#131313"
      ctx.strokeStyle = "#131313"
      ctx.setLineDash([])
      ctx.lineWidth = 30
      
      var degree = (2 * Math.PI)/points
      for (var p = 0; p < points;p++){
        ctx.beginPath()
        ctx.lineCap = 'round';
        ctx.moveTo(radius,0)
        ctx.rotate(degree)
        ctx.lineTo(radius - magnitude + Math.cos(p + frame/10),0)
        ctx.rotate(degree)
        ctx.lineTo(radius,0)
        ctx.fill()
        ctx.stroke();
        p++
      }
      
      

      
      ctx.beginPath()
      ctx.setLineDash([])
      ctx.lineWidth = 10000
      ctx.strokeStyle = "#131313"
      ctx.arc(0, 0, radius + 4990, 0, 2 * Math.PI);
      ctx.stroke();
      
      var radg = ctx.createRadialGradient(
        0,0,radius,
        0,0,radius + 600
      )
      
      radg.addColorStop(0, "rgb(19,19,19,0)");
      radg.addColorStop(1, "#070707");
      
      ctx.beginPath()
      ctx.fillStyle = radg
      ctx.fillRect(-radius*1.5,-radius*1.5,2 * radius*1.5,2 * radius*1.5)
      
    }
}



class ParticleRenderer{
    constructor(){
        this.electrons = []
        this.deadElectrons = [] 
        this.deadProtons = []
        this.deadNeutrons = []
      this.blackHoles = []
    }
  
  drawBlackHoles(ctx){
        for (var i = 0; i < this.blackHoles.length; i++){
            this.blackHoles[i].draw(ctx)
        }
    }

    drawElectrons(ctx){
        for (var i = 0; i < this.electrons.length; i++){
            this.electrons[i].draw(ctx)
        }
    }

    updateElectrons(){
        for (var i = 0; i < this.electrons.length; i++){
            if (this.electrons[i].velx) { this.electrons[i].x += this.electrons[i].velx }
            if (this.electrons[i].vely) { this.electrons[i].y += this.electrons[i].vely }
            if (player.distTo(this.electrons[i].x,this.electrons[i].y) < player.size && player.alive == true){
                player.takeDamage(this.electrons[i].damage,0.8 + 0.2 * Math.random())
                this.electrons.splice(i,1)
                socket.emit("damaged",player.health, player.maxHealth)
                break
            }
        }
    }

    drawDeadElectrons(ctx){
        for (var i = 0; i < this.deadElectrons.length; i++){
            this.deadElectrons[i].draw(ctx)
        }
    }

    drawDeadProtons(ctx){
        for (var i = 0; i < this.deadProtons.length; i++){
            this.deadProtons[i].draw(ctx)
        }
    }

    drawDeadNeutrons(ctx){
        for (var i = 0; i < this.deadNeutrons.length; i++){
            this.deadNeutrons[i].draw(ctx)
        }
    }
}


//---------------------------------Functions--------------------------------//



function updateLeaderboard(){
    var players = enemies.map((x) => x);
    var now = Date.now()
    players.push(player)
    players.sort((a,b) => { 
        return now - a.TOB < now - b.TOB
    })
    
    var board = document.getElementById("leaderboard-list")
    while ( board.children.length != 0 ){
        board.removeChild(board.children[board.children.length - 1])
    }

    for (var i = 0; i < 5 && i < players.length ; i++){
        if (!(now - players[i].TOB > 0)) continue;
        var li = document.createElement("li")
        li.className = "leaderboardli"
        li.innerText = `${players[i].name} | ${ now - players[i].TOB } ms`
        board.appendChild(li)
    }
}

const chemicalSuffixes = [
  "ide","ic Acid","ate","ite","ade"
]
const chemicalPrefixes = [
  "","Hydro-","Mono-", "Di-", "Tri-", "Tetra-", "Penta-", "Hexa-"
]

function convertNameToChemical(txt){
  var temp = txt.replace(/\W/,"")
  var first = temp.charAt(0).toUpperCase()
  var keepLast = temp.charAt(temp.length - 1).match(/[aeiouy]/) == null
  
  temp = temp.toLowerCase()    
  temp = temp.slice(1,temp.length - (keepLast ? 0 : 1))
  
  let suffix = chemicalSuffixes[ Math.floor(chemicalSuffixes.length * Math.random())]
  let prefix = chemicalPrefixes[ Math.floor(chemicalPrefixes.length * Math.random())]
  return prefix + first + temp + suffix
  
  var words = txt.split(" ")
  var final = ""
  words.forEach((word) => {
    var suffix = chemicalSuffixes[ Math.floor(4 * Math.random())]
    final += (word + suffix)
  })
  return final
}



//---------------------------------Flow-Control--------------------------------//



function setup(){

    //Connect to socket server
    socket = io("http://localhost:8080/")
    socket.emit('message', "Connected")

    //Adjust Resolution
    var canvas = document.getElementById("view");
    canvas.height = canvas.offsetHeight
    canvas.width = canvas.offsetWidth

    //Hide Main menu And DIsplay In Game HUD
    document.getElementById("main").style.display = "none"
    //Hide Main menu And DIsplay In Game HUD
    var elements = Array.from(document.getElementsByClassName("HUD"))
    console.log(elements)
    for (var i = 0; i < elements.length; i++)
    { 
      console.log(elements[i].className)
      elements[i].className = elements[i].className.replace("HUD","")
      console.log(elements[i].className)
    }
    

    //Prepare For GameLoop
    renderer = new ParticleRenderer()
    context = canvas.getContext("2d")
    center = new Point2D(canvas.width/2,canvas.height/2);
    player = new Player(center.x,center.y, renderer);
    var name = document.getElementById("nameInput").value
    if (name == "") name = "Noname"
    player.name = convertNameToChemical(name)
    player.recalculateStats()

    
    renderer.blackHoles.push(new BlackHole(3000,0,400))
    renderer.blackHoles.push(new BlackHole(-700,0,100))
    for(var i = 0; i < 100; i++){
    var x = 2 * mapSize * Math.random() - mapSize
    var y = 2 * mapSize * Math.random() - mapSize
    renderer.blackHoles.push(new BlackHole(x,y,100 + 300 * Math.random()))
  }
    

    socket.emit("join", player.name,player.TOB)

    socket.on('initialize', (playerList, particleList) => { 

        playerList.forEach((enemy) => {
            var e = new Enemy(enemy.ID,renderer)
            e.name = enemy.name
            e.TOB = enemy.TOB
            enemies.push(e)
            e.draw(context)
        })

        particleList.forEach((particle) => {
            switch (particle.type){
                case ParticleTypes.PROTON: renderer.deadProtons.push(new Proton( particle.x, particle.y, null, ParticleStates.DEAD)); break;
                case ParticleTypes.NEUTRON: renderer.deadNeutrons.push(new Neutron( particle.x, particle.y, null, ParticleStates.DEAD)); break;
                case ParticleTypes.ELECTRON: renderer.deadElectrons.push(new Electron( particle.x, particle.y, 0,0, ParticleStates.DEAD)); break;
            }
        })

        updateLeaderboard()
    })

    socket.on('death', (ID,collection) => { 

        Enemy.byID(ID).alive = false

        collection.forEach((particle) => {
            switch (particle.type){
                case ParticleTypes.PROTON: renderer.deadProtons.push(new Proton( particle.relx, particle.rely, null, ParticleStates.DEAD)); break;
                case ParticleTypes.NEUTRON: renderer.deadNeutrons.push(new Neutron( particle.relx, particle.rely, null, ParticleStates.DEAD)); break;
                case ParticleTypes.ELECTRON: renderer.deadElectrons.push(new Electron( particle.x, particle.y, 0,0, ParticleStates.DEAD)); break;
            }
        })
    })

    socket.on('newEnemy', (ID,name) => { 
        var e = new Enemy(ID,renderer)
        e.name = name
        enemies.push(e)
        e.draw(context)
    })

    socket.on('playerLeave', (ID) => { 
        var e = enemies.find((element) => element.ID == ID);
        var i = enemies.indexOf(i)
        enemies.splice(i,1)
    })

    socket.on('enemyMove', (x,y,ID) => { 
        var e = enemies.find((element) => element.ID == ID);
        if (e == undefined){
          e = new Enemy(ID,renderer)
          e.name = name
          enemies.push(e)
          e.draw(context)
        }
        e.x = x
        e.y = y
    })

    socket.on('revive', (ID) => { 
        var e = Enemy.byID(ID)
        e.particles = [ParticleTypes.PROTON];
        e.x = 0;
        e.y = 0;
        e.electronRotation = 0;
        e.ammunition = 0
        e.size = 0
        e.numParticles = 1
        e.maxAmmunition = 1
        e.atomicNmbr = 1
        e.color = "#f74949"
        e.maxHealth = 100
        e.health = 100
        e.damage = 10
        e.alive = true
        e.TOB = Date.now()
        e.recalculateStats()
    })

    socket.on('spawnProjectile', (x, y, velx, vely, dmg) => { 
        var e = new Electron( 
            x,
            y,
            velx,
            vely,
            ParticleStates.ALIVE,
            dmg
        )
        renderer.electrons.push(e)
    })

    socket.on('updateEnemyHealth', (ID,health,max) => { 
        var e = Enemy.byID(ID)
        e.health = health
        e.maxHealth = max
    })

    socket.on('deleteParticle', (x,y,type) => { 
        switch (type){
            case ParticleTypes.PROTON: {
                var p = renderer.deadProtons.find((particle)=> particle.relx == x && particle.rely == y)
                if (p == undefined) return
                var i = renderer.deadProtons.indexOf(p)
                renderer.deadProtons.splice(i,1)
                break
            }
            case ParticleTypes.NEUTRON: {
                var n = renderer.deadNeutrons.find((particle)=> particle.relx == x && particle.rely == y)
                if (n == undefined) return
                var i = renderer.deadNeutrons.indexOf(n)
                renderer.deadNeutrons.splice(i,1)
                break
            }
            case ParticleTypes.ELECTRON: {
                var p = renderer.deadElectrons.find((particle)=> particle.x == x && particle.y == y)
                if (p == undefined) return
                var i = renderer.deadElectrons.indexOf(p)
                renderer.deadElectrons.splice(i,1)
            }
        }
    })

    socket.on('updateEnemyParticles', (ID,info) => { 
        var e = Enemy.byID(ID)
        e.particles = info.particles
        e.ammunition = info.ammunition
        e.maxAmmunition = ( info.particles.filter((p) => p == ParticleTypes.PROTON) ).length
    })

    socket.on('spawnFood', (x,y,type) => { 

        switch (type){
            case ParticleTypes.ELECTRON: {
                renderer.deadElectrons.push( new Electron(x,y,0, 0,ParticleStates.DEAD))
                break
            }
            case ParticleTypes.PROTON: {
                renderer.deadProtons.push( new Proton(x,y,null,ParticleStates.DEAD))
                break
            }
            case ParticleTypes.NEUTRON: {
                renderer.deadNeutrons.push( new Neutron(x,y,null,ParticleStates.DEAD))
                break
            }
        }
    })

    setInterval(loop, 20)
    setInterval(updateLeaderboard, 5000)
}


function loop(){
  
    frame++

    //Movement based on currently down keys
    acceleration = Math.sqrt(player.speed)/10
    var decceleration = 0.9
    var doLimitSpeed = (keyStates.a + keyStates.s) == 1 && (keyStates.w + keyStates.d) == 1
    
    let doDeccelerateX = ( keyStates.a == 1 && Math.sign(xspeed) == 1 ) || ( keyStates.d == 1 && Math.sign(xspeed) == -1 ) || (keyStates.d - keyStates.a) == 0
    let doDeccelerateY = ( keyStates.s == 1 && Math.sign(yspeed) == -1 ) || ( keyStates.w == 1 && Math.sign(yspeed) == 1 )  || (keyStates.w - keyStates.s) == 0
    let doAccelerateX = Math.abs(xspeed) < player.speed * (doLimitSpeed ? 0.707 : 1)
    let doAccelerateY = Math.abs(yspeed) < player.speed * (doLimitSpeed ? 0.707 : 1)
  
    xspeed = xspeed + ( doAccelerateX ? acceleration * (keyStates.d - keyStates.a) : 0 )
    xspeed = xspeed * ( doDeccelerateX ? decceleration : 1 )
    yspeed = yspeed + ( doAccelerateY ? acceleration * (keyStates.s - keyStates.w) : 0 )
    yspeed = yspeed * ( doDeccelerateY ? decceleration : 1 )
  
    renderer.blackHoles.forEach((blackhole) => {
      let dist = player.distTo(blackhole.x,blackhole.y)
      if  ( dist < blackhole.size * 2){
        if  ( dist < blackhole.size * 0.6 && player.alive){ 
          player.particles.pop()
          if (player.particles.length == 0) player.pop(0) 
          else player.recalculateStats()
        }
        let angle = Math.tan((blackhole.y - player.y)/(blackhole.x - player.x))
        let pull = blackhole.size/1
        xspeed += pull * (blackhole.x - player.x) / (dist*dist)
        yspeed += pull * (blackhole.y - player.y) / (dist*dist)
        xspeed = xspeed * (1 + statistics[player.atomicNmbr].speed/1000)
        yspeed = yspeed * (1 + statistics[player.atomicNmbr].speed/1000)
      }
      
    })
  
    player.move(
        xspeed,
        yspeed
    )
  
    if (player.distTo(0,0) > mapSize){ 
      player.takeDamage(Math.sqrt(player.maxHealth),1)
    }
    


    context.setTransform()
    context.fillStyle = "whitesmoke"
    context.beginPath()
    context.rect(0,0,center.x * 2,center.y * 2)
    context.fill()
  
    Drawing.drawDeadzone(context)
    Drawing.drawBackground(context)
    

    renderer.drawDeadElectrons(context)
    renderer.drawDeadProtons(context)
    renderer.drawDeadNeutrons(context)
  
    renderer.drawBlackHoles(context)

    player.draw(context);
    for (var i = 0; i < enemies.length; i++){
        enemies[i].draw(context)
    }
    renderer.drawElectrons(context)
    renderer.updateElectrons()

}




//---------------------------------Events--------------------------------//





addEventListener("mousemove", (event) => {
    mouseX = event.mouseX
    mouseY = event.mouseY
});



document.getElementById("view").addEventListener("mousedown", (event) => {
    player.fireToward(event.clientX + player.x - center.x, event.clientY+player.y - center.y)
});



addEventListener("keydown", (event) => {
    keyStates[event.key.toLowerCase()] = 1
    if (event.key === "Tab"){ 
      event.preventDefault();
      
      if (showStats){
        document.getElementById("pst-stats-container").style.bottom = "8px" 
        document.getElementById("stats").style.bottom = "10px" 
        document.getElementById("nextstats").style.bottom = "10px" 
        document.getElementById("tab-btn").style.bottom = "-100px"
        showStats = !showStats
      }
      else{
        document.getElementById("pst-stats-container").style.bottom = "-100px"
        document.getElementById("stats").style.bottom = "-120px"
        document.getElementById("nextstats").style.bottom = "-120px"
        document.getElementById("tab-btn").style.bottom = "20px"
        showStats = !showStats
      }

    }
    if (event.key === "e"){
      for (var i = 0; i < 10; i++){if (player.countProtons() == 118) break; player.particles.push(ParticleTypes.PROTON)}

      
      player.recalculateStats()
    } 
  if (event.key === "q"){
      player.changeColor("red")
    } 
  if (event.key === "r"){
      player.changeColor("blue")
    } 
});

addEventListener("keyup", (event) => {
    keyStates[event.key.toLowerCase()] = 0
    if (event.key === "Tab"){ 
      event.preventDefault();

    }
});


addEventListener("wheel", (event) => {
    if (scale + event.deltaY/100 > 200/player.size) {
        scale = 200/player.size
        return
    }
    if (scale + event.deltaY/100 < 0.2) {
        scale = 0.2
        return
    }

    scale += event.deltaY/100

});

window.onload = () => { 
    document.getElementById("StartButton").addEventListener("click",setup)
}

