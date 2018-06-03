import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'factComp',
  templateUrl: './fact.html',
  styleUrls: ['./fact.scss']
})

export class FactComp implements OnInit {
  
  constructor() { }
  
  ngOnInit() {

    $(".read-more").on("click", function(){
      
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

  }
}