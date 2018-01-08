import { Component, OnInit, Input } from '@angular/core';
import { Address } from '../../../../core/models/address';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'addrLineComp',
  templateUrl: './addrLine.html',
  styleUrls: ['./addrLine.scss']
})

export class AddrLineComp implements OnInit {
  
    @Input() address: Address;

  constructor() { }
  
  ngOnInit() {
  }

}
