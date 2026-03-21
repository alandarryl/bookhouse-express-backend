# bookhouse-express-backend
THis is a reconstruction of old php and html5 project, but using the mern tech (react, node, express and mongodb), to be more precise the backend part of the project

# 📚 Bookhouse API

> Backend pour un projet de gestion de livres, favoris et chat entre utilisateurs.

---

## 🛠️ Technologies utilisées

- Node.js, Express  
- MongoDB / Mongoose  
- JWT pour l’authentification  
- bcrypt pour le hash des mots de passe  
- cookie-parser pour les tokens  
- cors pour la securiter d'accès
- Postman / Insomnia pour tester l’API  

---

## 📖 Fonctionnalités

1. **Authentification**
    - Inscription
    - Connexion
    - Protection des routes avec JWT

2. **Livres**
    - Ajouter, modifier, supprimer un livre (seulement propriétaire)
    - Lister tous les livres
    - Voir les livres d’un utilisateur spécifique

3. **Favoris**
    - Ajouter un livre aux favoris
    - Supprimer un livre des favoris
    - Voir tous les favoris d’un utilisateur

4. **Discussion / Chat**
    - Créer ou récupérer une discussion entre deux utilisateurs
    - Envoyer un message
    - Voir tous les messages d’une discussion
    - Voir toutes les discussions d’un utilisateur avec le dernier message

---

