const ngos = [
    { id: "DARPAN001", name: "NGO A", adults: 20, children: 5, elderly: 0 },
    { id: "DARPAN002", name: "NGO B", adults: 10, children: 10, elderly: 5 },
    { id: "DARPAN003", name: "NGO C", adults: 30, children: 0, elderly: 0 },
    { id: "DARPAN004", name: "NGO D", adults: 8, children: 12, elderly: 4 },
    { id: "DARPAN005", name: "NGO E", adults: 15, children: 10, elderly: 0 }
];
function calcSMU(ngo) {
    return ngo.adults * 1.0 + ngo.children * 0.7 + ngo.elderly * 0.8;
}
