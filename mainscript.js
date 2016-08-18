// Initialize a new Kendo Mobile Application
app = new kendo.mobile.Application($(document.body), {
    transition: "slide",
    loading: "<h1>Chargement...</h1>",
    platform:"ios7"
});

//variables globales
cptinitial=0;


//map contenant les poids de l'enfant
if("poids" in localStorage)
    mapPoids=JSON.parse(localStorage.getItem("poids"));
else
    mapPoids=[];
//map contenant les tailles de l'enfant
if("taille" in localStorage)
    mapTaille=JSON.parse(localStorage.getItem("taille"));
else
    mapTaille=[];



//on ajuste l'affichage de la page "mon enfant" en fonction de s'il y a un enfant déjà enregistré ou non
//si oui, on affiche son profil
function check(){
    if("prenom" in localStorage){
        createChartPoids();
        createChartTaille();
        app.navigate("#profilenfant");
        document.getElementById("profilddn").innerHTML=localStorage.getItem("prenom")+" a déjà "+age(localStorage.getItem("ddn"),toDay())+" !";
        if("photoprofil" in localStorage)
        	document.getElementById("photobebe").src = localStorage.getItem("photoprofil");
    }else{
        app.navigate("#ajouterenfant");
    }
}

//Mise en forme de la date au format jj/mm/aaaa
function processDate(date){
    var splitted = date.split('-');
    return(splitted[2]+"/"+splitted[1]+"/"+splitted[0]);
}

//récupérer la date du jour au format jj/mm/aaaa
function toDay(){
    today = new Date();
    var month = today.getMonth()+1;
    var day = today.getDate();
    if(month<10)
    	month = "0"+month;
    if(day<10)
    	day = "0"+day;
    return(day+"/"+month+"/"+today.getFullYear());
}

//validation du formulaire et inscription des données dans localstorage
function submit(){
    localStorage.setItem("prenom",$("#prenom").val());
    var ddn = processDate($("#ddn").val());
    localStorage.setItem("ddn",ddn);
    addPoids(ddn,$("#poids").val());
    addTaille(ddn,$("#taille").val());
    check();
}

//ajout d'une nouvelle valeur de poids dans la map
function addPoids(date,poids){
	if(date==='today'){
    	date=toDay();
        $('#modalpoids').kendoMobileModalView('close');
    }
    var newPoids={
        "date":date,
        "poids":poids
    }
    mapPoids.push(newPoids);
    localStorage.setItem("poids",JSON.stringify(mapPoids));
    createChartPoids();
}

//ajout d'une nouvelle valeur de taille dans la map
function addTaille(date,taille){
	if(date==="today"){
    	date=toDay();
        $('#modaltaille').kendoMobileModalView('close');
    }
    var newTaille={
        "date":date,
        "taille":taille
    }
    mapTaille.push(newTaille);
    localStorage.setItem("taille",JSON.stringify(mapTaille));
    createChartTaille();
    
}

//fonction de création de la courbe de poids
function createChartPoids() {
    $("#chartpoids").kendoChart({
        dataSource: {
            data: JSON.parse(localStorage.getItem("poids"))
        },
        title: {
            text: "Courbe de poids"
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "line",
            labels: {
                visible: false,
                format: "{0}kg",
                background: "transparent"
            },
            tooltip: {
                visible: true,
                font: "1.2em",
                background: "white",
                border: {
                    width: 2,
                    color: "orange"
                }
            }
        },
        series: [{
            field: "poids",
            name: "poids",
            line: {
                style: "smooth"
            }
        }],
        valueAxis: {
            labels: {
                format: "{0}kg"
            },
            line: {
                visible: false
            },
            min: 1
        },
        categoryAxis: {
            field: "date",
            majorGridLines: {
                visible: false
            },
			labels: {
                rotation: 55
            }
        }
    });
}

//fonction de création de la courbe de taille
function createChartTaille() {
    $("#charttaille").kendoChart({
        dataSource: {
            data: JSON.parse(localStorage.getItem("taille"))
        },
        title: {
            text: "Courbe de taille"
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "line",
            labels: {
                visible: false,
                format: "{0}cm",
                background: "transparent"
            },
            tooltip: {
                visible: true,
                font: "1.2em",
                background: "white",
                border: {
                    width: 2,
                    color: "orange"
                }
            }
        },
        series: [{
            field: "taille",
            name: "taille",
            line: {
                style: "smooth"
            }
        }],
        valueAxis: {
            labels: {
                format: "{0}cm"
            },
            line: {
                visible: false
            },
            min: 20
        },
        categoryAxis: {
            field: "date",
            majorGridLines: {
                visible: false
            },
			labels: {
                rotation: 55
            }
        }
    });
}

function age(datedebut,datefin){
    var debut = datedebut.split("/");
    var fin = datefin.split("/");
    if(fin[2]===debut[2]){
        if(fin[0]>=debut[0])
        	return(fin[1]-debut[1])+" mois";
        else
        	return(fin[1]-debut[1]-1)+" mois";
    }else{
        var res;
        if(fin[2]-debut[2]===1)
        	res = fin[2]-debut[2]+" an et ";
        else
        	res = fin[2]-debut[2]+" ans et ";
        if(fin[0]>=debut[0])
        	res+=(fin[1]-debut[1])+" mois";
        else
        	res+=(fin[1]-debut[1]-1)+" mois";
        return res;
    }
}


function doScan(x) {
    couleur = x;
    app.navigate("#results");
    switch (couleur){ 
        case 1: var ccs = "rgb(244,235,173)";break;
        case 2: var ccs = "rgb(243,220,168)";break;
        case 3: var ccs = "rgb(238,237,226)";break;
        case 4: var ccs = "rgb(248,229,55)";break;
        case 5: var ccs = "rgb(199,185,26)";break;
        case 6: var ccs = "rgb(185,205,0)";break;
    }
    var prefixe="background-color:";
    var styler = ";height:70px;width:70px;border-radius:50%;margin:0 auto;";   
    $("#bowl").attr("style", prefixe + ccs + styler);
    $("#bowl2").attr("style", prefixe + ccs + styler);
}
            
function doScan2(x) {
    couleur = x;
    app.navigate("#results2");
    switch (couleur){ 
        case 1: var ccs = "rgb(244,235,173)";break;
        case 2: var ccs = "rgb(243,220,168)";break;
        case 3: var ccs = "rgb(238,237,226)";break;
        case 4: var ccs = "rgb(248,229,55)";break;
        case 5: var ccs = "rgb(199,185,26)";break;
        case 6: var ccs = "rgb(185,205,0)";break;
    }
    var prefixe="background-color:";
    var styler = ";height:70px;width:70px;border-radius:50%;margin:0 auto;";   
    $("#bowl").attr("style", prefixe + ccs + styler);
    $("#bowl2").attr("style", prefixe + ccs + styler);
}

function lmedecin() {
    app.navigate("#medecin");
}

function cc(centre) {
    app.navigate("#centre");
    cr = centre;
    appel = "<footer data-role='footer' style='background:transparent;'><button id='footdial' type='button' data-icon='phone' class='myButton' onclick='dialp(centre)' style='background:#8BF573;width:100%;'>Appeler</button></footer>";
    switch (cr) {
        case 1:
            centre === "cr";
            $("h3").html("Centre de référence national de l'atrésie des voies biliaires");
            $("#contenu").html("Le Centre National de Référence de l'Atrésie des Voies Biliaires est situé au CHU Bicêtre dans le service d’Hépatologie Pédiatrique (Pr Emmanuel Jacquemin), au sein du pôle Adolescent Mère Enfant. Le service d’hépatologie pédiatrique est spécialisé dans la prise en charge de toutes les maladies du foie de l’enfant.Le Centre National de Référence de l'Atrésie des Voies Biliaires est situé au CHU Bicêtre dans le service d’Hépatologie Pédiatrique (Pr Emmanuel Jacquemin), au sein du pôle Adolescent Mère Enfant. Le service d’hépatologie pédiatrique est spécialisé dans la prise en charge de toutes les maladies du foie de l’enfant.<p style='color:gray;'><center><b>Adresse :</b> Service d’Hépatologie Pédiatrique, CHU Bicêtre,<br/> 78, rue du Général Leclerc, <br/>94275 Le Kremlin Bicêtre <br/>Cedex, France</center></p>"+appel);
            break;
        case 3:
            centre === "chn";
            $("h3").html("CH de Necker");
            $("#contenu").html("L’hôpital universitaire Necker-Enfants malades, de l’Assistance Publique-Hôpitaux de Paris est l’hôpital pédiatrique de référence en France.<br />Il est né du regroupement en 1926 de l’hôpital Necker – lieu d’invention du stéthoscope et de la réalisation de la première greffe de rein – et de l’hôpital des Enfants Malades, créé en 1802 et premier établissement au monde dédié aux enfants.<br /><br /> <center><b>Adresse :</b> Hôpital Necker-Enfants Malades <br />149, rue de Sèvres <br /> 75743 PARIS CEDEX 15</center>"+appel);
            break;
        case 4:
            centre === "chr";
            $("h3").html("CHU de Rennes");
            $("#contenu").html("L'hôpital sud de Rennes regroupe les services de gynécologie-obstétrique et ceux destinés aux soins médicaux et chirurgicaux de l’enfant.<br />Avec plus de 4 000 accouchements par an et une capacité de 98 lits, sa maternité de niveau 3 offre des services de qualité pour une prise en charge globale de la femme et de son futur enfant.<br />L’hôpital Sud accueille les urgences gynécologiques, obstétricales et pédiatriques. Il abrite également certaines activités de médecine et de chirurgie adultes telles que la médecine interne, la rhumatologie ou la chirurgie orthopédique.<br /><br /><center><b>Adresse : </b>CHU de Rennes, Hopital Sud <br />16 boulevard de Bulgarie<br/>35203 RENNES CEDEX 2</center>"+appel);
            break;
        case 5:
            centre === "cht";
            $("h3").html("CHU de Toulouse");
            $("#contenu").html("L’Hôpital des Enfants du CHU de Toulouse, ouvert depuis le 23 septembre 1998, regroupe l’ensemble des disciplines infantiles. Les enfants sont pris en charge de la naissance jusqu’à l’âge de 15 ans. L’accueil des urgences pédiatriques est assuré 24h/24h.<br />Cet établissement est situé sur le site géographique de Purpan.<br/><br/><b><center>Adresse : </b>Hôpital des Enfants<br/>330, avenue de Grande-Bretagne<br/>TSA 70034<br/>31059 TOULOUSE CEDEX 9</center>"+appel);
            break;
        case 6:
            centre === "chm";
            $("h3").html("CHU de Marseille");
            $("#contenu").html("Le Centre Hospitalier de la Timone est le plus important de la région PACA. Il est considéré par son activité, son équipement de pointe et ses moyens humains comme le troisième hôpital européen.<br/>Marseille est l'une des rares villes de France à disposer, avec la Timone, d'un hôpital d'enfants, qui regroupe toutes les disciplines médicales et chirurgicales, véritable pôle d'excellence pour les maladies infantiles des plus courantes aux plus rares.<br/><br/><center><b>Adresse : </b> CHU de Marseille, Hopital de la Timone<br />264 Rue Saint-Pierre <br /> 13385 MARSEILLE CEDEX 5</center>"+appel);
            break;
        case 7:
            centre === "chrl";
            $("h3").html("CHRU de Lille");
            $("#contenu").html("Sur le plan régional, le CHRU de Lille est implanté dans une région où les indicateurs de santé de la population restent préoccupants et en-deçà de la moyenne nationale. L'offre de soins régionale s'est développée ces dernières années mais elle est inégalement répartie et certains plateaux techniques sont aujourd'hui fragilisés au regard de l'évolution de la démographie médicale. Dans ce contexte, le CHRU de Lille a une responsabilité dans la structuration régionale des filières d'offre de soins. Il reste l'ultime recours pour assurer une prise en charge 7j/7 et 24h/24, des activités de proximité et des activités hyper-spécialisées. Il a vocation à être moteur dans la structuration de coopérations s'inscrivant dans une stratégie de groupe public afin de garantir un égal accès de la population à des soins de qualité. <br/><br/><center><b>Adresse : </b>2 Avenue Oscar Lambret <br /> 59000 LILLE</center>"+appel);
            break;
        case 8:
            centre = "chl";
            $("h3").html("CHU de Lyon");
            $("#contenu").html("L'hôpital Femme-Mère-Enfant (HFME) regroupe toute l'activité de médecine et de chirurgie pédiatrique des Hospices Civils de Lyon, un service de néonatologie et de gynéco-obstétrique, ainsi que toutes les urgences pédiatriques des HCL. <br/>Il accueille également le service de rééducation fonctionnelle infantile (Escale) situé antérieurement au Centre Hospitalier Lyon-Sud.<br/><br/><center><b>Adresse : </b>59 Boulevard Pinel <br/> 69500 BRON</center>"+appel);
            break;
    }
}


function dialp(centre) {
    switch (centre) {
        case "cr":
            window.open('tel:0145213177', '_system');
            break;
        case "chn":
            window.open('tel:0144494000', '_system');
            break;
        case "chr":
            window.open('tel:0299284321', '_system');
            break;
        case "cht":
            window.open('tel:0561772233', '_system');
            break;
        case "chm":
            window.open('tel:0491380000', '_system');
            break;
        case "chrl":
            window.open('tel:0320445962', '_system');
            break;
        case "chl":
            window.open('tel:0280082069', '_system');
            break;
    }
}


