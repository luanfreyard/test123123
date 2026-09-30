const firstNames = ['Lukas','Leon','Felix','Jonas','Paul','Maximilian','Elias','Finn','Noah','Julian','David','Niklas','Moritz','Tim','Alexander','Daniel','Sebastian','Tobias','Florian','Philipp','Johannes','Simon','Benjamin','Christian','Matthias','Andreas','Michael','Thomas','Stefan','Martin']
const lastNames = ['Mueller','Schmidt','Schneider','Fischer','Weber','Meyer','Wagner','Becker','Schulz','Hoffmann','Schaefer','Koch','Bauer','Richter','Klein','Wolf','Schroeder','Neumann','Schwarz','Zimmermann','Braun','Krueger','Hofmann','Hartmann','Lange','Schmitt','Werner','Schmitz','Krause','Meier']

export const getRandomName = ()=>{
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`
}