function verifMail() {
/*
	Cette fonction a pour objectif de recuperer une liste d'adresse mail et de verifier chaque adresse si elle
	existe ou non dans le système. Dans le Cas où elle n'existe pas, la fonction verifie si elle figure en double dans la liste. A la fin, l'utilisateur saura les comptes
	qui ne sont pas encore existant dans le systeme et il pourra facilement les ajouter au système.
*/
  var spreadsheet = SpreadsheetApp.openById("ID_Worksheet"); //recuperer le classeur à partir de l'id
  var sheet = spreadsheet.getSheets()[NumeroSheet]; // la feuille (sheet) du classeur contenant la liste des utilisateurs à créer
  var data = sheet.getDataRange().getValues();
   
  for (var i = 0; i < data.length-1; i++) {
    try {
      AdminDirectory.Users.get(data[i+1][0]);
      data[i+1][1] = 'Exist in Syst';
    } catch (err) {
      // exception, l'utilisateur n'existe pas dans le systeme
      data[i+1][1] = 'Not Exist';
      for(var j = 0; j < i; j++){
        if(data[j+1][0] == data[i+1][0]){
          data[i+1][1] = 'Double proposal';
          break;
        } 
      } 
    }
  }
  //Ecriture de la liste des users avec la mise à jour du statut de création dans la feuille.
  //    Ici, on commence à la cellule A1 et la plage a la taille du tableau de données.
  var plage = sheet.getRange(1, 1, data.length, data[0].length);

  // Utiliser la méthode setValues() pour écrire le tableau de données dans la plage en une seule opération.
  plage.setValues(data);
  
 
}
