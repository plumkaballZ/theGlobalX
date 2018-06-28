import { Image } from './../../../../core/models/image';
import { environment } from './../../../../../environments/environment';
import { Product } from './../../../../core/models/product';
import { Component, OnInit, Input } from '@angular/core';
import * as PhotoSwipe from "photoswipe"; 
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

declare var jQuery:any;
declare var $ :any;

@Component({
  selector: 'app-image-container',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss', './rez_Master.scss']
})
export class ProductImagesComponent implements OnInit {
  @Input() images: Image[] = null;
  @Input() selectedImage: Image = null;
  
  toggle : boolean;

  constructor() {
    this.toggle = false;
   }

  ngOnInit() {
    this.initJs();
  }
  
  getProductImageUrl(url) {
    return environment.API_ENDPOINT + url;
  }

  onMouseOver(image: Image) {
    this.selectedImage = image;
    this.toggle = true;
  }

  initJs(){
    var pswpElement = document.querySelectorAll('.pswp')[0];
    
    // build items array
    var items = [
        {
            src: 'https://placekitten.com/600/400',
            w: 600,
            h: 400
        },
        {
            src: 'https://placekitten.com/1200/900',
            w: 1200,
            h: 900
        }
    ];
    
    var options = {
        index: 0 
    };
    
    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }
}
