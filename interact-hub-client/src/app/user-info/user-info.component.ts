import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent {
  activeSection:string = 'about';
 
  constructor(){}
 
  ngOnInit():void{
   
  }
  setActiveSection(section:string){
    this.activeSection=section;
    console.log(this.activeSection);
  }
}
