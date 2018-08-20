import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'factComp',
  templateUrl: './fact.html',
  styleUrls: ['./fact.scss']
})

export class FactComp implements OnInit {
  
  tranz: any = {
    "sustainability" : "Sustainability",
    "weWish" : "Vi ønsker det bedste for miljøet!",
    "becuaseWe" : "Fordi vi tænker så meget på miljøet bliver vores varer produceret langsommere end konventionelle produkter. Her er det bl.a. vores læder der skal garve i vadbassiner med bark i stedet for kemiske løsninger.",
    "ourTextile" : "Vores tekstiler laves af organiske og bæredygtige materialer såsom bambus, hemp, økologisk bomuld mm. Vi stræber hele tiden efter at udvikle og producere de mest bæredygtige produkter vi kan på den mest bæredygtige måde - for dig, for mig og for os alle sammen.",
    "ourTextileShort" : "Vores tekstiler laves af...",
    "inspirationAnd" : "Inspiration og Mission",
    "weTakeOur" : "Vi tager vores inspiration fra en velafbalanceret blanding af 1920'ernes klassiske udtryk samt det moderne og stilrene London.",
    "ourMissionIs" : "Vores mission er at skabe produkter til den modeinteresserede mand der ikke går på kompromis for sit udseende som samtidig også ønsker det bedste for miljøet og fremtiden. Alle vores lædervarer er lavet i hånden for at give den absolut højeste kvalitet i hvert eneste produkt",
    "ourMissionIsShort" : "Vores mission er...",
    "codeOfConduct" : "CODE OF CONDUCT AND CSR",
    "codeOfConductAnd" : "Code of Conduct og Corporate Social Responsibilities dækker over en række forskellige krav, som vi sætter til os selv og vores under-leverandører",
    "appliesTo" : "det gælder blandt:", 
    "li1" : "Ingen børnearbejde",
    "li2" : "Ingen diskrimination eller krænkelse af menneske- og arbejdsrettigheder",
    "li3" : "Den lokale lov skal overholdes",
    "li4" : "Sundt arbejdsmiljø og faciliteter for de ansatte",
    "li5" : "Bygningssikkerhed og certificeringer",
    "li7" : "Håndtering, handsker og masker ved kemikalier",
    "li8" : "Sikkerhed om maskiner",
    "li9" : "Arbejdstid og lønninger skal overholde gældende lov",
    "li10" : "Førstehjælpere, brandtræningsuddannede m.m. skal være på fabrikken",
    "li11" : "Miljømæssige hensyn, herunder håndtering af spildevand, forurening m.m",
    "productionOf" : " Fremstilling af vores produkter",
    "handlingOf" : "Håndtering af kemikalier, er et meget vigtigt element, når man får produceret produkter i Østen. Det omhandler naturligvis både miljø'et men også vores slut-forbrugeres sikkerhed.",
    "inEurope" : "I Europa har vi selvfølgelig en kemikalielovgivning, der kaldes REACH forordning. REACH bygger på et hav af studier, og har via dem opsat regler og love for håndtering af kemikalier i produktion og slut-produkterne. Det betyder rent praksis at vi sætter krav til:",
    "inEuropeShort" : "I Europa har vi selvfølgelig...",
    "li12" : "ChromVI i læder",
    "li13" : "Ulovlige Azo-farvestoffer",
    "li14" : "Formaldehyd",
    "li15" : " Alkylphenol, Alkulphenolethoxylates (APEO, miljøskadelige stoffer)",
    "li16" : "Tungmetaller i metaldele (lynlåse, studs m.v.)",
    "li17" : "PH-værdier",
    "aboutMe" : "OM MIG",
    "toStartWith" : "Oprindeligt startede jeg denne virksomhed i håbet om at jeg kunne lave et eller andet der kunne gøre en forskel for vores miljø.",
    "fastI" : "Hurtigt nåede jeg til en konklusion om at lave tilbehør samt tøj til den modebevidste mand. Der blev brugt rigtig meget tid på ideer og samtaler med forskellige producenter, men til sidst fandt jeg frem til de der deler samme vision som jeg selv.",
    "nowAllOur" : "Nu laves alle vores produkter under bæredygtige forhold, med skrappe krav omkring kemikalier samt arbejdsforhold for de ansatte i fabrikkerne.",
    "weAreStill" : "Vi er stadig en meget ung virksomhed, men jeg tror på at mine idé og min virksomhed har stort potentiale, og derfor arbejder vi konstant på højtryk for at opnår de bedste løsninger og resultater for alt vores arbejde nu og i fremtiden.",
    "fastIShort" : "Hurtigt nåede jeg til en konklusion...",
    "close" : "Luk"
  };
  
  constructor(private translate: TranslateService) { 

  }
  
  ngOnInit() {

    $(".read-more").on("click", function() {
      
      var text_more;
      var content_collapse = $(this).data("target");
      var text_close = $("[data-collapse="+content_collapse+"]").data("text-close");

      if(!$(this).hasClass('collapse-open')){
        $(this).data("text-more", $(this).html());
          text_more = $(this).data("text-more");
          $(this).addClass('collapse-open');	
          $(this).html(text_close);
          $("[data-collapse="+content_collapse+"]").slideDown(300);
          
                    
        } else {
          text_more = $(this).data("text-more");
          $(this).html(text_more);	
          $(this).removeClass('collapse-open');
          $("[data-collapse="+content_collapse+"]").slideUp(300);
        }
      });

      this.translate.get('facts').subscribe((res: any) => {
        this.tranz = res;
      });
     
  }
}