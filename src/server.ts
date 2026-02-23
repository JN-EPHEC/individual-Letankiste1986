import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import sequelize from './config/database';
import './models/User';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";






const app = express();
const port = 3000;



app.use(express.json());

/*app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur ma route API');
});*/

app.use('/api', userRoutes);

app.use(express.static('public'));

// En premier de la liste des routes server.ts
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données SQLite établie.');
    })
    .catch((error) => {
        console.error('Erreur de connexion à la base de données SQLite:', error);
    });


sequelize.sync().then(() => {
    console.log('Synchronisation du modèle avec la base de données effectuée.');

    app.listen(port, () => {
        console.log(`Serveur lancé sur http://localhost:${port}`);
    });
});

/*const etudiants = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data', (req: Request, res: Response) => {
    res.json(etudiants);
});

app.get('/api/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const reponse = {
        message: `Bonjour ${name}`,
        timestamp: new Date().toISOString(),
    };
    res.json(reponse);
});*/