import { Image } from './../../../../core/models/image';
import { environment } from './../../../../../environments/environment';
import { Product } from './../../../../core/models/product';
import { Component, OnInit, Input } from '@angular/core';
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
    // this.initJs();
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
            src: 'https://www.sideshowtoy.com/wp-content/uploads/2018/04/marvel-avengers-infinity-war-iron-spider-sixth-scale-hot-toys-feature-903471.jpg',
            w: 600,
            h: 400
        },
        {
            src: 'https://www.sideshowtoy.com/wp-content/uploads/2018/03/marvel-avengers-infinity-war-iron-man-sixth-scale-figure-hot-toys-feature-903421.jpg',
            w: 600,
            h: 400
        }
    ];
    
    var options = {
      index: 0
    };
    
    // Initializes and opens PhotoSwipe
  //   var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  //   gallery.init();
  }
}
